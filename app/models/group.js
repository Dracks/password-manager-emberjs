
import DS from 'ember-data';

export default DS.Model.extend({
  parent: DS.belongsTo('group'),
  name: DS.attr('string')
});