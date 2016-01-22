import Ember from 'ember';

export default Ember.Service.extend({
	store: Ember.inject.service(),

	requestAll: function (model, query){
		var pageSize=10;
		var store=this.get('store');
		if (query===undefined) {
			query={}
		}

		var promise=new Ember.RSVP.Promise(function (resolve, reject){
			var data;
			var totalData=[];
			var page=1;
			var callPage=function (offset){
				var callQuery=query;
				callQuery.page=offset;
				callQuery.page_size=pageSize;
				return store.find(model, callQuery);
			};
			var resolveCallback=function (d){
				d.forEach(function (e){
					totalData.push(e);
				});
				//totalData=totalData.concat(d.get('content'));
				var total=data.get('content.meta.count');
				if (totalData.length<total){
					page++;
					data=callPage(page);
					data.then(resolveCallback.bind(this), function (e){
						reject(e);
					});
				} else {
					resolve(totalData);
				}
			};
			data=callPage(page);
			data.then(resolveCallback.bind(this), function (e){
				reject(e);
			});
		});
		return DS.PromiseArray.create({ promise:promise });
	},

	groupsList: function (){
		return this.requestAll('group', {show_tree:true});
	}.property()
});
