import { useState, useEffect } from 'react';
function useDebounce(value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(value), debounceValue = _a[0], setDebounceValue = _a[1];
    useEffect(function () {
        var handler = window.setTimeout(function () {
            setDebounceValue(value);
        }, delay);
        // 当return返回函数的时候 下一次更新的时候 会清除上一次的定时器 所以如果在300ms内多次输入的时候 每次都会清除掉上一次的定时器
        return function () { clearTimeout(handler); };
    }, [value, delay]);
    return debounceValue;
}
export default useDebounce;
