import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

export default Ember.Controller.extend({
	needs:['UserSession'],
	loggedIn: Ember.computed.alias('controllers.UserSession.loggedIn'),
	searchText:'',
	placeHolderSearchText: '',
	i18n: Ember.inject.service(),
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
	init: function (){
		this.set('placeHolderSearchText', t('application.navigation.search',{}));
	},

	actions: {
		goToSites: function (){
			var text=this.get('searchText');
			this.transitionToRoute('site', {queryParams:{search:text}});
		}
	}
});
