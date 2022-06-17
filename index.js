const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors')
var bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.t8ils.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);

async function run() {
    // all data collection
    try{
        await client.connect()
        const database = client.db('assigment-indian')
        const contactCollection = database.collection('contacts')



// post api
        app.post('/contacts', async(req, res)=> {
            const products = req.body
            console.log('hit the api ' , products)
            const result = await contactCollection.insertOne(products)
            console.log(result)
            res.json(result)
        })





    }
    finally{

    }

}

run().catch(console.dir);


app.get('/' , (req, res ) => {
    res.send('Contact page server')
});

app.listen(port,  () => {
    console.log('Contact page server' , port)
})