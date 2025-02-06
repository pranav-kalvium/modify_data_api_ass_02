require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3010;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Define MenuItem Schema
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// PUT - Update Menu Item
app.put('/menu/:id', async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    
    if (!updatedItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - Remove Menu Item
app.delete('/menu/:id', async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    
    if (!deletedItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});












































// const express = require('express');
// const { resolve } = require('path');

// const app = express();
// const port = 3010;

// app.use(express.static('static'));

// app.get('/', (req, res) => {
//   res.sendFile(resolve(__dirname, 'pages/index.html'));
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
