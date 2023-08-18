const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require('./routes/userRoutes');

app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/', (req, res) => {
  res.json("Server is running");
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
