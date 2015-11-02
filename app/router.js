import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
	location: config.locationType
});

Router.map(function () {
	this.resource('login', {path: '/login'});
	this.route('navigation', {path: '/'}, function () {
		this.resource('group', {path: '/group'}, function () {
			this.route('edit', {path: '/:group_id'});
			this.route('new', {path: '/new'});
			this.resource('site', function () {
				this.route('edit', {path: '/:site_id'});
				this.route('new', {path: '/new'});
			});
		});
	})
});

export default Router;
