import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
	location: config.locationType
});

Router.map(function() {
	this.resource('login', {path:'/login'});
	this.resource('protected', {path: '/protected'}, function (){
		this.route('group', function() {
			this.route('new');
			this.route('edit', {path: '/:group_id'}, function (){
				this.resource('site', function (){
					this.route('edit', {path: '/:site_id'});
					this.route('new', {path:'/new'});
				});
			});
		});
		this.resource('site', function (){
			this.route('edit', {path: '/:site_id'});
			this.route('new', {path:'/new'});
		});
	});
});

export default Router;
