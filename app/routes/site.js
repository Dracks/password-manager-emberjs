import PageAbstractRoute from "./page-abstract";

var SitesRoute = PageAbstractRoute.extend({
	queryParams: {
		group: { refreshModel: true}
	},
	model: function(params) {
		var query=this.filterQuery(params);
		if (params.group!=null && params.group!=''){
			query.group=params.group;
		}
		return this.store.find('site', query);
	}
});

export default SitesRoute;