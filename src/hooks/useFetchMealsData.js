import { useState, useEffect } from 'react';
import {
  fetchFoodsData,
  fetchFoodsCategories,
} from '../services/fetchHandlers';

export default function useFetchMealsData() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [categoriesError, setCategoriesError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchFilters, setSearchFilters] = useState({ filter: '', value: '' });
  const [categoriesFilter, setCategoriesFilter] = useState('All');

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
    searchFilters,
    setSearchFilters,
    categoriesFilter,
    setCategoriesFilter,
  };
}
