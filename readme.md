<h1 align="center">Ƶork Backend</h1>
<h4 align="center">made with: Express</h4>

- [What is Zork?](#what-is-zork)
- [How to run](#how-to-run)
- [User](#user)
  - [Model](#model)
  - [Create a new user](#create-a-new-user)
  - [Authenticate](#authenticate)
  - [Show all users](#show-all-users)
- [Transaction](#transaction)
  - [Model](#model-1)
  - [Show all transactions](#show-all-transactions)
  - [Show specific transaction by ID](#show-specific-transaction-by-id)
  - [Make transaction](#make-transaction)
- [Request](#request)
  - [Model](#model-2)
  - [List authenticated user requests](#list-authenticated-user-requests)
  - [Show specific request by ID](#show-specific-request-by-id)
  - [Accept request](#accept-request)
  - [Refuse request](#refuse-request)
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

Then, you can start the server by typing: (_the server will listen on port 3000_)

```bash
yarn dev
```

# User

## Model

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
  "fullname": "John Doe",
  "email": "john@doe.com",
  "password": "123"
}
```

**Returns**

The user created in json format.

```json
{
  "id": "816cde7e-d9c7-4efd-b456-36c456a67b24",
  "fullname": "John Doe",
  "email": "john@doe.com",
  "created_at": "2021-09-23T19:06:20.000Z",
  "updated_at": "2021-09-23T19:06:20.000Z",
  "first_name": "John",
  "last_name": "Doe"
}
```

## Authenticate

Authenticated the user and gets a new access token.

**Endpoint**

```bash
POST /login
```

**Body**

```json
{
  "email": "john@doe.com",
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

A array with all the registered users in json format.

---

# Transaction

## Model

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

## Show specific transaction by ID

Show transactions with the specified ID.

- **Requires authentication**

**Endpoint**

```bash
GET /transactions/:id
```

_replace :id with the uuid of the transaction_

**Returns**

The transaction object.

```json
{
  "id": "6355f6e2-7c55-4696-9262-a89aa945a6e8",
  "zorks": 10,
  "from_id": "795ae92a-38a0-499a-86c9-11016657f6d2",
  "to_id": "d73ec13f-bf32-4bc6-985d-66d174273d5a",
  "description": "The transaction description."
  "public": true,
  "created_at": "2021-07-09T23:19:14.000Z",
  "from_user": {
    "id": "795ae92a-38a0-499a-86c9-11016657f6d2",
    "fullname": "Zork Sender",
    "email": "johndoe@zork.com",
    "created_at": "2021-07-09T22:27:01.000Z",
    "updated_at": "2021-08-23T14:21:18.000Z",
    "first_name": "Zork",
    "last_name": "Sender"
  },
  "to_user": {
    "id": "d73ec13f-bf32-4bc6-985d-66d174273d5a",
    "fullname": "Zork Receiver",
    "email": "johndoe@zork.com",
    "created_at": "2021-07-09T22:27:18.000Z",
    "updated_at": "2021-07-09T23:19:14.000Z",
    "first_name": "Zork",
    "last_name": "Receiver"
  }
```

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
  "email": "johndoe@zork.com",
  "value": 10,
  "description": "The transaction description."
}
```

**Returns**

The transaction object.

```json
{
  "id": "6355f6e2-7c55-4696-9262-a89aa945a6e8",
  "zorks": 10,
  "from_id": "795ae92a-38a0-499a-86c9-11016657f6d2",
  "to_id": "d73ec13f-bf32-4bc6-985d-66d174273d5a",
  "description": "The transaction description."
  "public": true,
  "created_at": "2021-07-09T23:19:14.000Z",
  "from_user": {
    "id": "795ae92a-38a0-499a-86c9-11016657f6d2",
    "fullname": "Zork Sender",
    "email": "johndoe@zork.com",
    "created_at": "2021-07-09T22:27:01.000Z",
    "updated_at": "2021-08-23T14:21:18.000Z",
    "first_name": "Zork",
    "last_name": "Sender"
  },
  "to_user": {
    "id": "d73ec13f-bf32-4bc6-985d-66d174273d5a",
    "fullname": "Zork Receiver",
    "email": "johndoe@zork.com",
    "created_at": "2021-07-09T22:27:18.000Z",
    "updated_at": "2021-07-09T23:19:14.000Z",
    "first_name": "Zork",
    "last_name": "Receiver"
  }
```

---

# Request

## Model

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

## Show specific request by ID

## Accept request

## Refuse request

## Make request

---

# Credits

| who                                               | what                   |
| ------------------------------------------------- | ---------------------- |
| Peterson Adami Candido                            | Coding                 |
| [Gustavo Fernandes](https://github.com/nGustavin) | Helping _(thanks bro)_ |
