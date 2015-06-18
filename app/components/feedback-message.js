import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['alert', 'alert-dismissible','message-box'],
	classNameBindings:["bootstrapType", "isShowed:in"],
	isShowed:true,
	hasCloseButton:true,
	timer:null,
	timerId:null,
	type:"info",
	bootstrapType:function (){
		var tag="success";
		var type=this.get('type').toLowerCase();
		if (type=="error"){
			tag="danger"
		} else if (type=="warning"){
			tag="warning"
		}
		return "alert-"+tag;
	}.property('type'),
	showObserver: function (){
		if (this.get('isShowed')==true){
			var _this=this;
			var timer=this.get('timer');
			if (parseInt(timer)>0){
				var tId=Ember.run.later(function (){
					_this.hide();
					_this.set('timerId', null);
				}, parseInt(timer)*1000);
				this.set('timerId', tId);
			} else {
				this.set('timerId', null);
			}
		} else {
			var timerId=this.get('timerId');
			if (timerId!==null){
				Ember.run.cancel(timerId);
			}
		}
	}.observes('isShowed'),
	hide: function (){
		this.set('isShowed', false);
	},
	actions: {
		hide: function (){
			this.hide();
		}
	}
});
