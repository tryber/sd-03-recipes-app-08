import { useState, useEffect } from 'react';
import {
  fetchFoodsData,
  fetchFoodsCategories,
} from '../services/fetchHandlers';

export default function useFetchMealsData(searchFilters, categoriesFilter) {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [categoriesError, setCategoriesError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchFoodsCategories(setCategories, setLoading, setCategoriesError);
    fetchFoodsData(
      categoriesFilter,
      searchFilters,
      setData,
      setLoading,
      setError,
    );
    return () => {
      setLoading(false);
      setCategories([]);
      setData([]);
      setError('');
      setCategoriesError('');
    };
  }, [searchFilters, categoriesFilter]);

  return {
    data,
    categories,
    categoriesError,
    error,
    loading,
  };
}
