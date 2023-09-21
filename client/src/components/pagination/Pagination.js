import { memo } from 'react';
import './Pagination.css';

const Pagination = ({ totalPages, page, setPage }) => {
  
  return (
    <div className='pagination-section'>  
      {totalPages > 0 && [...Array(totalPages)].map((val, index) => (
        <button key={index} onClick={(e) => setPage(index + 1)} className={index + 1 === page ? 'curr_page-button' : 'pagination-button'}>
          {index + 1}
        </button>
      ))}
    </div>
  )
}
// using memo to cause React to skip rendering Pagination component if it's props have not changed
export default memo(Pagination);