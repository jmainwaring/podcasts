import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import GroupCreate from './GroupCreate';

export default () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/groupcreate" exact component={GroupCreate} />
        </div>
      </BrowserRouter>
    </div>
  );
};
