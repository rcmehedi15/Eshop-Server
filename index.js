const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// databse
const { MongoClient, ServerApiVersion } = require("mongodb");

// Load environment variables from the .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
// databse connect
const uri =
  "mongodb+srv://eshop:j4ImqUeQn0mI6FAR@mehedi15.lrak9tg.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("products").command({ ping: 1 });
    // database all production collection
    const productsCollection = client.db("products").collection("product");

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    // product front to database send
    app.post("/addProduct", async (req, res) => {
      const body = req.body;
      const result = await productsCollection.insertOne(body);
      res.send(result);
      console.log(result);

      // Add your logic to save the product data to the MongoDB database here

      res.status(200).json({ message: "Product data received." });
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Brand Company Is Running");
});

app.listen(port, () => {
  console.log(`Brand company use this port : ${port}`);
});
