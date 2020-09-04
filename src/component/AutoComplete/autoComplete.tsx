import React, { FC, useState, ChangeEvent, ReactElement, useEffect, KeyboardEvent, useRef } from 'react'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import classNames from 'classnames'
import useClickOurside from '../../hooks/useClickOutside'

interface DataSourceObject {
    value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggest: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: string) => void
    renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {

    const { renderOption, value, fetchSuggest, onSelect, ...restProps } = props

    // 筛选框的内容项
    const [ suggestions, setSuggestions ] = useState<DataSourceType[]>([])
    // 异步请求的loading
    const [ loading, setLoading ] = useState(false)
    // 输入框的展示值
    const [ inputValue, setInputValue ] = useState(value as string)
    // 使用自定义hook
    const debouncedValue = useDebounce(inputValue, 500)
    // 当前高亮的下标
    const [ highlightIndex, setHighlightIndex ] = useState(-1)
    // triggerSearch 一开始是false
    const triggerSearch = useRef(false)

    const componentRef = useRef<HTMLDivElement>(null)

    useClickOurside(componentRef, () => {
        setSuggestions([])
    })

    // 添加一个Effect，当inputValue改变时 触发fetchSuggestion方法 
    useEffect(() => {
        if (debouncedValue && triggerSearch.current) {
            const result = fetchSuggest(debouncedValue)
            if (result instanceof Promise) {
                setLoading(true)
                result.then(data => {
                    setLoading(false)
                    setSuggestions(data)
                })        
            } else {
                setSuggestions(result)
            }
        } else {
            setSuggestions([])
        }
        setHighlightIndex(-1)
    }, [debouncedValue, fetchSuggest])

    /**
     * 输入值改变时触发
     * 
     * @param e ChangeEvent
     */
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { 
        setInputValue( e.target.value.trim() ) 
        triggerSearch.current = true
    }

    /**
     * 弹出框选项选中时触发
     * 
     * @param item 筛选的内容项
     */
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestions([])
        onSelect && onSelect(item.value)
        triggerSearch.current = false
    }

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }

    const generateDropdown = () => {
        console.log(11111);
        
        return (
            // <Transition
            //     in={loading}
            //     animation="zoom-in-top"
            //     timeout={300}
            //     // onExited={() => { setSuggestions([]) }}
            // >
                <ul className="ck-suggestion-list">
                    {loading &&
                        <div className="suggstions-loading-icon">
                            <Icon icon="spinner" spin />
                        </div>
                    }
                    {suggestions.map((item, index) => {
                        const cnames = classNames('suggestion-item', {
                            'is-active': index === highlightIndex
                        })
                        return (
                            <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                                {renderTemplate(item)}
                            </li>
                        )
                    })}
                    {
                        <div>hello world</div>
                    }
                </ul>
            // </Transition>
        )
    }

    const highlight = (index: number) => {
        if (index < 0) index = 0 
        if (index >= suggestions.length) {
            index = suggestions.length - 1
        }
        setHighlightIndex(index)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch(e.keyCode) {
            case 13:  // enter
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex])
                }
                break
            case 38:  // 上箭头
                highlight(highlightIndex - 1)
                break
            case 40:  // 下箭头
                highlight(highlightIndex + 1)
                break
            case 27:
                setSuggestions([])
                break
            default:
                break
        }
    }

    console.log('suggestions', suggestions);
    

    return (
        <div className='ck-auto-complete' ref={ componentRef }>
            <Input 
                value={ inputValue }
                onChange={ handleChange}
                { ...restProps }
                onKeyDown={ handleKeyDown }
            />
            { loading && ( <ul><Icon icon='spinner' spin/></ul>) }
            { suggestions.length > 0 && generateDropdown() }
        </div>
    )

}

export default AutoComplete;