import Ember from "ember";

var SiteRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('site', params.site_id);
    }
});

export default SiteRoute;