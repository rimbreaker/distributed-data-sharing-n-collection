import React from 'react';
import { Admin, Resource } from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import AllList from './components/AllList'
//import MessageList from './components/MessageList'
//import MessageCreate from './components/MessageCreate'
//import MessageEdit from './components/MessageEdit'

function App() {
  return (
    <Admin dataProvider={restProvider('http://localhost:3030/api')} >
      <Resource name='all' list={AllList} />
      {/* <Resource name='message' list={MessageList} create={MessageCreate} edit={MessageEdit} /> */}
    </Admin>
  );
}

export default App;
