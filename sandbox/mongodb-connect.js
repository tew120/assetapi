// const MongoClient = require('mongodb').MongoClient;
// Destructuring - same as above
const { MongoClient, ObjectID } = require('mongodb');

/*var obj = new ObjectID();
console.log(obj);*/

MongoClient.connect('mongodb://localhost:27017/VideoApp', (err, db) =>{

	if (err) {
		return console.log('Unable to connect to Mongo DB Server');
	}

	console.log('Connected to MongoDB server')

	/*db.collection('Videos').insertOne({
		text: 'Some Synopsis',
		valid: true
	}, (err, result) => {
		if (err) {
			return console.log('Unable to insert Video', err);
		}

		console.log(JSON.stringify(result.ops, undefined, 2))

	});*/


/*db.collection('Users').insertOne({
		name: 'Bob',
		age: 31,
		location: 'Boston'
		
	}, (err, result) => {
		if (err) {
			return console.log('Unable to insert User', err);
		}

		console.log(result.ops[0]._id.getTimestamp());


	});*/



	db.close();

});