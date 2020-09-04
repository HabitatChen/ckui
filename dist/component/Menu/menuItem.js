import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
var MenuItem = function (props) {
    var className = props.className, style = props.style, index = props.index, children = props.children, disabled = props.disabled;
    // 如何使用context
    var context = useContext(MenuContext);
    // btn btn-lg btn-primary
    var classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index // 使用父组件传入的activeIndex值 是否等于 当前菜单的index来判断是否是高亮的
    });
    // 创建子菜单的点击事件
    var handleClick = function () {
        if (!disabled && context.onSelect && typeof index === 'string') {
            context.onSelect(index);
        }
    };
    return (React.createElement("li", { className: classes, style: style, onClick: handleClick }, children));
};
MenuItem.defaultProps = {};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
