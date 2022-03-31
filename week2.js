const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://m001-student:ERhkuQJWeLgOck36@sandbox.zy7nd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//Connecting to MongoDB server and print 'Connected to MongoDB' if connection success
client.connect(err => {
    if (err) {
        console.log(err.message)
        return
    }
    console.log('Connected to MongoDB')
    
    //Access to the databases and display all the databases
    client.db().admin().listDatabases().then(result => {
        console.log(result);
    })

    //Access to the databases and display databases only
    client.db().admin().listDatabases().then(result => {
        console.log(result['databases']);
    })

    //Access to the databases and display database on index 7
    client.db().admin().listDatabases().then(result => {
        console.log(result['databases'][7]);
    })

    //List the collections inside the database
    client.db('sample_training').listCollections( ).toArray( ).then(result => {
        console.log(result);
    })

    //List the collections inside the database on index 4
    client.db('sample_training').listCollections( ).toArray( ).then(result => {
        console.log(result[4]);
    })

    //List all the document inside the collection
    client.db('sample_training').collection('zips').find().toArray().then(result => {
        console.log(result);
    })

    //Find the document that have been specified in find()
    client.db('sample_training').collection('zips').find({city: 'BIRMINGHAM'}).toArray().then(result => {
        console.log(result);
    })
});
