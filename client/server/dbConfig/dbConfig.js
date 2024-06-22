const monoose = require('mongoose');

monoose.connect(process.env.mongoURL);
const database = monoose.connection;

database.on('connected', ()=>{
    console.log("MonoDB Connection Succesfully");
})
database.on('error', (err)=>{
    console.log("MonoDB Connection Failed");
});

module.exports = database;