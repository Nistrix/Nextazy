const express = require('express');
const app = express();

// Import your route
const apiRoutes = require('./routes/apiRoutes');

app.use(express.json());

const port = process.env.PORT || 4000;

// Use the API routes
app.use('/', apiRoutes);

app.listen(port, () => {
  console.log(`Server Connected to Port: ${port} Successfully!`);
});
