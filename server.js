var express = require('express');
var app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
app.listen(8888, function(){
  console.log("Server is running ...");
});

//Firebase
const { db } = require('./config/admin');
//showwn het cac product
app.get("/shown", async (req, res) => {
  const cRef = db.collection('product');
  try {
    cRef.get().then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("get thanh cong");
      console.log(items);
      res.status(201).json(items);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
//lay ra du lieu cua 1 product cu the dua tren name
app.get("/shown/:name", async (req, res) => {
    const { name } = req.params; // Extract the 'name' parameter from the request URL
    const cRef = db.collection('product');
    try {
      cRef.where('name', '==', name) // Use the 'where' method to filter based on 'name'
        .get()
        .then((snapshot) => {
          const items = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          console.log("get thanh cong");
          console.log(items);
          res.status(200).json(items); // Use status 200 for success
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  //update name base on id
  app.put('/update/:id', async (req, res) => {
  const itemId = req.params.id;
  const { name } = req.body;
  try {
    // Get the document reference for the provided ID
    const itemRef = db.collection('product').doc(itemId);
    // Check if the document exists
    const doc = await itemRef.get();
    if (!doc.exists) {
      return res.status(404).json({ status: 'error', message: 'Item not found' });
    }
    // Perform the update
    await itemRef.update({ name: name });
    // Fetch the updated item to include in the response
    const updatedDoc = await itemRef.get();
    const updatedItem = updatedDoc.data();
    res.status(200).send({
      status: 'success',
      message: 'Name updated successfully',
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

//add more field to an existed product using id // them field tren 1 product da co san tren firebase
app.put('/updatefield/:id', async (req, res) => {
  const itemId = req.params.id;
  const { Test } = req.body;

  try {
    // Get the document reference for the provided ID
    const itemRef = db.collection('product').doc(itemId);

    // Check if the document exists
    const doc = await itemRef.get();
    if (!doc.exists) {
      return res.status(404).json({ status: 'error', message: 'Product not found' });
    }

    // Perform the update by adding the 'name' field
    await itemRef.update({
      Test: Test,
    });

    // Fetch the updated product to include in the response
    const updatedDoc = await itemRef.get();
    const updatedProduct = updatedDoc.data();

    res.status(200).send({
      status: 'success',
      message: 'Name added to the product successfully',
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});
//add more product with default field 
app.post('/add', async (req, res) => {
  const { name, brand, quantity, price } = req.body;
  try {
    const c = db.collection('product').doc();
    const item = {
      id: c.id,
      name: name,
      brand: brand,
      quantity: quantity,
      price: price,
      
      
      
    };
    console.log('add done', item);
    c.set(item);
    res.status(200).send({
      status: 'success',
      message: 'item added successfully',
      data: item,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//delete
app.delete('/delete/:id', async (req, res) => {
  try {
      const response = await db.collection("product").doc(req.params.id).delete();
      res.send(response);
  } catch(error) {
      res.send(error);
  }
})