require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Asset} = require('./models/asset');

const port = process.env.PORT; 

var app = express();

// send JSON to express application
app.use(bodyParser.json());

app.post('/assets', (req, res) => {
	var asset = new Asset({
		title: req.body.title
	});

	asset.save().then((asset) => {
		res.send(asset);	
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/assets', (req, res) => {
	Asset.find().then((assets) => {
		res.send({assets});
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/assets/:id', (req, res) => {
	var id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Asset.findById(id).then((asset) => {
		if (!asset) {
			return res.status(404).send();
		} 
		res.send({asset});
	}).catch((e) => {
		res.status(400).send();
	});

}); 

app.delete('/assets/:id', (req, res) =>{
	var id = req.params.id;
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Asset.findByIdAndRemove(id).then((asset) => {
		if (!asset) {
			return res.status(404).send();
		} 
		res.send({asset});
	}).catch((e) => {
		res.status(400).send();
	});

});

app.patch('/assets/:id', (req, res) => {
	var id = req.params.id;
	// properties that can be updated
	var body = _.pick(req.body, ['title', 'available']);
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	if (_.isBoolean(body.available) && body.available) {
		body.published = new Date().getTime();
		console.log("Updating body");
	} else {
		console.log("Not Updating body");
		body.available = false;
		// Remove value from db:

		body.published = null;
	}

	Asset.findByIdAndUpdate(id, {$set: body}, {new: true}).then((asset) => {
		if (!asset) {
			return res.status(404).send();
		}
		res.send({asset});

	}).catch((e) => {
		res.status(400).send();
	});

});



app.listen(port, () => {
	console.log(`Started on port ${port}`);
});





module.exports = {app}; 




// local var mongoose = mongoose property on object

// Asset constructor
/*var newAsset = new Asset({
	title: '   First asset title.  '

});


newAsset.save().then( (asset) => {
	console.log('Asset saved');
	console.log(JSON.stringify(asset, undefined, 2));

}, (e) => {
	console.log('Unable to save', e)
});*/

