import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

export const defaultMenu = () => (
    <Menu defaultIndex='0' onSelect={(index) => { action(`clicked ${index} item`) }} >
        <MenuItem>
            cool link
    </MenuItem>
        <MenuItem disabled>
            disabled
    </MenuItem>
        <MenuItem>
            cool link 2
    </MenuItem>
        {/* <SubMenu title='sub menu'>
            <MenuItem> cool link 3 </MenuItem>
            <MenuItem> cool link 4 </MenuItem>
            <MenuItem> cool link 5 </MenuItem>
        </SubMenu> */}
    </Menu>
)

export const verticalMenu = () => (
    <Menu mode='vertical' defaultOpenSubmenus={['3']} onSelect={(index) => { action(`clicked ${index} item`) }} >
        <MenuItem>
            cool link
        </MenuItem>
        <MenuItem disabled>
            disabled
        </MenuItem>
        <MenuItem>
            cool link 2
        </MenuItem>
        {/* <SubMenu title='sub menu' >
            <MenuItem> cool link 3 </MenuItem>
            <MenuItem> cool link 4 </MenuItem>
            <MenuItem> cool link 5 </MenuItem>
        </SubMenu> */}
    </Menu> 
)

storiesOf('Menu 菜单', module)
    .add('Menu', defaultMenu)
    .add('Vertical Menu', verticalMenu)