const {faker} = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://m001-student:qOft08A8i6XRjFpt@sandbox.zy7nd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(async err => {
    const name = []
    for(let i=0; i<5; i++) {
        fullName = `${faker.name.firstName()} ${faker.name.lastName()}`;
        name.push(fullName);
    }

    const database = client.db("lab1")
    const collection = database.collection("users")

    for(let i=0; i<3; i++){
        collection.insertOne({
            name: name[i],
        })
    }

    collection.find().toArray().then(result=>{
        console.log("Create:")
        console.log(result);
    })

    let new_name = []
    for(let i=0; i<3; i++) {
        fullName = `${faker.name.firstName()} ${faker.name.lastName()}`;
        new_name.push(fullName);
    }

    for(let i=0; i<3; i++){
        await collection.updateOne({name: name[i]}, {$set: {name: new_name[i]}})
    }

    collection.find().toArray().then(result=>{
        console.log("Update:")
        console.log(result);
    })

    await collection.deleteOne({name: new_name[0]})
    collection.find().toArray().then(result=>{
        console.log("Delete:")
        console.log(result);
    })
});