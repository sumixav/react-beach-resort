import React from 'react'
import Room from './Room'


const RoomsList = ({ rooms }) => {
    if (rooms.length === 0) {
        return (
            <div className="empty-search">
                <h3>unfortunately no rooms matched your search preference</h3>

            </div>
        )
    }
    const roomsList = rooms.map((room, index) =>
        <Room room={room} key={room.id} />
    )
    return (
        <section className='roomslist'>
            <div className="roomslist-center">
                {roomsList}
            </div>
        </section>

    )
}

export default RoomsList
