const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Asset} = require('./../models/asset');


const assets = [{
	_id: new ObjectID(),
	title: 'First test asset'
}, {
	_id: new ObjectID(),
	title: 'Second test asset',
	available: true,
	published: 22211

}];


beforeEach((done) => {
	Asset.remove({}).then(() => {
		return Asset.insertMany(assets);
	}).then(() => done());
});

describe('POST /asset', () => {

	it('should create a new asset', (done) => {
		var title = 'Test asset text';

		request(app)
			.post('/assets')
			.send({title})
			.expect(200)
			.expect((res) => {
				expect(res.body.title).toBe(title);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Asset.find({title}).then((assets) => {
					expect(assets.length).toBe(1);
					expect(assets[0].title).toBe(title);
					done();
				}).catch((e) => done());
			})
	});


	it('should not create asset with invalid data', (done) => {
		request(app)
			.post('/assets')
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Asset.find().then((assets) => {
					expect(assets.length).toBe(2);
			
					done();
				}).catch((e) => done(e));
			})
	})
});


describe('Get /assets', () => {
	it('should get all assets', (done) => {
		request(app)
			.get('/assets')
			.expect(200)
			.expect((res) => {
				expect(res.body.assets.length).toBe(2);
			})
			.end(done);
	});		
});

describe('Get /assets/:id', () => {
	it('Should return a single asset', (done) => {
		request(app)
			.get(`/assets/${assets[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.asset.title).toBe(assets[0].title);
			})
			.end(done);
	});


	it('should return a 404 if asset not found', (done) => {
		var hexId = new ObjectID().toHexString();
		request(app)
		.get(`/assets/${hexId}`)
		.expect(404)
		.end(done);
	});

	it('should return a 404 for non-object ids', (done) => {
		request(app)
		.get('/assets/123')
		.expect(404)
		.end(done);
	});

});

describe ('Delete /asset/:id', () => {
	it('Should delete an asset', (done) => {
		var hexId = assets[0]._id.toHexString();
		request(app)
			.delete(`/assets/${hexId}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.asset._id).toBe(hexId);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				Asset.findById(hexId).then((asset) => {
					expect(asset).toNotExist();
					done();
				}).catch((e) => done(e));
			});

	});

	it('should return 404 if todo not found', (done) => {
	    var hexId = new ObjectID().toHexString();

	    request(app)
	      .delete(`/assets/${hexId}`)
	      .expect(404)
	      .end(done);
	  });

	it('should return 404 if object id is invalid', (done) => {
	    request(app)
	      .delete('/assets/123abc')
	      .expect(404)
	      .end(done);
	});
});

describe ('PATCH /asset/:id', () => {
	it('should update the asset', (done) => {
		var hexId = assets[0]._id.toHexString();
		var text = 'This should be the new title';
		request(app)
			.patch(`/assets/${hexId}`)
			.send({title: text, available: true}) 
			.expect(200)
			.expect((res) => {
				expect(res.body.asset.title).toBe(text);
				expect(res.body.asset.available).toBe(true);
				expect(res.body.asset.published).toBeA('number');
		
			})
			.end(done);


	});

	it('should clear published when asset is not available', (done) => {
		var hexId = assets[1]._id.toHexString();
		var text = 'This should be the new title2';
		request(app)
			.patch(`/assets/${hexId}`)
			.send({title: text, available: false}) 
			.expect(200)
			.expect((res) => {
				expect(res.body.asset.title).toBe(text);
				expect(res.body.asset.available).toBe(false);
				expect(res.body.asset.published).toNotExist;
		
			})
			.end(done);
	});
});

