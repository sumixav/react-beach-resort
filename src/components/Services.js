import React, { Component } from 'react';
import Title from './Title'
import { FaShuttleVan, FaBeer, FaCocktail, FaHiking } from "react-icons/fa";

class Services extends Component {
    state = {

        services: [
            {
                icon: <FaShuttleVan />,
                title: 'free shuttle',
                description: 'Lorem ipsum dolor sit amet, mel aeque virtute appetere ne, eros natum essent et duo, ea meliore moderatius est. Novum disputationi ius id, nec altera vidisse cu.' 
            },
            {
                icon: <FaCocktail />,
                title: 'free cocktails',
                description: 'Lorem ipsum dolor sit amet, mel aeque virtute appetere ne, eros natum essent et duo, ea meliore moderatius est. Novum disputationi ius id, nec altera vidisse cu.' 
            },
            {
                icon: <FaBeer />,
                title: 'strongest beer',
                description: 'Lorem ipsum dolor sit amet, mel aeque virtute appetere ne, eros natum essent et duo, ea meliore moderatius est. Novum disputationi ius id, nec altera vidisse cu.' 
            },
            {
                icon: <FaHiking />,
                title: 'endless hiking',
                description: 'Lorem ipsum dolor sit amet, mel aeque virtute appetere ne, eros natum essent et duo, ea meliore moderatius est. Novum disputationi ius id, nec altera vidisse cu.' 
            },
        ]
    }
    render() {
        const items = this.state.services.map(({ icon, title, description }, index) => {
            return <article
                className="service"
                key={index}>
                <span>{icon} </span>
                <h6>{title}</h6>
                <p>{description}</p>
            </article>
        })
        return (
            <section className='services'>


                <Title title='services' />
                <div className='services-center'>
                    {items}
                </div>
            </section>
        );
    }
}

export default Services;