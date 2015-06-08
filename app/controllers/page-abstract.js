import Ember from 'ember';

export default Ember.ArrayController.extend({
    queryParams:["page", "pageSize", "search"],

	page:1,
	pageSize:10,
	search:'',
	listPageSize:[10,25,50],
	totalItems: Ember.computed.alias('model.meta.count'),

	isFirst: function (){
		return this.page===1;
	}.property("page"),

	numPages: function (){
		var pageSize=this.get('pageSize');
		var totalItems=this.get('totalItems');
		var remainder=totalItems%pageSize;
		var pages=(totalItems-remainder)/pageSize;
		if (remainder){
			pages++;
		}
		return pages;
	}.property('totalItems', 'pageSize'),
	lastPage: function (){
		return this.get('numPages');
	}.property("numPages"),

	isLast: function (){
		//var modelType = this.get('model.type');
		//var total=this.get('totalItems');
		var numPages=this.get('numPages');
		var page=this.get('page');
		return page+1>=numPages;
	}.property("page", "numPages"),

	listNearPages: function (near){
		var page=this.get('page');
		var numPages=this.get('numPages');

		var first=page-near;
		var last=page+near+1;
		if (first<0){
			first=0;
		}
		if (last>numPages){
			last=numPages;
		}
		var ret=[];
		for (var i=first; i<last; i++){
			var p={label: i+1, id:i, current: i===page};
			ret.addObject(p);
		}
		return ret;
	},
	actions: {
		nextPage: function(){
			this.set('page', this.get('page')+1);
		},
		prevPage: function(){
			this.set('page', this.get('page')-1);
		},
	}
});
