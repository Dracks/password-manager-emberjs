import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

export default Ember.Controller.extend({
	session: Ember.inject.service('session'),
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
			this.get('searchResults').then(function (data){
				if (data.content.length==1){
					this.transitionToRoute('site.edit', data.content[0].get('id'));
					this.set('searchText', '');
				} else {
					var text=this.get('searchText');
					this.transitionToRoute('site', {queryParams:{search:text}});
				}
			}.bind(this));
		},
		logout (){
			this.get('session').invalidate();
		}
	}
});
