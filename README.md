# Full Stack To-Do w/ Authentication

Unit 7 Problem Set #4

## Project Requirements

- Your To-Do list app must handle multiple users.
- Users must register with a username and a password.
- Users should be able to login with a username and password.
- Each user has their own To-Do List, to which they can create, update, view, and delete To-Do's.
- User must be able to logout and be redirected back to the login screen.

## Getting Started

**This app is deployed [here]()**

- Clone
- Run 'npm start'
- Navigate 'localhost:3000'

### Tables

**Tasks**

```sql
CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    task_name character varying(64)
    NOT NULL CONSTRAINT no_empty_task_name CHECK(task_name != ''),
    task_description text,
    is_complete boolean DEFAULT FALSE,
    due_date DATE,
    user_id integer REFERENCES users,
    date_created timestamptz DEFAULT NOW()
);
```

**Users**

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name text NOT NULL,
    last_name text,
    email character varying(48) UNIQUE NOT NULL,
    password text NOT NULL
);
```
