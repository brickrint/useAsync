import { useReducer, useCallback } from 'react';

const asyncReducer = (state, action) => {
  switch (action.type) {
    case 'pending':
      return {
        ...state,
        status: 'pending',
        data: null,
        error: null,
      };
    case 'resolved':
      return {
        ...state,
        status: 'resolved',
        data: action.data,
        error: null,
      };
    case 'reject':
      return {
        ...state,
        status: 'rejected',
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
};

export const useAsync = (initialState = {}) => {
  const [state, dispatch] = useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  });

  // The "run" function takes promise and
  // handles setting state for pending, data, and error.
  const run = useCallback((promise) => {
    dispatch({ type: 'pending' });

    return promise
      .then((data) => {
        dispatch({ type: 'resolved', data });
        return data;
      })
      .catch((error) => {
        dispatch({ type: 'reject', error });
        throw error;
      });
  }, []);

  return { ...state, run } as const;
};
