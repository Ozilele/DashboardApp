import React from 'react';
import './index.css';
import DestinationItem from '../items/DestinationItem';

const destinations = [
  {
    city: "Warsaw",
    country: "Poland",
    recommendationCount: 150000,
  },
  {
    city: "Krakow",
    country: "Poland",
    recommendationCount: 125000,
  },
  {
    city: "Paris",
    country: "France",
    recommendationCount: 200000,
  },
  {
    city: "London",
    country: "UK",
    recommendationCount: 350000,
  }
]

const Destinations = () => {
  return (
    <div className='popular-destinations'>
      <h3>Popular Destinations</h3>
      <p>From historical cities to natural specteculars, come see the best of the world!</p>
      <div className='destinations-results'>
        {destinations.map((destination, i) => {
          return (
            <DestinationItem
              key={i}
              id={i}
              city={destination.city}
              country={destination.country}
              count={destination.recommendationCount}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Destinations;