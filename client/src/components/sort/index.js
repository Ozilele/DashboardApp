import React, { memo } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useSearchParams } from 'react-router-dom';
import './Sort.css';

const Sort = ({ sort, setSort }) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const onSelectChange = (e) => {
    setSort({ sort: e.target.value, order: sort.order });
  }

  const onBtnChange = () => {
    if(sort.order === "asc") {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("sort", `${sort.sort},desc`);
        return params;
      });
      setSort({ sort: sort.sort, order: "desc" });
    } else {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("sort", `${sort.sort},asc`);
        return params;
      });
      setSort({ sort: sort.sort, order: "asc" });
    }
  }

  return (
    <div className='sort-container'>
      <p className='sort-by'>Sort By:</p>
      <select
        className='sort-select'
        defaultValue={sort.sort}
        onChange={onSelectChange}
      >
        <option value="stars">Stars</option>
        <option value="price">Price</option>
        <option value="stars">Rating</option>
      </select>
      <button onClick={onBtnChange} className='sort-btn-arrow'>
        {sort.order === "asc" && <ArrowUpwardIcon/>}
        {sort.order === "desc" && <ArrowDownwardIcon/>}
      </button>
    </div>
  )
}

export default memo(Sort);