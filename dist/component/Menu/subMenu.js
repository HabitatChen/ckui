var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
var SubMenu = function (_a) {
    var index = _a.index, title = _a.title, children = _a.children, className = _a.className;
    var context = useContext(MenuContext);
    // 用 isOpend 这个参数去潘初始化判断是否是展开的
    var openedSubMenus = context.defaultOpenSubmenus;
    var isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
    // 初始化 submenu 是否展开
    var _b = useState(isOpend), menuOpen = _b[0], setOpen = _b[1];
    var classes = classNames('menu-item submenu-item', classNames, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    });
    var timer;
    // 根据不同模式传入是hover事件还是click事件 
    // 当是横向的时候的鼠标移入移出事件
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    // 使用三元表达式子来处理事件 然后使用展开运算符来添加到节点上去 
    var clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {};
    var hoverEvents = context.mode === 'horizantol' ? {
        onMouseEnter: function (e) {
            console.log(123);
            ;
            handleMouse(e, true);
        },
        onMouseLeave: function (e) { handleMouse(e, false); }
    } : {};
    var renderChildren = function () {
        // 设置subMenu的类名 判断是否展开
        var subMenuClisses = classNames('ck-submenu', { 'menu-opened': menuOpen });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: index + "-" + i
                });
            }
            else {
                console.error('warnig: submenu has a child which is not a MenuItem');
                return null;
            }
        });
        return (React.createElement(Transition, { in: menuOpen, timeout: 300, animation: 'zoom-in-top' },
            React.createElement("ul", { className: subMenuClisses }, childrenComponent)));
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvents),
        React.createElement("div", __assign({ className: 'submenu-title' }, clickEvents),
            title,
            React.createElement(Icon, { icon: 'angle-down', className: 'arrow-icon' })),
        renderChildren()));
};
SubMenu.defaultProps = {};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
