import React, { useState, useEffect } from 'react'

function useDebounce(value: any, delay = 300) {
    const [ debounceValue, setDebounceValue ] = useState(value)
    useEffect(() => {
        const handler = window.setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        // 当return返回函数的时候 下一次更新的时候 会清除上一次的定时器 所以如果在300ms内多次输入的时候 每次都会清除掉上一次的定时器
        return () => { clearTimeout(handler) }
    }, [value, delay])
    return debounceValue
}

export default useDebounce