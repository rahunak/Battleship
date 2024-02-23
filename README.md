# RSSchool NodeJS websocket task template
> Static http server and base task packages.
> By default WebSocket client tries to connect to the 3000 port.

If you have error that related to busy Port. You can kill the process that is occupying the port.
Use command line:
This algorithm works for Ubuntu, but for Windows it will be the same.
To see all ports and process use: **sudo lsof -i**
In the PID column you can find the Process ID, copy it, and then kill it.
use: **sudo kill -9 <PID>**

Initial template app was cloned from https://github.com/rolling-scopes-school/websockets-ui
Task assignment: https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/battleship/assignment.md

## Installation
1. Clone/download repo
2. `npm install`

## Usage
**Development**

`npm run start:dev`

* App served @ `http://localhost:8181` with nodemon

**Production**

`npm run start`

* App served @ `http://localhost:8181` without nodemon

---

**All commands**

Command | Description
--- | ---
`npm run start:dev` | App served @ `http://localhost:8181` with nodemon
`npm run start` | App served @ `http://localhost:8181` without nodemon

**Note**: replace `npm` with `yarn` in `package.json` if you use yarn.
