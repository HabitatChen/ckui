import React, { FC, useRef, ChangeEvent, useState, DragEvent } from 'react'
import classNames from 'classnames'

interface DraggerProps {
    onFile: (files: FileList) => void
}

export const Dragger: FC<DraggerProps> = (props) => {
    const { onFile, children } = props
    const [ dragOver, setDragOver ] = useState(false)
    const classes = classNames('ck-uploader-dragger', {
        'is-dragover': dragOver
    })

    const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault()
        setDragOver(over)
    }

    const handleDrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault()
        setDragOver(false)
        // 将文件暴露出去 然后调用外部方法 将文件上传
        onFile(e.dataTransfer.files)
    }

    return (
        <div
            className={classes}
            onDragOver={ e => { handleDrag(e, true)}}
            onDragLeave={ e => { handleDrag(e, false)}}
            onDrop={handleDrop}
        >
            { children }
        </div>
    )
}

export default Dragger;