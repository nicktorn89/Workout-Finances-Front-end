import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Circle } from 'react-preloaders';

const Main = lazy(() => import('./modules/Main'));

function routes() {
  return (
    <Router>
      <Suspense fallback={<Circle />}>
        <Route exact={true} path='/' component={Main} />
      </Suspense>
    </Router>
  );
}

export default routes;
