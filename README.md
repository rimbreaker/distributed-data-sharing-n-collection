# Distributed system for data sharing and collection

## Run Locally

Clone the project

```bash
  git clone https://github.com/rimbreaker/distributed-data-sharing-n-collection.git
```

setup local IPFS node, like https://github.com/ipfs-shipyard/ipfs-desktop/releases/download/v0.17.0/IPFS-Desktop-Setup-0.17.0.exe

Node.js is required for this application to be used

Install `yarn` if you haven't already

```bash
  npm i -g yarn
```

install packages localy for client, server and dashboard

```bash
  cd client
  yarn
  yarn start
```

```bash
  cd dashboard
  yarn
  yarn start
```

```bash
  cd server
  yarn
  yarn dev
```

## Main Features

- comunication between peers with WebRTC protocol
- persisting peer shared data in IPFS database
- viewing the data in simple dashboard commnicating with API

## Running Tests

The projec has no automated test for now, but for easier manual testing you can use setup of swagger documentation of API at localhost:3030/swagger, web ui of your local IPFS node and console in which one is running the server, as all data hashes are logged there

## Documentation

### Technical intro

Application is writen entirely in Typescript. Backend is composed of simple GunJS setup server, IPFS database interface and minimal Rest API for dashboard. Client application uses real time WebRTC protocol GunJS database which updates state of each peer in real time. The third app is simple dashboard for viewing all the data persisted from server to document OrbitDB database. Both client applications use React library
