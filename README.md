socket-camera-server
========
This simple project allow you to see snapshots from ip camera(s) on simple website, without any connection and network settings, thanks to Node.js and [socket.io library](https://socket.io/).

This repository is a server modul, should be install on server with public ip with open access to port (eg. 3000) and Node.js installed.

## Installation
```bash
$ git clone https://github.com/miwaniec/socket-camera-server.git
$ cd socket-camera-server
$ npm install
```

## Running
```bash
$ npm start
```

That's all! Your server should be available with address like this:
```
http://<IP_ADDRESS_OF_YOUR_SERVER>:3000
```

Check the [camera module](https://github.com/miwaniec/socket-camera) and [website client example](https://github.com/miwaniec/socket-camera-client).
