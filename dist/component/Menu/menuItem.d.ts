import React from 'react';
export interface MenuItemProps {
    className?: string;
    style?: React.CSSProperties;
    index?: string;
    disabled?: boolean;
}
declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
