# How to run

1. Create a docker container for Neo4j and run it:
```bash
$> docker run -dit --rm --name=my-neo4j -p 7474:7474 -p 7687:7687 --env=NEO4J_AUTH=none neo4j
$> docker exec -it my-neo4j cypher-shell
```

> **Cypher** is the query language for Neo4j.

2. Playing around wiht some queries
```bash 
@neo4j> CREATE (p:Person {name: "Michael Cera", born: 1988});
@neo4j> MATCH (p {name: "Michael Cera" }) RETURN p;
@neo4j> MATCH (p:Person) RETURN p; // return every person
@neo4j> MATCH (p) RETURN p; // as above
@neo4j> CREATE (m:Movie {title: "Scott Pilgrim vs the World", released: 2010, tagline: "An epic of epic epicness."}) RETURN m;
@neo4j> MATCH (Michael:Person), (ScottVsWorld:Movie) 
        WHERE Michael.name="Michael Cera" AND ScottVsWorld.title="Scott Pilgrim vs the World"
        CREATE (Michael)-[relationship:ACTED_IN {roles: ["Sclott Pilgrim"]}]->(ScottVsWorld)
        RETURN relationship;
@neo4j> MATCH (ScottVsWorld:Movie) WHERE ScottVsWorld.title = "Scott Pilgrim vs the World"
CREATE (Anna:Person {name:'Anna Kendrick', born:1985})
CREATE (Brie:Person {name:'Brie Larson', born:1989})
CREATE (Aubrey:Person {name:'Aubrey Plaza', born:1984})
CREATE (Mary:Person {name:'Mary Elizabeth Winstead', born:1984})
CREATE (Kieran:Person {name:'Kieran Culkin', born:1982})
CREATE (Chris:Person {name:'Chris Evans', born:1981})
CREATE (Edgar:Person {name:'Edgar Wright', born:1974})
CREATE
(Anna)-[:ACTED_IN {roles:['Stacey Pilgrim']}]->(ScottVsWorld),
(Brie)-[:ACTED_IN {roles:['Envy Adams']}]->(ScottVsWorld),
(Aubrey)-[:ACTED_IN {roles:['Julie Powers']}]->(ScottVsWorld),
(Mary)-[:ACTED_IN {roles:['Ramona Flowers']}]->(ScottVsWorld),
(Kieran)-[:ACTED_IN {roles:['Wallace Wells']}]->(ScottVsWorld),
(Chris)-[:ACTED_IN {roles:['Lucas Lee']}]->(ScottVsWorld),
(Edgar)-[:DIRECTED]->(ScottVsWorld);

```

3. Querying for edges or relationships
```bash
@neo4j> MATCH (p:Person)-[r:ACTED_IN]->(m:Movie) RETURN r;
```

4. Find a specific person that acted in the movie:
```bash
@neo4j> MATCH (p:Person)-[r:ACTED_IN]->(m:Movie) WHERE p.name="Aubrey Plaza" RETURN p;
```

5. Find all people who played with a specific person in all movies
```bash
@neo4j> MATCH (p:Person)-[rp:ACTED_IN]->(m:Movie)<-[rq:ACTED_IN]-(q:Person)
        WHERE p.name="Aubrey Plaza" AND q.name <> "Aubrey Plaza" RETURN q.name;
```

6. How to create Uniqueness constraint on Movie titles:
```bash
@neo4j> CREATE CONSTRAINT on (m:Movie) ASSERT m.title IS UNIQUE
```

7. How to run neo4j browser:
go to this address: *http://localhost:7474/
