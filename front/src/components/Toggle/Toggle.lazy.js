import React, { lazy, Suspense } from 'react';

const LazyToggle = lazy(() => import('./Toggle'));

const Toggle = props => (
  <Suspense fallback={null}>
    <LazyToggle {...props} />
  </Suspense>
);

export default Toggle;
