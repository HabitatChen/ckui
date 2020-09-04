import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AutoComplete } from './autoComplete'
import { DataSourceType } from './autoComplete'

interface LakerPlayProps {
    value: string
    number?: number
}

const SimpleComplete = () => {
    // const handleFetch = (query: string) => {
    //     return lakers.filter(name => name.includes(query)).map((name) => ({ value: name }))
    // }

    // const handleFetch = (query: string) => {
    //     return lakersObj.filter( player => player.value.includes(query))
    // }

    const handleFetch = (query: string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res => res.json())
            .then( ({ items }) => {
                console.log('item', items);
                const formatItems = items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
                return formatItems
            })
    }


    const renderTemplate = (item: DataSourceType<LakerPlayProps>) => {
        return (
            <>
                <p>Name: {item.value}</p>
            </>
        )
            
    }
    return (
        <AutoComplete 
            style={{ width: 300 }}
            fetchSuggest={ handleFetch }
            onSelect={ (item) => { console.log(item) } }
            renderOption={ renderTemplate }
        />
    )

}

storiesOf('AutoComplete 自动补全', module)
    .add('AutoComplete', SimpleComplete)
