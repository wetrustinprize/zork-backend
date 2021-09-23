<h1 align="center">Ƶork Frontend</h1>
<h4 align="center">made with: Express</h4>

- [What is Zork?](#what-is-zork)
- [How to run](#how-to-run)
- [API](#api)
  - [User](#user)
    - [Model](#model)
    - [Create a new user](#create-a-new-user)
    - [Authenticate](#authenticate)
    - [Show all users](#show-all-users)
  - [Transaction](#transaction)
    - [Model](#model-1)
  - [Request](#request)
    - [Model](#model-2)
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

# API

## User

### Model

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

### Create a new user

Creates a new user in the database.

Endpoint

```bash
POST /user
```

Body

```json
{
  "fullname": "Hello world",
  "email": "hello@example.com",
  "password": "123"
}
```

### Authenticate

Authenticated the user and gets a new access token.

Endpoint

```bash
POST /login
```

Body

```json
{
  "email": "hello@example.com",
  "password": "123"
}
```

Returns

```json
{
  "access_token": "jwt"
}
```

### Show all users

Show all the users that are registered in the database.

- **Requires authentication**

Endpoint

```bash
GET /users
```

## Transaction

### Model

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

## Request

### Model

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

TODO

# Credits

| who                                               | what                   |
| ------------------------------------------------- | ---------------------- |
| Peterson Adami Candido                            | Coding                 |
| [Gustavo Fernandes](https://github.com/nGustavin) | Helping _(thanks bro)_ |
