import React from 'react'
import { render, RenderResult, fireEvent, cleanup, wait, waitFor } from '@testing-library/react'

import Menu, { MenuProps } from './menu'
import MenuItem, { MenuItemProps } from './menuItem'
import SubMenu from './subMenu'


// 创建两个测试属性
const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}

const testVerticalProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical'
}

// 写一个方法 传入props 返回一个组件
const CkMenu = (props: MenuProps) => {
    return (
        <Menu { ...props }>
            <MenuItem >active</MenuItem>
            <MenuItem  disabled>disabled</MenuItem>
            <MenuItem >xyz</MenuItem>
            <SubMenu title='dropdown'>
                <MenuItem >drop</MenuItem>
            </SubMenu>
        </Menu>
    )
}

// 创建样式
const createStyleFile = () => {
    const cssFile: string = `
        .ck-submenu {
            display: none;
        }
        .ck-submenu.menu-opened {
            display: block;
        }
    `
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssFile
    return style
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('测试菜单和子菜单组件', () => {

    beforeEach(() => {
        wrapper = render(CkMenu(testProps))

        // 插入css文件
        wrapper.container.append( createStyleFile() )

        // 获取到menuElement
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })

    it('初始属性的渲染是否正确', () => {
        // 1. 是否在文档中
        expect(menuElement).toBeInTheDocument()

        // 2. 测试classNames
        expect(menuElement).toHaveClass('menu test menu-horizantol')

        // 3. li的数量是否匹配
        // expect(menuElement.getElementsByTagName('li').length).toEqual(3)
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)

        // 4. activeElement是否有'is-active'类
        expect(activeElement).toHaveClass('menu-item is-active')

        // 5. disabledElement是否有'is-disabled'类
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })

    // 测试行为 1. 点击item是否正确高亮 2. 函数是否被正确调用 3. disabled
    it('点击子菜单是否会改变active状态，并且会调用回调', () => {
        const thirdItem = wrapper.getByText('xyz')

        // 1. 触发元素的点击事件 点击之后是否有is-active类 回调函数的传参是否正确
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')

        // 2. 点击禁用的元素 查看是否不能被点击
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })

    it('测试mode=vertical状态下的渲染是否正确', () => {
        cleanup()
        const wrapper = render(CkMenu(testVerticalProps))
        const menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })

    it('横向的时候，鼠标移入展示下拉框', async() => {
        // 因为一开始是不展示子菜单的 所以换种方式取到
        expect(wrapper.queryByText('drop')).not.toBeVisible()
        const dropDownElement = wrapper.getByText('dropdown')

        fireEvent.mouseEnter(dropDownElement)

        // 如何处理异步操作 会重复处理 直到报错 
        // await waitFor(() => {
        //     expect(wrapper.queryByText('drop')).toBeVisible()
        // })

        fireEvent.click(wrapper.getByText('drop'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')

        fireEvent.mouseLeave(dropDownElement)
        // 如何处理异步操作 会重复处理 直到报错 
        // await waitFor(() => {
        //     expect(wrapper.queryByText('drop')).not.toBeVisible()
        // })
    
    })
    // 完成纵向的点击

})
