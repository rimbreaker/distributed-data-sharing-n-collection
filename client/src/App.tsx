import React, { useEffect, useReducer, useState } from 'react';
import Gun from 'gun';
import './App.css';

const gun = Gun({
  peers: [
    'http://localhost:3030/gun', 'http://localhost:3000'
  ],
  // localStorage: false
})

const initialState = {
  messages: []
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'ADD':
      return {
        messages: [action.payload, ...state.messages].filter((m, i, arr) => i === arr.map(m => m.id).indexOf(m.id))
      }
    case 'REMOVE':
      return {
        messages: [...state.messages].filter(m => m.id !== action.payload)
      }
    default:
      return {
        messages: [...state.messages]
      }
  }

}

function App() {
  const [formState, setForm] = useState({
    name: '', message: ''
  })

  const [state, dispatch] = useReducer(reducer, initialState)
  const [messagesInterface, setMessagesInterface] = useState<any>(null)

  useEffect(() => {
    const messages = gun.get('messages')
    messages.map().on((m, id) => {
      if (m) {
        if (!state.messages.find(mes => mes.id === id))
          dispatch({
            type: 'ADD',
            payload: {
              id: id,
              name: m.name,
              message: m.message,
              createdAt: m.createdAt
            }
          })
      }
      else {
        dispatch({ type: 'REMOVE', payload: id })
      }

    })

    setMessagesInterface(messages)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  function saveMessage() {
    messagesInterface.set({
      name: formState.name,
      message: formState.message,
      createdAt: Date.now()
    })
    setForm({
      name: '', message: ''
    })
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...formState, [e.target.name]: e.target.value })
  }

  function deleteMessage(id: string) {

    messagesInterface.get(id).put(null)
    window.location.reload()
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ padding: 30 }}>
          <input
            onChange={onChange}
            placeholder="Name"
            name="name"
            value={formState.name}
          />
          <input
            onChange={onChange}
            placeholder="Message"
            name="message"
            value={formState.message}
          />
          <button onClick={saveMessage}>Send Message</button>
          {
            state.messages.map(message => (
              <div key={message.createdAt}>
                <h2>{message.message}</h2>
                <h3>From: {message.name}</h3>
                <p>Date: {new Date(message.createdAt).toString()}</p>
                <button onClick={() => deleteMessage(message.id)}>delete message</button>
              </div>
            ))
          }
        </div>
      </header>
    </div>
  );
}

export default App;
