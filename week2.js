const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://m001-student:5BnK2tfSM1Vtl5Oh@sandbox.zy7nd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
    if (err) {
        console.log(err.message)
        return
    }
    console.log('Connected to MongoDB')
    
    client.db().admin().listDatabases().then(reult => {
        console.log(reult);
    })
});
