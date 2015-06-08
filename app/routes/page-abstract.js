import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
		page: { refreshModel: true },
		pageSize: { refreshModel:true },
	    search: { refreshModel: true }
	},
	filterQuery: function (params){
		var ret={page:1, page_size:10};
		if (params.pageSize!==null && params.pageSize!==undefined){
			ret.page_size=params.pageSize;
		}
		if (params.page!==null && params.page!==undefined){
			ret.page=params.page;
		}
		if (params.search!==null && params.search!==undefined && params.search!==''){
			ret.search=params.search;
		}

		return ret;
	}
});