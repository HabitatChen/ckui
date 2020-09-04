import React, { FC, CSSProperties } from 'react';
declare type MenuMode = 'horizantol' | 'vertical';
declare type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    className?: string;
    style?: CSSProperties;
    /**菜单类型 横向或者纵向 */
    mode?: MenuMode;
    /**点击菜单项触发的回掉函数 */
    onSelect?: SelectCallback;
    /**默认 active 的菜单项的索引值 */
    defaultIndex?: string;
    /**设置子菜单的默认打开 只在纵向模式下生效 */
    defaultOpenSubmenus?: string[];
}
export interface MenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubmenus?: string[];
}
export declare const MenuContext: React.Context<MenuContext>;
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * ~~~js
 * import { Menu } from 'ckui'
 * ~~~
 */
export declare const Menu: FC<MenuProps>;
export default Menu;
