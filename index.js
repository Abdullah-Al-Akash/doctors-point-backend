const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.xizqg.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
        try {
                await client.connect();
                const servicesCollection = client.db("doctors-point").collection("services");

                app.get('/services', async (req, res) => {
                        const query = {};
                        const cursor = servicesCollection.find(query);
                        const services = await cursor.toArray();
                        res.send(services)
                })
        }
        finally {

        }
}
run().catch(console.dir);

app.get('/', (req, res) => {
        res.send('Hello Doctors Point!')
})

app.listen(port, () => {
        console.log(`Doctors point app listening on port ${port}`)
})