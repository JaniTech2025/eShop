import { useEffect, useState, type SetStateAction } from 'react';

export default function useQuery({ fetchFn, args = [], dependencies = [] }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [fetchStatus, setFetchStatus] = useState('PENDING');

  useEffect(() => {
    setFetchStatus('LOADING');
    fetchFn(...args)
      .then((result: SetStateAction<null>) => {
        setFetchStatus('SUCCESS');
        setData(result);
      })
      .catch((err: SetStateAction<null>) => {
        setFetchStatus('FAILURE');
        setError(err);
      });
  }, dependencies);

  return {
    data,
    error,
    isSuccess: fetchStatus === 'SUCCESS',
    isFail: fetchStatus === 'FAILURE',
    isLoading: fetchStatus === 'LOADING',
  };
}