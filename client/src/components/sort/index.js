import React, { memo } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import './Sort.css';
import useUrlQueryString from '../../hooks/useUrlQueryString';

const Sort = ({ isClient, sort, setSort }) => {

  const { currSortParam, currOrderParam, currRatingParam, setParams, deleteParams } = useUrlQueryString();

  const onSelectChange = (e) => {
    setSort(prev => {
      return {
        ...prev,
        sort: e.target.value,
      }
    });
    setParams({
      sort: e.target.value,
      order: currOrderParam,
    });
  }

  const onOrderBtnChange = () => {
    if(sort.order === "asc") {
      setSort((prev) => {
        return {
          ...prev,
          order: "desc"
        }
      });
      setParams({
        order: "desc"
      });
    } else {
      setSort((prev) => {
        return {
          ...prev,
          order: "asc"
        }
      });
      setParams({
        order: "asc"
      });
    }
  }
  
  return (
    <div className={isClient ? 'sort-container-client' : 'sort-container'}>
      <p className='sort-by'>Sort By:</p>
      <select
        className='sort-select'
        defaultValue={sort.sort}
        onChange={onSelectChange}
      >
        <option value="stars">Stars</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
        <option value="popularity">Popularity</option>
      </select>
      <button onClick={onOrderBtnChange} className='sort-btn-arrow'>
        {sort.order === "asc" && <ArrowUpwardIcon/>}
        {sort.order === "desc" && <ArrowDownwardIcon/>}
      </button>
    </div>
  )
}

export default memo(Sort);