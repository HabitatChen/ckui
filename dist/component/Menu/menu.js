import React, { createContext, useState } from 'react';
import classNames from 'classnames';
// 设置默认的高亮的元素
export var MenuContext = createContext({
    index: '0'
});
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * ~~~js
 * import { Menu } from 'ckui'
 * ~~~
 */
export var Menu = function (props) {
    var className = props.className, style = props.style, mode = props.mode, onSelect = props.onSelect, defaultIndex = props.defaultIndex, children = props.children, defaultOpenSubmenus = props.defaultOpenSubmenus;
    // 创建一个state来记录当前选中的导航的index
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    // 用户点击的时候做了两件事情 
    // 1:会改变当前高亮的菜单 
    // 2:调用用户自定义的方法
    var handleClick = function (index) {
        // 1. 设置当前高亮的菜单
        setActive(index);
        // 2. 如果传入了自定义的方法 就会调用该方法
        onSelect && onSelect(index);
    };
    // 创建一个传递给自组件的 context  这个特么和初始的context有个瘠薄区别？
    // 是整合了 用户传入的onSelect方法，因为创建上下文的时候，并不能够拿到这个onSelect方法
    var passedContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubmenus: defaultOpenSubmenus
    };
    // btn btn-lg btn-primary
    var classes = classNames('menu', className, {
        'menu-horizantol': mode === 'horizantol',
        'menu-vertical': mode === 'vertical'
    });
    // 使用React.Children.map 对子节点进行遍历
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, { index: index.toString() });
            }
            else {
                console.error('warnig: menu has a child which is not a MenuItem');
                return null;
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": 'test-menu' },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    mode: 'horizantol',
    defaultIndex: '0',
    defaultOpenSubmenus: []
};
export default Menu;
