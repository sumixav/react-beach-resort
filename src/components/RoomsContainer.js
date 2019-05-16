import React from 'react'
import RoomsFilter from './RoomsFilter'
import RoomsList from './RoomsList'
import { withRoomConsumer } from '../context'
import Loading from './Loading'

const RoomsContainer = ({ context }) => {
    const { loading, sortedRooms, rooms } = context;
    //console.log(rooms)
    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <>
            <RoomsFilter rooms={rooms} />
            <RoomsList rooms={sortedRooms} />
        </>
    )
}
// whenever hoc are used props passed to hoc not to original components
//from hoc, functionalities are passed as props to original comp and remaining props are also added
export default withRoomConsumer(RoomsContainer)




// import React from 'react'
// import RoomsFilter from './RoomsFilter'
// import RoomsList from './RoomsList'
// import { RoomConsumer } from '../context'
// import Loading from './Loading'

// const RoomsContainer = (props) => {
//     return (

//         <RoomConsumer>
//             {/* run this function in RoomConsumer;
//         value - from RoomContext.Provider */}
//             {value => {
//                 const {loading, sortedRooms, rooms} = value;
//                 console.log(loading, sortedRooms);
//                 if (loading){
//                     return (
//                         <Loading />
//                     )
//                 }
//                 return (
//                     <div>
//                         Hello from RoomsContainer
//                         <RoomsFilter rooms={rooms}/>
//                         <RoomsList rooms={sortedRooms}/>
//                     </div>
//                 )
//             }

//             }

//         </RoomConsumer>

//     )
// }

// export default RoomsContainer
