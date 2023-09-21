import { useSearchParams } from 'react-router-dom';

const useUrlQueryString = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const sortOptions = ["stars", "price", "rating", "popularity"];
  let currSortParam = "stars";
  const sortParam = searchParams.get("sort")?.toLowerCase();
  if(sortParam && sortOptions.includes(sortParam)) {
    currSortParam = sortParam;
  }

  const orderOptions = ["desc", "asc"];
  let currOrderParam = "asc";
  const orderParam = searchParams.get("order")?.toLowerCase();
  if(orderParam && orderOptions.includes(orderParam)) {
    currOrderParam = orderParam;
  }

  let currRatingParam = null;
  const ratingParam = searchParams.get("rating")?.toLowerCase();
  if(ratingParam) {
    const rating = parseInt(ratingParam);
    if(!isNaN(rating) && rating >= 0 && rating <= 10) {
      currRatingParam = rating;
    }
  }
  
  const setParams = (paramObj) => {
    for(const [key, value] of Object.entries(paramObj)) {
      searchParams.set(key.toString(), value.toString());
    }
    setSearchParams(searchParams);
  }

  const deleteParams = (arrayOfKeys) => {
    arrayOfKeys.map((key, i) => {
      searchParams.delete(key.toString());
    });
    setSearchParams(searchParams);
  }

  return {
    currSortParam,
    currOrderParam,
    currRatingParam,
    setParams,
    deleteParams
  }
}

export default useUrlQueryString;