import { moduleFor, test } from 'ember-qunit';

moduleFor('service:crypto-symetric', 'Unit | Service | crypto Symmetric', {
	// Specify the other units that are required for this test.
	// needs: ['service:foo']
});

// Replace this with your real tests.
test('Encrypting and decripting values', function (assert) {
	var service = this.subject();
	service.encrypt("pong").then(function (data){
		console.log("crypted:");
		console.log(data);
		service.decrypt(data).then(function (value){
			console.log("Uncrypted:");
			console.log(value);
			assert.equal("pong", value);
		}, function (err){
			assert.equal(false, true, err.message);
		});
	}, function (err){
		assert.equal(false, true, err.message);
	});
	assert.ok(service);
});

