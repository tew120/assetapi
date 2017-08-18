const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Asset} = require('./../server/models/asset');

var id = '599194770e249d0f86e124f4';






/*Asset.find({
	_id: id
}).then((assets) => {
	console.log('Assets', assets)
});

Asset.findOne({
	_id: id
}).then((asset) => {
	console.log('Asset', asset)
});*/

if (!ObjectID.isValid(id)){
	return console.log('Id is not valid');
} 
	
Asset.findById(id).then((asset) => {
	if (!asset) {
		return console.log('ID not found');
	}
	console.log('Asset by ID', asset)
}).catch((e) => console.log(e));

	
