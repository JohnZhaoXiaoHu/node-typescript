node-typescript

GET - /users - select 10 users
GET - /users?limit=5 - select 5 users
GET - /users/3 - select user with id 3
GET - /users/3/name - select username with id 3

POST - /redis - body: { key: number, value: 44 } - set value 44 for key number
GET - /redis?key=number - select value for key 'number'

POST - /token - body: { login: , password: } - get token

GET - /checkToken - get decoded data (user login) from token

/socketio.html - socket io html file
