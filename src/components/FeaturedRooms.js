import React, { Component } from 'react';
import {RoomContext} from '../context';
import Loading from '../components/Loading'
import Room from '../components/Room'
import Title from '../components/Title'
class FeaturedRooms extends Component {
    //step 1
    static contextType = RoomContext
    render() {
        //after step 1, can access values - step 2
        //alias in object restructuring 
        //{featuredRooms : rooms}
        let {loading, featuredRooms} = this.context;
        featuredRooms = featuredRooms.map(room =>{
           
            return <Room key ={room.id} room={room} />
        }
        )
        return (
            
            <section className="featured-rooms">
                <Title title='featured rooms'/>
                <div className="featured-rooms-center">
                {loading ? <Loading /> : featuredRooms}
                </div>
               
            </section>
        );
    }
}

export default FeaturedRooms;

