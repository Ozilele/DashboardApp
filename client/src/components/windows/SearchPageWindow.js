import React from 'react';
import './SearchPageWindow.css';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { selectApp, deleteFilter, toggleModalWindow } from '../../features/appSlice';

const popularFilters = ["Beautiful views", "Restaurant", "Free Wifi", "Room service", "Air conditioning", "Balcony", "Gym access", "Boats", "Apartments", "Hotels"];

const SearchPageWindow = () => {

  const appState = useSelector(selectApp);
  const dispatch = useDispatch();

  return (
    <div className='search-Page-Filters-Window'>
      <button onClick={(e) => dispatch(toggleModalWindow())} >
        <CloseIcon/>
      </button>
      <div>
        {appState.appliedFilters.map((filter, i) => {
          return (
            <button key={i}>
              <span>{filter}</span>
              <CloseIcon onClick={(e) => {
                // deleteParams([ filter ]);
                dispatch(deleteFilter(filter));
                // setFeatures({
                //   ...features,
                //   [filter]: false
                // });
              }}/>
            </button>  
          )
        })}
      </div>
      <div className='client-popular-filters'>
        <h4>Popular filters</h4>
        {popularFilters.map((filter, i) => (
          <div key={i} className='client-popular-filter'>
            <label htmlFor="">{filter}</label>
            <input type="checkbox"/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchPageWindow;