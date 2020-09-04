import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import Button from '../Button/button'
import UploadList from './uploadList'
import Dragger from './dragger'

export interface IUploadProps {
    action: string;
    beforeUpload?: (file: File) => boolean | Promise<File>
    onProgress?: (percentage: number, file: File) => void
    onSuccess?: (data: any, file: File) => void
    onError?: (err: any, file: File) => void
    onChange?: (file: File) => void
    defaultFileList?: UploadFile[]
    onRemove?: (file: UploadFile) => void
    headers?: { [key: string]: any }
    name?: string
    data?: { [key: string]: any }
    withCredentials?: boolean
    accept?: string
    multiple?: boolean
    drag?: boolean
}

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
    uid: string
    size: number
    name: string
    status?: UploadFileStatus
    percent?: number
    raw?: File
    response?: any
    error?: any
   
}




export const Upload: FC<IUploadProps> = (props) => {

    const { action, onProgress, onSuccess, 
        onError, beforeUpload, 
        onChange, defaultFileList, onRemove,
        headers, name, data, withCredentials,
        accept, multiple, children, drag
     } = props 
    const fileInput = useRef<HTMLInputElement>(null)
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])

    // 更新fileList
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
            console.log('prevList', prevList);
            return prevList.map(file => {
                if (file.uid === updateFile.uid) {
                    return { ...file, ...updateObj }
                } else {
                    return file
                }
            })
        })
    }

    // 触发input组件出现
    const handleBtnClick = () => {
        if (fileInput.current) { fileInput.current.click() }
    }

    // input 上传事件改变
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) { return }

        uploadFiles(files)

        if (fileInput.current) { fileInput.current.value = '' }
    }

    // 遍历文件列表 并调用上传方法
    const uploadFiles = (files: FileList) => {
        // 把伪数组转换为数组
        let postFiles = Array.from(files)
        postFiles.forEach((file) => {
            if (!beforeUpload) {
                post(file)   
            } else {
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                } else if (result !== false) {
                    post(file)
                }
            }
        })
    }

    // 上传文件方法
    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }

        // *** 易错点
        // 如果此时调用这样的方法，在多选上传时 只会更新到最后一个
        // setFileList([_file, ...fileList])

        // => 应该为如下代码
        setFileList((prevList) => {
            return [_file, ...prevList]
        })

        // 创建一个formData
        const formData = new FormData()

        // 1.添加自定义name
        formData.append(name || 'file', file)

        // 2. 添加用户自定义的data
        if (data) {
            Object.keys(data).forEach(key => formData.append(key, data[key]))
        }

        axios.post(action, formData, {
            headers: {
                ...headers,  // 3. 添加自定义的 headers
                'Content-Type': 'multipart/form-data'
            },
            withCredentials, // 4. 添加发送时是否携带cookie
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' })
                    if (onProgress) {
                        onProgress(percentage, file)
                    }
                }
            }
        }).then((resp) => {
            console.log('resp', resp);
            updateFileList(_file, { status: 'success', response: resp.data })
            onSuccess && onSuccess(resp.data, file) 
            onChange && onChange(file) 
        }).catch(err =>{
            console.error(err)
            updateFileList(_file, { status: 'error', error: err })
            onError && onError(err, file)
            onChange && onChange(file) 
        })
    }

    // 处理用户点击删除
    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => {
            return prevList.filter(item => item.uid !== file.uid)
        })
        onRemove && onRemove(file)
    }

    return (
        <div
            className='ck-upload-component'
        >

            <div 
                className='ck-upload-input'
                style={{ display: 'inline-block' }}
                onClick={ handleBtnClick}
            >
                {
                    drag ? <Dragger onFile={(files) => { uploadFiles(files)}}>{ children }</Dragger> : children
                }

                <input
                    type="file"
                    className='ck-file-input'
                    style={{ display: 'none' }}
                    ref={fileInput}
                    onChange={handleFileChange}
                    accept={accept}
                    multiple={multiple}
                />

            </div>

            <UploadList 
                fileList={ fileList } 
                onRemove={handleRemove}
            />

        </div>
    )
}

Upload.defaultProps = {
    name: 'file'
}

export default Upload;