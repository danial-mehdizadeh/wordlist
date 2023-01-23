const express = require('express')
const app = express()
console.log(app)


const PORT = 3000 
// parameter callback - port
app.listen(PORT, ()=>{
    console.log('uour server run in port: ', PORT)
})