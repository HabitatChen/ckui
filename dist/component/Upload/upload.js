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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useRef, useState } from 'react';
import axios from 'axios';
import UploadList from './uploadList';
import Dragger from './dragger';
export var Upload = function (props) {
    var action = props.action, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, beforeUpload = props.beforeUpload, onChange = props.onChange, defaultFileList = props.defaultFileList, onRemove = props.onRemove, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag;
    var fileInput = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    // 更新fileList
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            console.log('prevList', prevList);
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    // 触发input组件出现
    var handleBtnClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    // input 上传事件改变
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    // 遍历文件列表 并调用上传方法
    var uploadFiles = function (files) {
        // 把伪数组转换为数组
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    // 上传文件方法
    var post = function (file) {
        var _file = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };
        // *** 易错点
        // 如果此时调用这样的方法，在多选上传时 只会更新到最后一个
        // setFileList([_file, ...fileList])
        // => 应该为如下代码
        setFileList(function (prevList) {
            return __spreadArrays([_file], prevList);
        });
        // 创建一个formData
        var formData = new FormData();
        // 1.添加自定义name
        formData.append(name || 'file', file);
        // 2. 添加用户自定义的data
        if (data) {
            Object.keys(data).forEach(function (key) { return formData.append(key, data[key]); });
        }
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
        }).then(function (resp) {
            console.log('resp', resp);
            updateFileList(_file, { status: 'success', response: resp.data });
            onSuccess && onSuccess(resp.data, file);
            onChange && onChange(file);
        }).catch(function (err) {
            console.error(err);
            updateFileList(_file, { status: 'error', error: err });
            onError && onError(err, file);
            onChange && onChange(file);
        });
    };
    // 处理用户点击删除
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        onRemove && onRemove(file);
    };
    return (React.createElement("div", { className: 'ck-upload-component' },
        React.createElement("div", { className: 'ck-upload-input', style: { display: 'inline-block' }, onClick: handleBtnClick },
            drag ? React.createElement(Dragger, { onFile: function (files) { uploadFiles(files); } }, children) : children,
            React.createElement("input", { type: "file", className: 'ck-file-input', style: { display: 'none' }, ref: fileInput, onChange: handleFileChange, accept: accept, multiple: multiple })),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    name: 'file'
};
export default Upload;
