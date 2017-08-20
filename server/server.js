var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Asset} = require('./models/asset');

const port = process.env.PORT || 3000; 

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

