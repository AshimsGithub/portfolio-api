const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(cors());

const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    tlsAllowInvalidCertificates: false
  });  

app.get('/projects', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('portfolio'); // Your database name
    const projects = await db.collection('projects').find().toArray();
    res.json(projects);
  } catch (e) {
    res.status(500).send({ error: e.message });
  } finally {
    await client.close();
  }
});

app.listen(3000, () => console.log("✅ API is running on port 3000"));
