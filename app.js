const express = require('express')
const app = express();
require('dotenv/config')
const db = require("./models");

app.get('/', (req, res) => {
  res.send('Ekalaamu!')
});

//Test DB connection
db.authenticate()
.then(()=>console.log(`successfully connected to the ${process.env.DATABASE} `))
.catch(err=>console.log('Error' + err))

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>console.log(`server has started on port ${PORT}`));
