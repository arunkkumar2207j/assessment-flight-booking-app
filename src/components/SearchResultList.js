import React from 'react'
import SearchResultItem from './SearchResultItem'

const SearchResultList = (props) => {
    const titleName = () => {
        let title;
        if(props.filters.source === '' || props.filters.destination === '') {
            title = 'All Flights'
        }
        else {
            title = props.filters.source + " > " + props.filters.destination;
        }
        return title;
    }
    return (
        <React.Fragment>
            <h1 className="search-result-title">{titleName()}</h1>
            {
                props.data.map((item, i) => {
                    return <SearchResultItem data={item} key={i} />
                })
            }
        </React.Fragment>
    )
}

export default SearchResultList;