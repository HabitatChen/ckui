var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useEffect, useRef } from 'react';
import Input from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import classNames from 'classnames';
import useClickOurside from '../../hooks/useClickOutside';
export var AutoComplete = function (props) {
    var renderOption = props.renderOption, value = props.value, fetchSuggest = props.fetchSuggest, onSelect = props.onSelect, restProps = __rest(props
    // 筛选框的内容项
    , ["renderOption", "value", "fetchSuggest", "onSelect"]);
    // 筛选框的内容项
    var _a = useState([]), suggestions = _a[0], setSuggestions = _a[1];
    // 异步请求的loading
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    // 输入框的展示值
    var _c = useState(value), inputValue = _c[0], setInputValue = _c[1];
    // 使用自定义hook
    var debouncedValue = useDebounce(inputValue, 500);
    // 当前高亮的下标
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    // triggerSearch 一开始是false
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    useClickOurside(componentRef, function () {
        setSuggestions([]);
    });
    // 添加一个Effect，当inputValue改变时 触发fetchSuggestion方法 
    useEffect(function () {
        if (debouncedValue && triggerSearch.current) {
            var result = fetchSuggest(debouncedValue);
            if (result instanceof Promise) {
                setLoading(true);
                result.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                });
            }
            else {
                setSuggestions(result);
            }
        }
        else {
            setSuggestions([]);
        }
        setHighlightIndex(-1);
    }, [debouncedValue, fetchSuggest]);
    /**
     * 输入值改变时触发
     *
     * @param e ChangeEvent
     */
    var handleChange = function (e) {
        setInputValue(e.target.value.trim());
        triggerSearch.current = true;
    };
    /**
     * 弹出框选项选中时触发
     *
     * @param item 筛选的内容项
     */
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        onSelect && onSelect(item.value);
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        console.log(11111);
        return (
        // <Transition
        //     in={loading}
        //     animation="zoom-in-top"
        //     timeout={300}
        //     // onExited={() => { setSuggestions([]) }}
        // >
        React.createElement("ul", { className: "ck-suggestion-list" },
            loading &&
                React.createElement("div", { className: "suggstions-loading-icon" },
                    React.createElement(Icon, { icon: "spinner", spin: true })),
            suggestions.map(function (item, index) {
                var cnames = classNames('suggestion-item', {
                    'is-active': index === highlightIndex
                });
                return (React.createElement("li", { key: index, className: cnames, onClick: function () { return handleSelect(item); } }, renderTemplate(item)));
            }),
            React.createElement("div", null, "hello world"))
        // </Transition>
        );
    };
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13: // enter
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 38: // 上箭头
                highlight(highlightIndex - 1);
                break;
            case 40: // 下箭头
                highlight(highlightIndex + 1);
                break;
            case 27:
                setSuggestions([]);
                break;
            default:
                break;
        }
    };
    console.log('suggestions', suggestions);
    return (React.createElement("div", { className: 'ck-auto-complete', ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange }, restProps, { onKeyDown: handleKeyDown })),
        loading && (React.createElement("ul", null,
            React.createElement(Icon, { icon: 'spinner', spin: true }))),
        suggestions.length > 0 && generateDropdown()));
};
export default AutoComplete;
