import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';


export default () => {
  return (
    <div>
      <h1>Group podcast app</h1>
      <Link to="/groupcreate">Create a new group</Link>
      <br/>
      <Link to="/membershipchange">Add or remove someone from a group</Link>
    </div>
  );
};
