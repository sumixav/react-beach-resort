import React from 'react'
import loadingGif from '../images/gif/loading-arrow.gif'

const Loading = (props) => {
    return (
        <div className="loading">
            <h4>Rooms data loading...</h4>
            <img src={loadingGif} alt="loading.." />
        </div>
    )
}

export default Loading
