import Ember from 'ember'

export default Ember.Route.extend({
    queryParams: {
		page: { refreshModel: true },
		pageSize: { refreshModel:true },
	},
	filterQuery: function (params){
		var ret={page:1, page_size:10};
		if (params.pageSize!=null){
			ret.page_size=params.pageSize
		}
		if (params.page!=null){
			ret.page=params.page;
		}

		return ret
	},
})