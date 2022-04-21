const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb+srv://m001-student:qOft08A8i6XRjFpt@sandbox.zy7nd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

exports.connect = async () => {
    try {
        await client.connect();
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
exports.close = async () => {
    await client.close();
};
exports.parta = async () => {
    return client.db('sample_analytics').collection('customers').aggregate([{
        $match:{name:"Shirley Rodriguez"}}
    ]).toArray();
};

exports.partab = async () => {
    return client.db('sample_analytics').collection('customers').aggregate([{
        $match: {name: 'Shirley Rodriguez'}},{
        $lookup: {
          from: "accounts",
          localField: "accounts",
          foreignField: "account_id",
          as: 'accounts'
        }}
    ]).toArray();
};

exports.partabc = async () => {
    return client.db('sample_analytics').collection('customers').aggregate([{
        $match: {name: 'Shirley Rodriguez'}},{
        $lookup: {
            from: "accounts",
            localField: "accounts",
            foreignField: "account_id",
            as: 'accounts'}},{
        $unwind: {
            path: "$accounts",}},{
        $match: {
            "accounts.products": { $in: ['InvestmentFund']}}},{
        $group: {
            _id: '$_id', 
            username: {
                $first: '$username'
            },
            name: {
                $first: '$name'
            }, 
            address: {
                $first: '$address'
            }, 
            birthdate: {
                $first: '$birthdate'
            }, 
            accounts: {
                $push: '$accounts'
            }
        }}
    ]).toArray();
};
