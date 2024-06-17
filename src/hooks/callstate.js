import { useState } from 'react';

export const LoadingState = {
  INIT: 'init',
  LOADING: 'loading',
  LOADED: 'loaded',
};

export function useCallState(initialState = LoadingState.INIT) {
  const [callState, setCallState] = useState(initialState);

  return {
    isLoading: callState === LoadingState.LOADING,
    isLoaded: callState !== LoadingState.LOADING,
    errorState: callState.error || null,
    setLoadingState: (state) => setCallState(state),
    setErrorState: (error) =>
      setCallState(
        { error } ?? 'Error processing request. Please try again later.',
      ),
  };
}
