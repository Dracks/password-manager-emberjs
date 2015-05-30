import PageAbstractRoute from "../page-abstract";

var SitesRoute = PageAbstractRoute.extend({
	model: function(params) {
		return this.store.find('site', this.filterQuery(params));
	}
});

export default SitesRoute;