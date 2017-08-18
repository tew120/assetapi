const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/VideoApp', (err, db) =>{

	if (err) {
		return console.log('Unable to connect to Mongo DB Server');
	}

	console.log('Connected to MongoDB server')


/*	db.collection('Videos').find({valid: true}).toArray().then((docs) => {
		console.log('Videos');
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log("Unable to fetch Videos", err)
	}) ;*/
/*
	db.collection('Videos').find({
			_id: new ObjectID('59849305163e2b53a9562966')
		}).toArray().then((docs) => {
		console.log('Videos');
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log("Unable to fetch Videos", err)
	}) ;*/
		//http://mongodb.github.io/node-mongodb-native/2.0/api/ 
		// > cursor



/*	db.collection('Videos').find().count().then((count, err) => {
		console.log(`Videos count ${count}`);
		
	}, (err) => {
		console.log("Unable to fetch Videos", err)
	}) ;*/

	/*db.collection('Users').find({name: 'Bob'}).toArray().then((docs) => {
		console.log('Bobs');
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log("Unable to fetch Bobs", err)
	}) ;*/

	db.close();

});