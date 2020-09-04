import { FC } from 'react';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
export declare type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { Icon } from 'ckui'
 * ~~~
 */
export interface IconProps extends FontAwesomeIconProps {
    /** 约定不同的主题 */
    theme?: ThemeProps;
}
export declare const Icon: FC<IconProps>;
export default Icon;
