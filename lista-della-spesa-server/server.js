 const express = require('express');
 const cors = require('cors');

const port = 8080;
const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://127.0.0.1:5500/form.html',
    //credentials: true,
  })
);


//vars
const {getItemsFromCart} = require('./getCartItems');
const userMail = 'm.tavarelli@hotmail.com';
const userPass = 'mrbaloon91';

app.post('/server', async (req, res) => {
  console.log(`request=> ${req.body}`);
  console.log(`email=> ${req.body.email}`);
  console.log(`password=> ${req.body.password}`);
  let data = /* await */ getItemsFromCart('m.tavarelli@hotmail.com', 'mrbaloon91');
  res.send(data);
  console.log(data);
});


app.listen(port, () => {
  console.log(`Server running on port${port}`);
});

getItemsFromCart('m.tavarelli@hotmail.com', 'mrbaloon91')
.then(data=>console.log(data))
.catch(error=>console.log(error))
 

