import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
    this.resource('login', {path:'/login'})
    this.resource('sites', {path:'/sites'})
    this.resource('site', {path: '/site/:site_id'})
});

export default Router;
