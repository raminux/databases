# How to run

1. First run the redis docker container
```bash
$> docker run -dit --rm --name=my-redis -p 6379:6379 redis
$> docker exec -it my-redis redis-cli
```

2. Some redis stuffs
```bash
127.0.0.1:6379> SET name "Ramin Esmzad"
127.0.0.1:6379> GET name
```

3. Using namespaces
```bash
127.0.0.1:6379> SET user:ramin:city Michigan
127.0.0.1:6379> SET user:bahar:city EastLansing
127.0.0.1:6379> SET user:baran:city Preschool
```

4. Mathematics
```bash
127.0.0.1:6379> SET visits 0
127.0.0.1:6379> INCR visits (visits += 1)
127.0.0.1:6379> DECT visits (visits -= 1)
127.0.0.1:6379> INCRBY visits 6 (visits += 6)
127.0.0.1:6379> DECRBY visits 3 (visits -= 3)
127.0.0.1:6379> MSET x 10 y 20
127.0.0.1:6379> MGET x y
127.0.0.1:6379> EXISTS visits (if the key exists, return 1, otherwise return 0)
127.0.0.1:6379> DEL visits 
```

5. Redis command options
```bash
127.0.0.1:6379> SET num 5 XX
127.0.0.1:6379> SET num 4 NX
```

6. Redis arrays
```bash
127.0.0.1:6379> RPUSH notifications:ramin "Collabshare stuffs" "Call my parents" "50 Push ups"
127.0.0.1:6379> LRANGE notifications:ramin 0 -1
127.0.0.1:6379> RPOP notifications:ramin
127.0.0.1:6379> LPOP notifications:ramin
127.0.0.1:6379> HMSET ramin:profile title "CEO" company "Collabshare" city "Earth" country "Galaxy" 
127.0.0.1:6379> HGET ramin:profile city
127.0.0.1:6379> HGETALL ramin:profile
127.0.0.1:6379> SADD colors red yellow black green blue pink brown
127.0.0.1:6379> SISMEMBER colors black
127.0.0.1:6379> SMEMBERS colors
127.0.0.1:6379> SPOP colors

```