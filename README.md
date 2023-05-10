To run the project:

1. cd server
2. npm i
3. touch .env
4. code .env

5. Add the following environment variables to the `.env` file, replacing `<username>`, `<password>`, and `<port>` with your own values:

MONGO_USERNAME=`<username>`
MONGO_PASSWORD=`<password>`
SERVER_PORT=`<port>`

6. rm -rf build/ && ts
7. node build/server.js

8. cd client
9. npm i
10. npm start

This will start the server and client applications concurrently, allowing you to interact with the project.

Note: Make sure you have MongoDB installed and running on your machine before starting the server.
