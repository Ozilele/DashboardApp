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

  let currFeaturesParam = [];
  const featuresParam = searchParams.get("features");
  if(featuresParam) {
    const features = featuresParam.split(","); // [closeToSee,closeToMountains,hasParking]
    if(features.length > 0) {
      currFeaturesParam = features;
    }
  }
  
  const setParams = (paramName, paramValue) => {
    if(searchParams.has(paramName)) {
      const currParamValue = searchParams.get(paramName);
      const newParamValue = `${currParamValue},${paramValue}`;
      searchParams.set(paramName, newParamValue);
      setSearchParams(searchParams);
    } else {
      searchParams.set(paramName, paramValue);
      setSearchParams(searchParams);
    }
  }

  const deleteParams = (paramName, paramValue = "") => {
    if(paramValue !== "") {
      const arrOfValues = searchParams.getAll(paramName)[0].split(',');
      const paramValueToRemove = paramValue;
      const newArrOfValues = arrOfValues.filter((val) => val !== paramValueToRemove);
      if(newArrOfValues.length === 0) {
        searchParams.delete(paramName);
      } else {
        searchParams.set(paramName, newArrOfValues.join(","));
      }
    } else {
      searchParams.delete(paramName);
    }
    setSearchParams(searchParams);
  }

  return {
    currSortParam,
    currOrderParam,
    currFeaturesParam,
    setParams,
    deleteParams
  }
}

export default useUrlQueryString;