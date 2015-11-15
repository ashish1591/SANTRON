
Template.santronPricingUpload.helpers({
	isOnAdminPage:function() {
		return Router.current().path === "/admin" || Router.current().path.split("/")[1] === "Search";
	}
})