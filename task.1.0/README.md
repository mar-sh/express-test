
### Run

```
node index.js
```

### Endpoints

|No|Route|HTTP Method|Request|Response(success)|Response(fail)|Description|
|---|---|---|---|---|---|---|
1|/users| GET|```query: { page: number, limit: number, sortAttribute: string 'email', 'name', sortMethod: string 'ASC, 'DESC'}``` | ``` status(200), { hasNext: boolean ,results:[{email, name, password}, ...] ``` | ```{status(500), code:500, message: Server error} ``` | Get all users|
2|/users/:id|GET|```params: { id: number } ```| ``` status(200),  { email, name, password }```| ```{status(404) code: 404, message: Could not find user with that id }, {status(500), code:500, message: Server error} ```| Get a(n) user by id
3|/users|POST|``` body:{ email: string, name: string, password: string} ```|```status(201), { email, name } ```| ```{status(400), code: 400, message: [ ValidationErrors: email, name, password ]}, status(500), code: 500, message: Server error ```|Create a new user
4|/users/csv|POST|``` ```|```status(201), results: [{email, name, password}, ...] ```|```{status(500), message: Server error} ```| Bulk upload with .csv
5|/users/:id|PUT|```body: {email: string, name: string}```| `status(200), {email, name}`|```{status(404), code: 404, message: Could not find user with that id }, {status(400), code: 400, message: [ ValidationErrors: email, name ]}, {status(500), code: 500, message: Server error} ```| Edit user email and name
6|/users/:id/changepassword|PATCH|```body{password: string} ```|```status(200) {message: Password is successfully changed}```|```{status(404), code: 404, message: Could not find user with that id }, {status(500), code: 500, message: Server error```|Edit user password
7|/users/:id|DELETE|```params: { id: number } ```|```status(200), id ```|```{status(404), code: 404, message: Could not find user with that id}, {status(500),  code: 500, message: Server error} ```| Soft delete a(n) user
8|/users/sort/divide|GET|```body: {sortAttribute: string 'email', 'name', sortMethod: string 'asc', 'desc'} ```|```status(200), results: [{users object}...] ```|```status(500), code: 500, message: Server error```|users data sorted (bubble sort)
9|/users/sort/divide|GET|```body: {sortAttribute: string 'email', 'name', sortMethod: string 'asc', 'desc'} ```|```status(200), results: [{users object}...] ```|```status(500), code: 500, message: Server error```|users data sorted (quick sort)