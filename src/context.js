import React, { Component } from 'react';
import items from './data'
import Client from './Contentful'
const RoomContext = React.createContext();

// Client.getEntries({
//     content_type: "beachResortRoom"
// })
//     .then((response) => console.log(response.items))
//     .catch(console.error)

//context allows to avoid prop drilling
//Provider provides all components in component tree to access value
//Provider wraps component tree
class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true, //not needed in case of local storage, since it's fast
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false,


    };
    //getData
    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: "beachResortRoom",
                //order: 'sys.createdAt'
                //order: 'fields.price'
                //order: '-fields.name'
                order: '-fields.price'
            })
            let items1 = await (response.items)
            console.log(items1)
            console.log(items)
            let newArray = [...items1,...items]
            console.log(newArray)
            //let rooms = this.formatData(items);
            let rooms = this.formatData(newArray);
            //let rooms = this.formatData(items1);
            let featuredRooms = rooms.filter(item => {
                return (item.featured)
            })

            //for RoomsFilter component
            let maxPrice = Math.max(...rooms.map(room => room.price))
            let maxSize = Math.max(...rooms.map(room => room.size))

            console.log(maxSize)
            this.setState(
                {
                    rooms,
                    featuredRooms,
                    sortedRooms: rooms,
                    loading: false,
                    price: maxPrice,
                    maxPrice,
                    maxSize
                }
            )
            //console.log(rooms)
            //console.log(featuredRooms)

        } catch (error) {
            console.log(Error)

        }

    }




    componentDidMount() {
        this.getData();

    }

    //to avoid putting too much info in single room
    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug)
        return room;
    }

    handleChange = (event) => {
        let { type, name, value, checked } = event.target;
        value = (type === 'checkbox') ? checked : value
        console.log(`type:${type}\nname:${name}\nvalue:${value}\nchecked:${checked}`)
        /* set the current value; 
        *once set set callback function to filter rooms 
        * */
        this.setState({
            [name]: value

        }, this.filterRooms)
    }

    filterRooms = () => {
        console.log(`called filterRooms\ntype:${this.state.type}\capacity:${this.state.capacity}`)
        let {
            rooms,
            type,
            capacity,
            price,
            minSize,
            maxSize,
            breakfast,
            pets
        } = this.state;
        //all the rooms
        let tempRooms = [...rooms];

        //transform value
        capacity = parseInt(capacity)
        price = parseInt(price)

        //filter by type
        if (type !== 'all') {//filter
            tempRooms = tempRooms.filter(item => {
                //console.log(item.type,type,item.capacity,capacity)
                return (item.type === type)

            })
            //console.log(tempRooms)
        }

        //filter by capacity
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(item =>
                item.capacity >= capacity);
        }

        //filter by price
        tempRooms = tempRooms.filter(item => {
            return item.price <= price
        })

        //filter by breakfast 
        if (breakfast) {
            //console.log(breakfast)
            tempRooms = tempRooms.filter(item =>
                item.breakfast);
        }
        //filter by pets
        if (pets) {
            //console.log(pets)
            tempRooms = tempRooms.filter(item =>
                item.pets);
        }

        //filter by size
        tempRooms = tempRooms.filter(item =>
            item.size >= minSize && item.size <= maxSize);


        console.log(tempRooms)

        //change state
        this.setState({
            sortedRooms: tempRooms
        })


    }

    formatData = (items) => {
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url)
            //overwrite images in item.fields (images: images)
            let room = { ...item.fields, images, id }
            return room
        })
        // let sumofids = tempItems.reduce((prevValue, item) =>{
        //     return prevValue + +item.id;

        // }, 0)
        //console.log(sumofids)
        return tempItems;

    }



    render() {
        //let { rooms, featuredRooms } = this.state;
        //console.log(rooms, featuredRooms)
        //console.log(this.state)
        return (
            <RoomContext.Provider
                value={{ ...this.state, getRoom: this.getRoom, handleChange: this.handleChange }}>
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}

const RoomConsumer = RoomContext.Consumer;

//Higher order component - method 2
const withRoomConsumer = WrappedComponent => {
    //class withRoomConsumer extends Component {
    function withRoomConsumer(props) {
        //render() {
        return (
            <RoomConsumer>
                {value => <WrappedComponent {/*...this.props*/...props} context={value} />}
            </RoomConsumer>
        );
        // }
    }

    return withRoomConsumer
}

//Higher order component - method 2
// export const withRoomConsumer = (Component) => {
//     return function ConsumerWrapper(props) {
//         return ( 
//             <RoomConsumer>
//                 {value => <Component {...props} context={value} />}
//             </RoomConsumer>
//         )

//     }
// }


export { RoomProvider, RoomConsumer, RoomContext, withRoomConsumer };