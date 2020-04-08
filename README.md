# Unit 7 Problem Set #4
## Full Stack To-Do w/ Authentication

## Project Overview
The purpose of this Problem Set is to merge your work from Problem Set 7.1 and Problem Set 7.3. You will rebuild your MVC To-Do list from 7.1 using the RESTful API that you created in 7.3. Instead of sending rendered templates in response to an incoming request, you will make AJAX requests to your backend, handle JSON responses, and render to-do's to the DOM.

### Project Requirements
* Your To-Do list app must handle multiple users.
* Users must register with a username and a password.
* Users should be able to login with a username and password.
* Each user has their own To-Do List, to which they can create, update, view, and delete To-Do's.
* User must be able to logout and be redirected back to the login screen.
  
## Submission Directions
1. Fork, clone, and create your project in this repo.
2. Update this README so that instead of project directions, it houses the documentation for your project. It can be very simple. [Here's an example](https://github.com/emtes/assignment-todo-list) from Enmanuel!
3. Deploy to Heroku and be sure to include the project URL in your README.

### Due Date
Tuesday, April 7 at 9AM

```sql
CREATE TABLE tasks(
id SERIAL PRIMARY KEY,
user_id int REFERENCES users(id),
task_name text ,
task_description text ,
due_date date ,
is_complete boolean DEFAULT false NOT NULL
) ;
```


```sql
CREATE TABLE users(
id SERIAL PRIMARY KEY,
email text ,
password text
);
```

```
SELECT users.username , tasks.task_name, tasks.task_description , tasks.due_date , tasks.is_complete  
FROM users JOIN tasks 
ON users.id = tasks.user_id 
;
```


**Documentation  still needed**


