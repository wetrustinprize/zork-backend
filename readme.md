# Zork Backend

The backend server for Zork services.

- [Zork Backend](#zork-backend)
  - [What is Zork?](#what-is-zork)
  - [How to run](#how-to-run)
- [API](#api)
  - [User](#user)
    - [Model](#model)
    - [Create a new user](#create-a-new-user)
    - [Authenticate](#authenticate)
    - [Show all users](#show-all-users)
  - [Transaction](#transaction)
  - [Request](#request)

## What is Zork?

This is a simple project I made to learn how to develop backend using Node.js + Typescript.

Zork is a simple service to trade points with your friends, or ask points from them.

## How to run

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

TODO

## Request

TODO
