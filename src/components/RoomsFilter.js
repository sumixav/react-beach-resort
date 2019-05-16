import React from 'react'
import { useContext } from 'react'
import { RoomContext } from '../context'
import Title from './Title'
import { summarizers } from 'istanbul-lib-report';

const getUnique = (items, value) => {
    //value - type (or) capacity
    // const t = 'type'
    // const v = 'capacity'
    // const types = items.map(item => item[t]) //same as item.type
    // const uniqueTypes = new Set(types);
    // console.log(types,uniqueTypes)
    // const capacities = items.map(item => item[v]) //same as item.capacity
    // const uniqueCapacities = new Set(capacities);
    // console.log(capacities,uniqueCapacities)

    const reqItems = items.map(item => item[value]) //same as item.type
    const uniquereqItems = new Set(reqItems);

    return [...uniquereqItems]

}

const RoomsFilter = ({ rooms }) => {
    /*
    * instead of 
    * static contextType = RoomContext;
    * const context = this.context
    * //use Hooks
    * */
    const context = useContext(RoomContext)
    const {
        handleChange,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets,
    } = context
    let uniqueTypes = getUnique(rooms, 'type')
    //console.log(uniqueTypes)
    //add 'all'
    uniqueTypes = ['all', ...uniqueTypes]
    let uniqueCapacities = getUnique(rooms, 'capacity')
    //map to jsx
    const types = uniqueTypes.map((item, index) =>
        <option
            value={item}
            key={index}>{item}</option>
    )
    const guests = uniqueCapacities.map((item, index) =>
        <option
            value={item}
            key={index}>{item}</option>
    )
    return (
        <section className="filter-container">
            <Title title="search rooms" />
            <form className="filter-form">
                {/* type select  */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select name="type"
                        id="type"
                        value={type}
                        className="form-control"
                        onChange={handleChange} >
                        {types}
                    </select>
                </div>
                {/* end of type select */}
                {/* guests select  */}
                <div className="form-group">
                    <label htmlFor="capacity">guests</label>
                    {/* values in SELECT auto a STRING  */}
                    <select name="capacity"
                        id="capacity"
                        value={capacity}
                        className="form-control"
                        onChange={handleChange} >
                        {guests}
                    </select>
                </div>
                {/*end of guests select */}
                {/* room price */}
                <div className="form-group">
                    <label htmlFor="roomPrice">room price: ${price}</label>
                    <input name="price"
                        type="range"
                        value={price}
                        onChange={handleChange}
                        min={minPrice}
                        max={maxPrice}
                        id="price"
                        className="form-control" />

                </div>
                {/* size */}
                <div className="form-group">
                    <label htmlFor="roomPrice">Size in SQFT</label>
                    <div className="size-inputs">
                        <input name="minSize"
                            type="number"
                            value={minSize}
                            onChange={handleChange}
                            id="size"
                            className="size-input" />
                        <input name="maxSize"
                            type="number"
                            value={maxSize}
                            onChange={handleChange}
                            id="size"
                            className="size-input" />
                    </div>

                </div>
                {/* end of size */}
                {/* end of room price */}
                {/* breakfast */}
                <div className="form-group">
                    <div className="single-extra">
                        <input
                            name="breakfast"
                            id="breakfast"
                            type="checkbox"
                            checked={breakfast}
                            onChange={handleChange} />
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
                </div>
                {/*end of  breakfast */}
                {/* pets */}
                <div className="form-group">
                    <div className="single-extra">
                        <input
                            id="label"
                            name="pets"
                            type="checkbox"
                            checked={pets}
                            onChange={handleChange} />
                        <label htmlFor="pets">pets</label>
                    </div>
                </div>
                {/* end of pets */}
            </form>
        </section>
    )
}

export default RoomsFilter
