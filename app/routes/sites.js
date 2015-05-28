import ProtectedRoute from "./protected";

var SitesRoute = ProtectedRoute.extend({
  model: function() {
    return this.store.find('site');
  }
});

export default SitesRoute;