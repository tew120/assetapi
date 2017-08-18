const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Asset} = require('./../server/models/asset');

/*Asset.remove({}).then((result) => {
	console.log(result);
});
*/
Asset.findOneAndRemove({_id: '59930b48ea80bc96aa4d4aa7'}).then((asset) => {

});

Asset.findByIdAndRemove('59930b48ea80bc96aa4d4aa7').then((asset) => {
 console.log(asset);
});

