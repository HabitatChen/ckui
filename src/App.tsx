import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { loadPartialConfig } from "@babel/core";

const App: React.FC = () => {
    const [title, setTitle] = useState('')
    const postData = {
        title: 'my title',
        body: 'hello man'
    }
    useEffect(() => {
        // get 
        // axios.get('https://jsonplaceholder.typicode.com/posts/1', {
        //     headers: {
        //         'X-Requested-With': 'XMLHttpRequest'
        //     },
        //     responseType: 'json'
        // })
        //     .then(resp => {
        //         console.log('resp', resp);
        //         setTitle(resp.data.title)
        //     })

        // post
        // axios.post('https://jsonplaceholder.typicode.com/posts', postData, {

        // })
        //     .then(resp => {
        //         console.log('resp', resp);
        //         setTitle(resp.data.title)
                
        //     })

        
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            const uploadedFile = files[0]
            const formData = new FormData()
            formData.append(uploadedFile.name, uploadedFile)
            axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                responseType: 'json'
            })
                .then(resp => {
                    console.log('resp', resp);
                    
                })
        }
    }

    return (
        <div className='App'>
            {/* <form action="https://jsonplaceholder.typicode.com/posts" method='post' encType='multipart/form-data'>
                <input type="file" name='myFile'/>
                <button type='submit'>Submit</button>
            </form> */}

            <input type="file" name='myFile' onChange={ handleFileChange }/>
            
        </div>
    )
}

export default App;
