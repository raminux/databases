# How to run

1. Run the mongodb docker as
```bash
$> docker run --name test-mongo -dit -p 27017:27017 --rm mongo
$> docker exec -it test-mongo mongo
```

2. Inside mongodb console, run
```bash
> use adoption;
> db.pets.insertMany(
    Array.from({ length:10000}).map(
        (_, index) => ({
            name: ["Luna", "Fido", "Fluffy", "Carina", "Spot", "Beethoven", "Baxter", "Dug", "Zero", "Santa's Little Helper", "Snoopy"][index % 9],
            type: ["dog", "cat", "bird", "reptile"][index % 4],
            age: (index % 18) + 1,
            breed: ["Havanses", "Bichon Fries", "Beagle", "Cockatoo", "African Gray", "Tabby", "Iguana"][index % 7], 
            index: index
        })
    )
)
```

3. Create index for search:
```bash
> db.pets.createIndex({ type: 'text', breed: 'text', name: 'text'})
> 
```