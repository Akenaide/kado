import React, { lazy, Suspense } from 'react';

const LazyPlayerConfig = lazy(() => import('./PlayerConfig'));

const PlayerConfig = props => (
  <Suspense fallback={null}>
    <LazyPlayerConfig {...props} />
  </Suspense>
);

export default PlayerConfig;
