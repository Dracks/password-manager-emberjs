import Ember from 'ember';
import StringUtils from '../utils/string-utils';
import ENV from "../config/environment";

/**
 * Code used to manage criptography of passwords.
 * Base code extracted from: http://qnimate.com/symmetric-encryption-using-web-cryptography-api/
 */
export default Ember.Service.extend({

	cypherType: 1,

	exportKey: function (key) {

		return new Ember.RSVP.Promise(function (resolve, reject) {
			var crypto = this.get('crypto');
			crypto.subtle.exportKey("jwk", key).then(function (result) {
				resolve(JSON.stringify(result));
			}, reject)
		}.bind(this));
	},

	currentKey: function () {
		var vector = this.get('currentIv');
		var promise = this.get("crypto").subtle.importKey("jwk",
			JSON.parse(ENV.CRYPTO_KEY),
			{name: "AES-CBC", iv: vector},
			true,
			["encrypt", "decrypt"]);
		promise.then(function (e) {
			console.log(e);

		}, function (e) {
			console.log(e);
		});
		return promise;
	}.property(),
	currentIv: function () {
		var obj=atob(ENV.CRYPTO_IV);
		return StringUtils.convertToArrayBufferView(obj)
	}.property(),

	crypto: function () {
		return window.crypto;
	}.property(),

	generateKey: function () {
		//Parameters:
		//1. Symmetric Encryption algorithm name and its requirements
		//2. Boolean indicating extractable. which indicates whether or not the raw keying material may be exported by the application (http://www.w3.org/TR/WebCryptoAPI/#dfn-CryptoKey-slot-extractable)
		//3. Usage of the key. (http://www.w3.org/TR/WebCryptoAPI/#cryptokey-interface-types)
		var crypto = this.get('crypto');
		var promiseKey = crypto.subtle.generateKey({name: "AES-CBC", length: 128}, true, ["encrypt", "decrypt"]);

		promiseKey.catch = function (e) {
			console.log(e.message);
		};
		return new Ember.RSVP.Promise(function (resolve, reject) {
			promiseKey.catch(function (e) {
				console.log(e.message);
			});
			promiseKey.then(resolve, reject);
		});
	},

	encrypt: function (data) {
		return new Ember.RSVP.Promise(function (resolve, reject){
			this.get('currentKey').then(function (key){
				var crypto = this.get('crypto');
				var vector = this.get('currentIv');
				crypto.subtle.encrypt({
					name: "AES-CBC",
					iv: vector
				}, key, StringUtils.convertToArrayBufferView(data)).then(function (data){
					resolve(btoa(StringUtils.convertFromArrayBufferView(data)))
				}, function (error){
					console.log(error);
					reject(error)
				});
			}.bind(this));
		}.bind(this));
	},

	decrypt: function (encData) {
		var crypto = this.get('crypto');

		return new Ember.RSVP.Promise(function (resolve, reject) {
			var crypto = this.get('crypto');
			var key = this.get('currentKey');
			var vector = this.get('currentIv');
			var promise = crypto.subtle.decrypt({name: "AES-CBC", iv: vector}, key, StringUtils.convertToArrayBufferView(atob(encData)));
			promise.then(function (data) {
				resolve(StringUtils.convertFromArrayBufferView(data))
			},reject);
		}.bind(this));
	}
});
