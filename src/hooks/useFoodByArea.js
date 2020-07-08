import { useState, useEffect } from 'react';
import {
  fetchFoodByArea,
  fetchFoodsData,
  fetchAllFoodAreas,
} from '../services/fetchHandlers';

export default function useFoodByArea(foodAreaFilter, searchFilters) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [foodAreas, setFoodAreas] = useState([]);
  const [foodAreasError, setFoodAreasError] = useState('');
  const [loading, setLoading] = useState(false);

  const dataHandler = () => {
    if (searchFilters.value) {
      return fetchFoodsData(
        'All',
        searchFilters,
        setData,
        setLoading,
        setError,
      );
    }
    if (foodAreaFilter) {
      return fetchFoodByArea(foodAreaFilter, setData, setError, setLoading);
    }
    return fetchFoodsData('All', '', setData, setLoading, setError);
  };

  useEffect(() => {
    setLoading(true);
    dataHandler();
    fetchAllFoodAreas(setFoodAreas, setFoodAreasError, setLoading);
    return () => {
      setLoading(false);
      setData([]);
      setError('');
      setFoodAreas([]);
      setFoodAreasError('');
    };
  }, [searchFilters, foodAreaFilter]);

  return {
    data,
    error,
    foodAreas,
    foodAreasError,
    loading,
  };
}
