import React, { useContext, FunctionComponentElement, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'

export interface SubMenuProps {
    index?: string
    title: string
    className?: string
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className}) => {
    
    const context = useContext(MenuContext)

    // 用 isOpend 这个参数去潘初始化判断是否是展开的
    const openedSubMenus = context.defaultOpenSubmenus as Array<string>
    const isOpend = ( index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    // 初始化 submenu 是否展开
    const [ menuOpen, setOpen ] = useState(isOpend)

    const classes = classNames('menu-item submenu-item', classNames, { 
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    })

    
    let timer: any

    // 根据不同模式传入是hover事件还是click事件 
    // 当是横向的时候的鼠标移入移出事件
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setOpen(toggle)
        }, 300)
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setOpen(!menuOpen)
    }

    // 使用三元表达式子来处理事件 然后使用展开运算符来添加到节点上去 
    const clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {}
    const hoverEvents = context.mode === 'horizantol' ? { 
        onMouseEnter: ( e: React.MouseEvent ) => {  console.log(123);
        ;handleMouse(e, true) },
        onMouseLeave: ( e: React.MouseEvent ) => { handleMouse(e, false) }
    } : {}

    const renderChildren = () => {
        // 设置subMenu的类名 判断是否展开
        const subMenuClisses = classNames('ck-submenu', { 'menu-opened': menuOpen })
        const childrenComponent = React.Children.map(children, (child, i) => {

            const childElement = child as FunctionComponentElement<MenuItemProps>

            const { displayName } = childElement.type

            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.error('warnig: submenu has a child which is not a MenuItem')
                return null
            }
        })
        return (
            <Transition
                in={ menuOpen } // 是否触发
                timeout={ 300 } // active-done 的自定义时间段
                animation='zoom-in-top'
            >
                <ul className={subMenuClisses}>
                    {childrenComponent}
                </ul>
            </Transition>
            
        )
    }

    return (
        <li key={ index } className={ classes } { ...hoverEvents }>
            <div className='submenu-title' { ...clickEvents }> 
                { title } 
                <Icon icon='angle-down' className='arrow-icon' />
            </div>
            { renderChildren() }
        </li>
    )
}

SubMenu.defaultProps = {}
SubMenu.displayName = 'SubMenu'

export default SubMenu
