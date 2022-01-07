import React from 'react';
import { Admin, Resource } from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import MessageList from './components/MessageList'
import ColorList from './components/ColorList'

function App() {
  return (
    <Admin dataProvider={restProvider('http://localhost:3030/api')} >
      <Resource name='message' list={MessageList} />
      <Resource name='color' list={ColorList} />
    </Admin>
  );
}

export default App;
