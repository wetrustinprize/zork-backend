# Todo List

Simple todo list for the Zork backend, so I can keep track of what I've made and what I need to make.

- [Todo List](#todo-list)
  - [Request](#request)
  - [Users](#users)
  - [Authentication](#authentication)
  - [Transactions](#transactions)

---

## Request

- [ ] GET: Get all authenticated user received requests

  - `/request`

- [ ] GET: Get all authenticated user sent request to another user

  - `/request/:email`

- [ ] POST: Accept a request

  - [ ] Accept a request
  - [ ] Create new transaction for that request
  - [ ] Close the request

- [ ] POST: Deny a request

  - [ ] Mark a request as canceled

- [ ] POST: Redo the request
  - [ ] Change the value from the request

---

- [ ] Make request be able to call a webhook from the backend

## Users

- [x] GET: authenticated user
- [x] GET: specific user by id
- [ ] GET: specific user by e-mail
- [x] POST: New user

## Authentication

- [x] POST: Login

## Transactions

- [x] POST: New transaction
- [x] GET: Transaction by id
