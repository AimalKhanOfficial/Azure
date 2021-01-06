let app = require('express')();

let customPort = 4300;

app.get('/', (req, res) => {
    res.json("Get called");
});

app.post('/', (req, res) => {
    res.json("Post called");
});

app.listen(customPort, () => console.log(`App started listenig at port: ${customPort}`))

