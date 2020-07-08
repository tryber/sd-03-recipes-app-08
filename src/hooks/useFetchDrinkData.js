import { useState, useEffect } from 'react';
import {
  fetchDrinksData,
  fetchDrinksCategories,
} from '../services/fetchHandlers';

export default function useFetchDrinkData(searchFilters) {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [categoriesError, setCategoriesError] = useState('');
  const [loading, setLoading] = useState(false);
  const [categoriesFilter, setCategoriesFilter] = useState('All');

  useEffect(() => {
    setLoading(true);
    fetchDrinksCategories(setCategories, setLoading, setCategoriesError);
    fetchDrinksData(
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
    categoriesFilter,
    setCategoriesFilter,
  };
}
