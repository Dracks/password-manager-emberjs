import Ember from 'ember';
import ENV from '../config/environment';
import { translationMacro as t } from "ember-i18n";

export default Ember.Controller.extend({
	searchText:'',
	placeHolderSearchText: t('application.navigation.search',{}),
	listLanguages: [{id:'en', name:'English'}, {id:'es', name:'Español'}],
	selectedLanguage: Ember.computed.alias('i18n.locale'),
	hasSearch: function (){
		var search=this.get('searchText');
		return search!=null && search.length>2;
	}.property('searchText'),
	searchResults: function (){
		var search=this.get('searchText');
		return this.store.find('site',{search:search});
	}.property('searchText'),
	hasTokenExpired: function(){
		var info=this.get('jwt');
		return info===null || info===undefined || info.expiration<new Date();
	}.property('jwt'),
	jwt: function (){
		var jwt=localStorage.jwt;
		if (jwt===undefined){
			return undefined;
		} else {
			var ret=JSON.parse(localStorage.jwt);
			if (ret!=null) {
				ret.expiration = new Date(ret.expiration);
			}
			return ret;
		}
	}.property(),
	setJWT: function (token, expiration){
		var info=null;
		if (token!==null && expiration!==null){
			info={"token": token, "expiration":expiration};
			localStorage.jwt=JSON.stringify(info);
		} else {
			localStorage.jwt=null;
		}
		this.set('jwt',info);
	},
	login: function (user, password){
		delete localStorage.jwt;

		var promise=Ember.$.post(ENV.APP.API_HOST+'/'+ENV.APP.API_AUTH_NAMESPACE+'/auth', {

			username: user,
			password: password

		}).then(function(data) {
			this.loggedInWithToken(data);
		}.bind(this));
		return promise;
	},
	loggedInWithToken: function (data){
		var loginTime=new Date();
		var delay=data.life_time*1000;
		window.setTimeout(this.refreshTokenTimeoutCallback.bind(this), delay-5*1000);
		var expiration=new Date(loginTime.getTime()+delay);
		this.setJWT(data.token, expiration);
		console.log("Ping: "+loginTime+" pong:"+expiration);
	},
	refreshToken: function (){
		var request=Ember.$.post(ENV.APP.API_HOST+'/'+ENV.APP.API_AUTH_NAMESPACE+'/refresh', {token:this.get('jwt').token});
		request.then(function (data){
			this.loggedInWithToken(data);
		}.bind(this), function (){
			this.setJWT(null);
		}.bind(this));
		return request;
	},
	refreshTokenTimeoutCallback: function (){
		if (localStorage.jwt!==undefined){
			this.refreshToken().fail(function (){
				this.transitionTo('login');
			}.bind(this));
		}
	},
	init: function (){
		Ember.$.ajaxPrefilter(function(options, originalOptions, xhr) {
			var jwt=this.get('jwt');
			if (jwt!==null && jwt !==undefined && jwt.expiration>new Date()){
				return xhr.setRequestHeader('Authorization', 'JWT '+this.get('jwt').token);
			}
		}.bind(this));
	},
	loggedIn: function (){
		var jwt=this.get('jwt');
		if (!this.get('hasTokenExpired')){
			return new Ember.RSVP.Promise(function(resolve){

				Ember.$.post(ENV.APP.API_HOST+'/'+ENV.APP.API_AUTH_NAMESPACE+'/verify',{token:jwt.token}).then((function (){
					var elapse=jwt.expiration.getTime()-(new Date()).getTime();
					window.setTimeout(this.refreshTokenTimeoutCallback.bind(this), elapse);
					resolve(true);
				}.bind(this)),(function(){
					this.setJWT(null, null);
					resolve(false);
				}).bind(this));
			}.bind(this));
		} else if (jwt===null || jwt===undefined){
			return false;
		} else {
			return new Ember.RSVP.Promise(function (resolve){
				this.refreshToken().then(function (){
					resolve(true);
				}, function (){
					resolve(false);
				});
			}.bind(this));
		}
	}.property('jwt'),

	actions: {
		logout: function() {
			delete localStorage.jwt;
			this.controllerFor('application').set('loggedIn', false);
			this.transitionTo('index');
		},
		goToSites: function (){
			var text=this.get('searchText');
			this.transitionToRoute('site', {queryParams:{search:text}});
		}
	}
});
