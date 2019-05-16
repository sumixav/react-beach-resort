import React, { Component } from 'react';
import { RoomContext } from '../context';
import defaultBcg from '../images/room-1.jpeg'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import { Link } from 'react-router-dom'
import StyledHero from '../components/StyledHero'


class SingleRoom extends Component {
    constructor(props) {
        super(props)
        //props passed by react-router
        console.log(this.props)
        console.log(this.props.match.params.slug)
        this.state = {
            slug: this.props.match.params.slug,//unique
            defaultBcg
            //can set up loading flag
        }

    }
    //componentDidMount() - access to props

    static contextType = RoomContext;

    render() {
        //const room = this.context.getRoom(this.state.slug)
        const { getRoom } = this.context;
        const room = getRoom(this.state.slug)
        console.log(room)
        if (!room) {
            //if room undefined(loading/error); happens when you refresh page
            return (


                <div className="error">
                    <h3>no such room found...</h3>
                    <Link to="/rooms" className="btn-primary">Back to rooms</Link>
                </div>
            )

        }
        const {
            breakfast,
            capacity,
            description,
            extras,
            featured,
            id,
            images,
            name,
            pets,
            price,
            size,
            slug,
            type
        } = room;
        const [mainImg, ...defaultImgs] = images;
        
        //console.log(defaultImgs)
        //console.log(defaultImgs[0])
        //mainImg - images[0] rest named with defaultImg[]

        return (
            //<Hero hero="roomsHero"></Hero>
            <>
                {/* <StyledHero img={mainImg || this.state.defaultBcg}> */}
                <StyledHero img={mainImg}>
                    <Banner
                        title={`${name} room`}>
                        <Link to="/rooms" className='btn-primary'>back to rooms</Link>
                    </Banner>
                </StyledHero>
                <section className="single-room">
                    <div className="single-room-images">
                        {defaultImgs.map((item, index) => {
                            return (
                                <img key={index} src={item} alt={name} />
                            )
                        })}
                    </div>
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>details</h3>
                            <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>info</h3>
                            <h6>price: ${price}</h6>
                            <h6>size: {size} SQFT</h6>
                            <h6>max capacity:  {capacity <1 ? `${capacity} person` : `${capacity} people`}</h6>
                            <h6>{pets? 'pets allowed' : 'no pets allowed'}</h6>
                            <h6>{breakfast && 'free breakfast included'}</h6>                    
                        </article>
                    </div>
                </section>
                <section className="room-extras">
                <h6>Extras</h6>
                <ul className="extras">
                    {extras.map((item,index)=> <li key={index} >- {item}</li> )}
                </ul>
                </section>
            </>

        );
    }
}

export default SingleRoom;