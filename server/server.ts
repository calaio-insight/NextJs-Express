import express from 'express';

// Create an Express application
const app = express();
const cors = require('cors');
const { PORT } = require('./config/config');


const homeController = require('./controllers/home.controller');
const homeItemController = require('./controllers/homeItem.controller');
const userTrustedNeighborController = require('./controllers/userTrustedNeighbor.controller');
const userController = require('./controllers/user.controller');
const fileController = require('./controllers/file.controller');

app.use(cors());

// Define health check route
app.get('/api', (req, res) => {
  res.json({'message': 'ok'});
});

app.use(express.json());
app.use('/api/home', homeController);
app.use('/api/user', userController);
app.use('/api/homeItem', homeItemController);
app.use('/api/userTrustedNeighbor', userTrustedNeighborController);
app.use('/api/file', fileController);


// Start the server and listen on the specified port
app.listen(PORT, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${PORT}`);
});