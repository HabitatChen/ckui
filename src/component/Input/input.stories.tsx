import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Input from './input'

const defaultInput = () => (
    <>
        <Input />
        <Input size='lg' />
        <Input size='sm' />
    </>
)

storiesOf('Input 输入框', module)
    .add('Input', defaultInput)