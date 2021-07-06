import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';


export default () => {
  return (
    <div>
      <h1>Group podcast app homepage</h1>
      <Link to="/groupcreate">Create a new group</Link>
      <br/>
      <br/>
      Currently just a placeholder
    </div>
  );
};
