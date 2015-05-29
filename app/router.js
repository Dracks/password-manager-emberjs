import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
  this.resource('login', {path:'/login'});
  this.resource('protected', {path: '/protected'}, function (){
      this.resource('sites', {path:'/sites'});
      this.resource('site', {path: '/site/:site_id'});
      this.resource('site-new', {path:'/site/new'});
  });
  this.route('group', function() {
    this.route('new');
    this.route('edit');
  });
});

export default Router;
