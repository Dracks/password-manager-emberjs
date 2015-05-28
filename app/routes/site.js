import ProtectedRoute from "./protected";

var SiteRoute = ProtectedRoute.extend({
    model: function(params) {
        return this.store.find('site', params.site_id);
    }
});

export default SiteRoute;