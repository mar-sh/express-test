Configure ./config/config.js to match .env.example

#### Create db
```
sequelize db:create
```

#### Seed
```
sequelize db:seed:all
```

#### Run
```
node server.js
```

### Endpoints

|No|Route|HTTP Method|Request|Response(success)|Response(fail)|Description|
|---|---|---|---|---|---|---|
1|/users| GET|```query: { page: number, limit: number, sortAttribute: string 'id', 'email', 'name', 'createdAt', 'updatedAt', sortMethod: string 'ASC, 'DESC'}``` | ``` status(200), users: [{id ,email, name, password, createdAt, updatedAt}, ...] ``` | ```{status(500), message: Internal server error} ``` | Get all users|
2|/users/:id|GET|```params: { id: number } ```| ``` status(200), user: {id, email, name, password, createdAt, updatedAt}```| ```{status(404) message: Could not find user with that id }, {status(500) message: Internal server error} ```| Get a(n) user by id
3|/users|POST|``` body:{ email: string, name: string, password: string} ```|```status(201), { email, name } ```| ```{status(400), message: [ ValidationErrors: email, name, password ]}, status(500) message: Internal server error ```|Create a new user
4|/users/:id|PUT|```body:{email: string, name: string} ```|```status(200), {email, name, message: updated} ```|```{status(400), message: [ValidationErrors: email, name]}, {status(500), message: Internal server error} ```| Edit user email and name
5|/users/:id|PATCH|```body: {password: string, oldPassword: string}```| `status(200), message: 'updated'`|```{status(404), message: Could not find user with that id }, {status(400), message: Incorrect (old) password}, {status(500), message: Internal server error} ```| Edit user password
6|/users/:id|DELETE|```params: { id: number } ```|```status(200), id ```|```{status(404), message: Could not find user with that id}, {status(500), message: Internal server error} ```| Hard delete a(n) user