
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
Feel free to use the SQL statements to create quick tables 

C: Create tasks (taskName, task description,due date, is complete)

R: Display tasks (all inputted tasks)

U: Update tasks (Change task, extended description, due date or mark complete)
Note: You can only mark complete once

D: Delete tasks (Delete task for list of tasks)




Getting Started
This application is deployed [here](https://quiet-chamber-63376.herokuapp.com/login)

If you want to run it locally, clone this repository and run npm install. Then, run npm start or node app.js.


