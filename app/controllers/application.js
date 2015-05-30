import Ember from 'ember';

export default Ember.Controller.extend({
	hasTokenExpired: function(){
		var info=this.getJWT();
		return info===undefined || info.expiration<new Date();
	},
	getJWT: function (){
		var jwt=localStorage.jwt;
		if (jwt===undefined){
			return undefined;
		} else {
			var ret=JSON.parse(localStorage.jwt);
			ret.expiration=new Date(ret.expiration);
			return ret;
		}
	},
	loggedInWithToken: function (data){
		var loginTime=new Date();
		var delay=data.life_time*1000;
		window.setTimeout(this.refreshTokenTimeoutCallback.bind(this), delay-5*1000);
		var expiration=new Date(loginTime.getTime()+delay)
		console.log("Ping: "+loginTime+" pong:"+expiration);
		localStorage.jwt = JSON.stringify({ "token": data.token, "expiration":expiration});
		this.set('loggedIn', true);
	},
	refreshToken: function (){
		var request=Ember.$.post('http://127.0.0.1:8000/api-token/refresh', {token:this.getJWT().token})
		request.then(function (data){
			this.loggedInWithToken(data);
		}.bind(this));
		return request;
	},
	refreshTokenTimeoutCallback: function (){
		if (localStorage.jwt!==undefined){
			this.refreshToken();
		}
	},
	init: function (){
		$.ajaxPrefilter(function(options, originalOptions, xhr) {
			if (!this.hasTokenExpired()){
				return xhr.setRequestHeader('Authorization', 'JWT '+this.getJWT().token);
			}
		}.bind(this));
	},
	loggedIn: function (){
		var jwt=this.getJWT();
		if (!this.hasTokenExpired()){
			return new Ember.RSVP.Promise(function(resolve, reject){

				Ember.$.post('http://127.0.0.1:8000/api-token/verify',{token:jwt.token}).then((function (){
					var elapse=jwt.expiration.getTime()-(new Date()).getTime()
					window.setTimeout(this.refreshTokenTimeoutCallback.bind(this), elapse)
					resolve(true);
				}.bind(this)),(function(){
					this.set('loggedIn', false);
					delete localStorage.jwt;
					resolve(false);
				}).bind(this));
			}.bind(this));
		} else if (jwt===undefined){
			return false;
		} else {
			return new Ember.RSVP.Promise(function (resolve){
				this.refreshToken().then(function (){
					resolve(true)
				}, function (){
					resolve(false)
				});
			}.bind(this));
		}
	}.property(),


	actions: {
		logout: function() {
			delete localStorage.jwt;
			this.controllerFor('application').set('loggedIn', false);
			this.transitionTo('index');
		}
	}
});
