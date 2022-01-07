import React, { useEffect, useReducer, useRef, useState } from 'react';
import Gun from 'gun';
import './App.css';
import { HexColorPicker } from 'react-colorful';
import namer from 'color-namer'

const gun = Gun({
  peers: [
    'http://localhost:3030/gun'
  ], localStorage: false
})

const initialState = {
  messages: []
}

function messageReducer(state: any, action: any) {
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

function colorReducer(_state: string, color: string) {
  return color
}

function App() {
  const backGroundRef = useRef<HTMLElement | null>(null)
  const [formState, setForm] = useState({
    name: '', message: ''
  })

  const [messageState, dispatch] = useReducer(messageReducer, initialState)
  const [colorState, dispatchColor] = useReducer(colorReducer, "#aabbcc")

  const [messagesInterface, setMessagesInterface] = useState<any>(null)
  const [color, setColor] = useState("#aabbcc")

  const colorName = namer(color).pantone[0].name


  useEffect(() => {
    const messages = gun.get('messages')

    gun.get('color').on(col => {
      dispatchColor(col.sync)
    }, { change: true })

    messages.map().on((m, id) => {
      if (m) {
        if (!messageState.messages.find(mes => mes.id === id))
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

    }, { change: true })
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

  const changeBackgroundColor = (col: string) => {
    if (backGroundRef.current)
      backGroundRef.current.style.backgroundColor = col
  }

  useEffect(() => {
    if (backGroundRef.current)
      backGroundRef.current.style.backgroundColor = colorState
    setColor(colorState)

  }, [colorState])

  return (
    <div className="App">
      <header className="App-header" ref={backGroundRef}>
        <div style={{ padding: 30 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-evenly'
          }}>
            <HexColorPicker color={color} onChange={(col) => {
              setColor(col);
              changeBackgroundColor(col)
            }} onMouseUp={() => gun.get('color').put({ sync: color })} />
          </div>
          <p>
            {colorName}
          </p>
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
            messageState.messages.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1).map(message => (
              <div key={message.createdAt} style={{
                height: '20vh',
                borderRadius: "0.3rem",
                borderBottom: "0.1em white solid"
              }}>
                <div style={{
                  display: 'flex',
                  width: '50vw',
                  height: '5vh',
                  justifyContent: 'space-between'
                }}>
                  <h6>From: {message.name}</h6>
                  <h6>Sent: {new Date(message.createdAt).toString().split(" ").slice(0, 5).join(" ")}</h6>
                </div>
                <h3>{message.message}</h3>
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
