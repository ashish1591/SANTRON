
Template.santronPricingUpload.helpers({
	isOnAdminPage:function() {
		return Router.current().path === "/admin";
	}
})