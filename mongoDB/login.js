const express = require('express')
const app = express()
app.use(express.json())
const bcrypt = require('bcrypt');
const port = 3000
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/db');

const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  cpassword:String
})

userSchema.pre ('save', async function(){
      if(this.isModified('password')){
      this.password = await bcrypt.hashSync(this.password, 10)
      // this.cpassword = await bcrypt.hash(this.cpassword , 10)  
    }  
})   

const user = mongoose.model('user', userSchema );

app.post('/register',(req,res)=>{
const data = new user(req.body);

// if(''){
//   password != cpassword
//   bcrypt.compare(password, hash).then(function(result) {
// console.log('pass invalid');
// });
//   this.password = bcrypt.compare(this.password , 10)
//   this.cpassword = bcrypt.compare(this.cpassword , 10)
//   res.send('password are not same')
// }
// else{
  data.save(); 
   res.send('data has been sent')

console.log('data saved sucessfully');

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
