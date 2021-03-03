import React, { lazy, Suspense } from 'react';

const LazyDecklist = lazy(() => import('./Decklist'));

const Decklist = props => (
  <Suspense fallback={null}>
    <LazyDecklist {...props} />
  </Suspense>
);

export default Decklist;
