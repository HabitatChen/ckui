import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

// 设计API
export interface MenuItemProps {
    className?: string
    style?: React.CSSProperties
    index?: string
    disabled?: boolean
}

const MenuItem: React.FC<MenuItemProps> = (props) => {

    const { className, style, index, children, disabled } = props

    // 如何使用context
    const context = useContext(MenuContext)

    // btn btn-lg btn-primary
    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index // 使用父组件传入的activeIndex值 是否等于 当前菜单的index来判断是否是高亮的
    })

    // 创建子菜单的点击事件
    const handleClick = () => {
        if (!disabled && context.onSelect && typeof index === 'string') {
            context.onSelect(index)
        }
    }

    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}

MenuItem.defaultProps = {}
MenuItem.displayName = 'MenuItem'

export default MenuItem