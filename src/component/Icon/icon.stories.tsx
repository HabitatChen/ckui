import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Icon from './icon'

const defaultIcon = () => (
    <Icon icon="coffee" theme='primary'/>
)
const iconWidthTheme = () => (
    <>
        <Icon icon="coffee" theme='danger' />
        <Icon icon="coffee" theme='primary' />
        <Icon icon="coffee" theme='info' />
        <Icon icon="coffee" theme='dark' />
        <Icon icon="coffee" theme='secondary' />
        <Icon icon="coffee" theme='warning' />
    </>
)



storiesOf('Icon 图标', module)
    .add('Icon', defaultIcon)
    .add('不同主题的 Icon', iconWidthTheme)