var mongoose = require('mongoose');

var Asset = mongoose.model('Asset', {
// trim: normalize space
	title: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	published: {
		type: Number,
		default: null
	},
	available: {
		type: Boolean,
		default: false
	}
});

module.exports = {Asset}; 
