<h1 align="center">Ƶork Backend</h1>
<h4 align="center">made with: Express</h4>

- [What is Zork?](#what-is-zork)
- [How to run](#how-to-run)
- [User](#user)
  - [Create a new user](#create-a-new-user)
  - [Authenticate](#authenticate)
  - [Show all users](#show-all-users)
- [Transaction](#transaction)
  - [Show all transactions](#show-all-transactions)
  - [Shows transactions with a specific User](#shows-transactions-with-a-specific-user)
  - [Shows transactions related to authenticated User](#shows-transactions-related-to-authenticated-user)
  - [Show specific transaction by ID](#show-specific-transaction-by-id)
  - [Make transaction](#make-transaction)
- [Request](#request)
  - [List authenticated user requests](#list-authenticated-user-requests)
  - [Show specific request by ID](#show-specific-request-by-id)
  - [Interact with the request (accept/refuse)](#interact-with-the-request-acceptrefuse)
  - [Make request](#make-request)
- [Credits](#credits)

# What is Zork?

This is a simple project I made to learn how to develop backend using Node.js + Typescript.

Zork is a simple service to trade points with your friends, or ask points from them.

# How to run

First of all, you need to install packages using your favorite package manager, in my case: yarn.

```bash
yarn install
```

Then, you can start the server by typing: (_the server will listen on port 3001_)

```bash
yarn dev
```

# User

| Key        | Value  | Description                                            |
| ---------- | ------ | ------------------------------------------------------ |
| id         | uuid   | The user ID                                            |
| fullname   | string | The user full name                                     |
| first_name | string | The user first name, everything before the first space |
| last_name  | string | The user last name, everything after the first space   |
| password   | string | The user password. **Never shows**                     |
| email      | string | The user e-mail.                                       |
| created_at | date   | When this user was created                             |
| updated_at | date   | Last time this user was updated                        |
| zorks      | number | Only shows if is group is "self"                       |

## Create a new user

Creates a new user in the database.

**Endpoint**

```bash
POST /user
```

**Body**

```json
{
  "fullname": "Hello world",
  "email": "hello@example.com",
  "password": "123"
}
```

**Returns**

The [user](#user) created.

## Authenticate

Authenticated the user and gets a new access token.

**Endpoint**

```bash
POST /login
```

**Body**

```json
{
  "email": "hello@example.com",
  "password": "123"
}
```

**Returns**

The access token in json format.

```json
{
  "access_token": "jwt"
}
```

## Show all users

Show all the users that are registered in the database.

- **Requires authentication**

**Endpoint**

```bash
GET /users
```

**Returns**

A array with all the registered [users](#user).

---

# Transaction

| Key         | Value   | Description                                      |
| ----------- | ------- | ------------------------------------------------ |
| id          | uuid    | The transactions id                              |
| zorks       | number  | The total Zorks sent in this Transaction         |
| from_id     | uuid    | The ID of who sent the Zorks                     |
| from_user   | user    | The user object of who sent the Zorks            |
| to_id       | uuid    | The ID of who received the Zorks                 |
| to_user     | user    | The user object of who received the Zorks        |
| description | string  | The transactions description                     |
| public      | boolean | If true, will show to everyone when index or get |
| created_at  | date    | When this transaction was created                |

## Show all transactions

Show all the public transactions made.

- **Requires authentication**

**Endpoint**

```bash
GET /transactions
```

**Returns**

A array with all the transactions in json format.

## Shows transactions with a specific User

Show transactions related to the authenticated user and another user.

- **Requires authentication**

**Endpoint**

```bash
GET /transactions/with/:id
```

_replace :id with the [user](#user) id._

**Returns**

All [transactions](#transaction) related to the authenticated user.

## Shows transactions related to authenticated User

Show transactions related to the authenticated user.

- **Requires authentication**

**Endpoint**

```bash
GET /transactions/with/self
```

**Returns**

All [transactions](#transaction) related to the authenticated user.

## Show specific transaction by ID

Show transactions with the specified ID.

- **Requires authentication**

**Endpoint**

```bash
GET /transactions/:id
```

_replace :id with the uuid of the transaction_

**Returns**

The [transaction](#transaction) object.

## Make transaction

Make a transaction between the authenticated user and the specified user.

- **Requires authentication**

**Endpoint**

```bash
POST /transactions
```

**Body**

```bash
{
  "id": "d73ec13f-bf32-4bc6-985d-66d174273d5a",
  "value": 10,
  "description": "The transaction description."
}
```

**Returns**

The [transaction](#transaction) object.

---

# Request

| Key                 | Value       | Description                                                   |
| ------------------- | ----------- | ------------------------------------------------------------- |
| id                  | uuid        | The request ID                                                |
| zorks               | number      | The total Zorks requested                                     |
| descriptions        | string      | The description of the request                                |
| request_canceled    | boolean     | If true, this request has been canceled                       |
| request_result      | uuid        | The transaction ID created when this request was accepted     |
| request_transaction | transaction | The transaction object created when this request was accepted |
| from_id             | uuid        | The ID of who is the current owner of this request            |
| from_user           | user        | The user object of who is the current owner of this request   |
| to_id               | uuid        | The ID of who is being requested                              |
| to_user             | user        | The user object of who is being requested                     |
| created_at          | date        | The date of when this request was created                     |
| updated_at          | date        | When this request was updated                                 |

## List authenticated user requests

List all the requests related to the authenticated user

- **Requires authentication**

**Endpoint**

```bash
GET /requests
```

**Returns**

A list of [request](#request) objects.

## Show specific request by ID

Show a specific request.

- **Requires authentication**

**Endpoint**

```bash
GET /requests/:id
```

_replace :id with the uuid of the request_

**Returns**

The specified [request](#request).

## Interact with the request (accept/refuse)

Accepts or refuses a specified request.

- **Requires authentication**

**Endpoint**

```bash
POST /requests/:id
```

_replace :id with the uuid of the request_

**Body**

```json
{
  "method": "accept"
}
```

Method can be either `"accept"` or `"refuse"`.

**Returns**

The specified [request](#request) updated.

## Make request

Sends a new request to a specified user.

- **Requires authentication**

**Endpoint**

```bash
POST /requests/
```

**Body**

```json
{
  "email": "hello@example.com",
  "value": 10,
  "description": "Hello world"
}
```

**Returns**

The created [request](#request).

---

# Credits

| who                                               | what                   |
| ------------------------------------------------- | ---------------------- |
| Peterson Adami Candido                            | Coding                 |
| [Gustavo Fernandes](https://github.com/nGustavin) | Helping _(thanks bro)_ |
