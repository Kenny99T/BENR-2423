const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://m001-student:ERhkuQJWeLgOck36@sandbox.zy7nd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect( async err => {
    if (err) {
        console.log(err.message)
        return
    }
    console.log('Connected to MongoDB')

    //Find all documents from collection trips that tripduration less than or equal to 60.
    let result = await client.db('sample_training').collection("trips").find({"tripduration": {"$lte": 60}}).toArray();
    console.log(result);

    //Find all documents from collection trips that tripduration less than or equal to 70 and not Subscriber
    let result1 = await client.db('sample_training').collection("trips").find({"$and": [{
        "tripduration": {"$lte": 70}}, 
        {"usertype": {"$ne": 'Subscriber'}}
    ]}).toArray();
    console.log(result1);

    //Find all documents from collection trips that tripduration less equal to 50 or 100
    let result2 = await client.db('sample_training').collection("trips").find({"tripduration": {$in: [50, 100]}}).toArray();
    console.log(result2);

    //Find all documents from collection posts that the array tags contain the word salt
    let result3 = await client.db('sample_training').collection("posts").find({"tags": {"$elemMatch": {"$eq": "salt"}}}).toArray();
    console.log(result3);

    //Find all documents from collection posts that the author is not from 'machine'
    let result4 = await client.db('sample_training').collection("posts").find({"author": {"$not": {"$eq": "machine"}}}).toArray();
    console.log(result4);

    //Find all documents from collection posts that the title is 'US Constitution' and tags contain the word 'balloon'
    let result5 = await client.db('sample_training').collection("posts").find({"$and": [{"title":{"$eq": 'US Constitution'}},{"tags": {"$elemMatch": {"$eq": "balloon"}}}]}).toArray();
    console.log(result5);
    console.log('Completed');
});
