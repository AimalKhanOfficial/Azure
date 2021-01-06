const express = require('express');
const app = express();
const { connectToCosmosDb, saveToCosmosDb, retrieveEmployeeData } = require('./wrapper/comosDbClient');
app.use(express.json());
const customPort = 4300;

app.get('/', async (req, res) => {
    if (connectToCosmosDb()) { 
        console.log('Connected to CosmosDb');
        const cosmosDbRes = await retrieveEmployeeData(req.query.empName)
        return res.send(cosmosDbRes);
    }
    return res.json("Get called");
});

app.post('/', async (req, res) => {
    if (await connectToCosmosDb()) {
        console.log('>> Request Body', req.body);
        const { employeeId, name, address } = req.body;
        console.log('Connected to CosmosDb');
        const cosmosDbRes = await saveToCosmosDb(name, employeeId, address);
        if (cosmosDbRes) {
            return res.send(`Employee Record saved to CosmosDb. ${cosmosDbRes._id}`);
        }
        else {
            return res.send('Something went wrong, try again later.');
        }
    }
    return res.json("Post called");
});

app.listen(customPort, () => console.log(`App started listenig at port: ${customPort}`))

