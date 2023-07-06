import { api } from '@/services/api';
import { useMealStore } from '@/store/meals';
import { isTypeError } from '@/functions';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';

const useMealByCategory = () => {
  const { mealCategory } = useParams();
  const {
    actions: { initialState, setLoading, fail, success }
  } = useMealStore();
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const controller = new AbortController();

    const fetch = async () => {
      initialState();
      setLoading();
      try {
        const response = await api.get(`/filter.php?c=${mealCategory}`, {
          signal: controller.signal
        });
        const mealsData = response.data.meals;
        if (!mealsData) return fail();
        return success(mealsData);
      } catch (error) {
        if (isTypeError(error)) return;
        showBoundary(error);
      }
    };

    fetch();

    return () => {
      controller.abort();
    };
  }, [mealCategory, initialState, setLoading, fail, success, showBoundary]);

  return {
    mealCategory
  };
};

export { useMealByCategory };
