import React from 'react'
import { config } from 'react-transition-group'
import { render, RenderResult, fireEvent, wait } from '@testing-library/react'
import { AutoComplete, AutoCompleteProps } from './autoComplete'
import { watchFile } from "fs"

// 取消动画
config.disabled = true

const testArray = [
    { value: 'ab', number: 11 },
    { value: 'abc', number: 1 },
    { value: 'b', number: 4 },
    { value: 'c', number: 15 },
]

const testProps: AutoCompleteProps = {
    fetchSuggest: (query) => {
        return testArray.filter(item => item.value)
    },
    onSelect: jest.fn(),
    placeholder: 'auto-complete'
}

let wrapper: RenderResult, inputNode: HTMLInputElement
describe('test autoComplete component', () => {
    beforeEach(() => {
        wrapper = render(<AutoComplete { ...testProps } />)
        inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    })

    it('test basic AutoComplete behavior', async () => {
        // input change
        fireEvent.change(inputNode, { target: { value: 'a' } })
        console.log('wrapper', wrapper);
        
        await wait(() => {
            expect(wrapper.queryByText('ab')).toBeInTheDocument()
        })

        expect(wrapper.container.)
        
    })

    it('should provide keyboard support', () => {

    })

    it('click outside should hide the dropdown', () => {

    })

    it('renderoption ashould generate the right template', () => {

    })

    it('支持异步', () => {

    })


})

