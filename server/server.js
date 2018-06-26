const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
  users:[
      {
          id:'123',
          name: 'john',
          password:'cookies',
          age: '24'
      },
      {
          id:'124',
          name: 'sally',
          password:'bananas',
          age: '30'
      }
  ]
};

app.get('/',(req,res) =>{
    res.send(database.users);
});

app.post('/signin', (req,res)=>{
    if ( req.body.name === database.users[0].name && req.body.password === database.users[0].password) {
        res.json('success');
    }else {
        res.status(400).json('error login');
    }
});

app.post('/register',(req,res)=>{
    const {age,name,password} = req.body;
   database.users.push({
       id:'127',
       name: name,
       age:age,
       password:password
   });
   res.json(database.users[database.users.length - 1]);
});

app.listen(3000, ()=>{
    console.log('app is running on port 3000');
});