import React, { lazy, Suspense } from 'react';

const LazyCard = lazy(() => import('./Card'));

const Card = props => (
  <Suspense fallback={null}>
    <LazyCard {...props} />
  </Suspense>
);

export default Card;
