import { useContext } from 'react';
import { OpportunitiesContext } from '../context/OpportunitiesContext.js';

export function useOpportunities() {
  const context = useContext(OpportunitiesContext);

  if (!context) {
    throw new Error('useOpportunities must be used inside OpportunitiesProvider.');
  }

  return context;
}
