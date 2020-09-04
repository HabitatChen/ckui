import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload, UploadFile } from './upload'
import { fileURLToPath } from "url"
import Button from '../Button/button'
import Icon from '../Icon/icon'

const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
        alert('file too big')
        return false
    } else {
        return true
    }
}

// const defaultFileList: UploadFile[] = [
//     { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 20 },
//     { uid: '122', size: 1235, name: 'hello1.md', status: 'success', percent: 30 },
//     { uid: '121', size: 1236, name: 'hello2.md', status: 'error', percent: 40 },
// ]

const filePromise = (file: File) => {
    const newFile = new File([file], 'new_name.txt', { type: file.type })
    return Promise.resolve(newFile)
}

const SimpleUpload = () => {
    return (
        <Upload
            // action='https://jsonplaceholder.typicode.com/posts/'
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onProgress={(percentage) => {
                console.log('percentage', percentage);
                
            }}
            onSuccess={action('success')}
            onError={action('error')}
            onChange={action('change')}
            beforeUpload={filePromise}
            defaultFileList={ [] }
            name='ck-file'
            headers={{'X-Powered-By': 'ck'}}
            // accept='.txt'
            // multiple
            drag
        >
            <Icon icon="upload" size="5x" theme="secondary" />
            <br />
            <p>Drag file over to upload</p>
        </Upload>
    )
}

storiesOf('Upload component', module)
    .add('Upload', SimpleUpload)