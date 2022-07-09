# How to run
1. Run the postgresql docker
```bash
$> docker run --name my-postgres -e POSTGRES_PASSWORD=mypass -p 5432:5432 -d --rm postgres
$> docker exec -it -u postgres my-postgres psql 
```

2. In the postgres terminal, run
```bash
postgres> create database message_boards;
postgres> \c message_boards; (or \connect message_boards;)
postgres> \l (or \list)
postgres> \? (show all the available commands)
postgres> \d (list tables)
postgres> \h (show the list of all available queries)
message_boards-# CREATE TABLE users (
    user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (25) UNIQUE NOT NULL,
    email VARCHAR (50) UNIQUE NOT NULL,
    full_name VARCHAR (100) NOT NULL,
    last_login TIMESTAMP,
    created_on TIMESTAMP NOT NULL
);
```
3. Some useful queries
```bash
postgres> INSERT INTO users (username, email, full_name, created_on) VALUES('raes', 'raes@collabshare.com', 'Ramin Esmzad', NOW());
postgres> SELECT * FROM users; 
```

```bash
postgres> SELECT username, email, full_name, user_id FROM users WHERE last_login IS NULL AND created_on < NOW()-interval '6 months' LIMIT 10;
```

```bash
postgres> UPDATE users SET last_login=NOW() WHERE user_id=1 RETURNING *;
```

```bash
postgres> SELECT comment_id, comments.user_id, users.username, time, LEFT(comment, 20) as preview 
            FROM comments INNER JOIN users ON comments.user_id=users.user_id WHERE board_id=39;
```

## Group by
```bash
postgres> SELECT boards.borad_name COUNT(*) AS comment_count FROM comments NATURAL INNER JOIN boards GROUP BY boards.board_name ORDER BY comment_count DESC LIMIT 10;
```