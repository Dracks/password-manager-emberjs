import ProtectedRoute from './protected';
import Ember from 'ember';

export default ProtectedRoute.extend({
	model: function (){
		return new Ember.RSVP.Promise(function (resolve, reject){
			var data;
			var totalData=[];
			var callPage=function (page){
				return this.store.find('group', {parent: null, page:page});
			}.bind(this);
			var resolveCallback=function (d){
				totalData=totalData.concat(d.get('content'));
				var next=data.get('content.meta.next');
				if (next!==null){
					data=callPage(next);
					data.then(resolveCallback, function (e){
						reject(e);
					})
				} else {
					resolve(totalData);
				}
			};
			data=callPage(1);
			data.then(resolveCallback, function (e){
				reject(e);
			});
		}.bind(this));
	}
});
