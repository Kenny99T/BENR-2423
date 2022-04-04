const bcrypt = require("bcryptjs")
const { faker } = require('@faker-js/faker');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://m001-student:ERhkuQJWeLgOck36@sandbox.zy7nd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect( async err => {
    if (err) {
        console.log(err.message)
        return
    }
    console.log('Connected to MongoDB')

    const saltRounds = 10;
    for(let i = 0; i < 50; i++){
        const name = faker.name.findName();
        const username = faker.internet.userName();
        const email = faker.internet.email();
        const password = faker.internet.password();
        let result = await client.db("Week3").collection("User").insertOne({
            "Name": name, 
            "Username": username,
            "Email": email,
        });
        console.log(result);
        console.log(password);
        bcrypt.genSalt(saltRounds, function (saltError, salt) {
            if (saltError) {
                throw saltError
            } 
            else {
                bcrypt.hash(password, salt, function(hashError, hash) {
                    if (hashError) {
                        throw hashError
                    } 
                    else {
                        //console.log(hash);
                        client.db("Week3").collection("User").updateOne({"Name": name},{"$set": {"Password": hash}});
                    }
                });
            }
        });
    }
    console.log('Completed');
});
