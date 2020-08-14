import React from 'react';
import '../css/App.css';

import AddAppointments from './AddAppointments.js';
import SearchAppointments from './SearchAppointments.js';
import ListAppointments from './ListAppointments.js';

function App() {
  return (
    <div id="petratings">
      <AddAppointments />
      <SearchAppointments />
      <ListAppointments />
    </div>
  );
}

export default App;
