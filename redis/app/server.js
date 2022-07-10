const { promisify } = require('util');
const express = require('express');
const redis = require('redis');
const client = redis.createClient(); //{url: 'redis://localhost:6379'}

const rIncr = promisify(client.incr).bind(client);
const rGet = promisify(client.get).bind(client);
const rSetex = promisify(client.setEx).bind(client);

function cache(key, ttl, slowFn) {
    return async function cachedFn(...props) {
        const cachedResponse = await rGet(key);
        if (cachedResponse) {
            return cachedResponse;
        }

        const result = await slowFn(...props);
        await rSetex(key, ttl, result);
        return result;
    }
}

async function verySlowAndExpensivePostgreSQLQuery() {
    // here you would do a big ugly query for PostgreSQl

    console.log('oh no a very expensive query');

    const promise = new Promise(resolve => {
        setTimeout(() => {
            resolve(new Date().toUTCString());
        }, 5000);
    });

    return promise;
}

const cachedFn = cache('expensive_call', 10, verySlowAndExpensivePostgreSQLQuery);


async function init() {
    const app = express();
    app.get('/pageview', async (req, res) => {
        const views = await rIncr('pageviews');
        res.json({
            status: 'ok', 
            views
        }).end();
    });

    app.get('/get', async (req, res) => {
        const data = await cachedFn();
        res.json({
            status: 'ok',
            data
        }).end();
    });

    const PORT = 3000;
    app.use(express.static('./static'));
    app.listen(PORT);
    console.log(`Listening on http://localhost:${PORT}`);
}

init();