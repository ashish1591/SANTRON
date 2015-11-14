Template.productDetails.rendered=function(){
	// $('#example-getting-started').multiselect();
	Session.set("SELECTED_BRANDS",'');
};

Template.productDetails.helpers({
	getAllProducts:function(){
		var category=Router.current().params.category;
		var subcategory=Router.current().params.subcategory;
		subcategory=subcategory.replace('#','/')
		var selectedProductItems=Session.get("SELECTED_BRANDS")
		if(selectedProductItems && selectedProductItems.length>0)
		{
			var result=Items1.find({itemMainCategory:category,itemSubCategory:subcategory,productTitle:{$in:selectedProductItems}}).fetch();
		}
		else
		{
			var result=Items1.find({itemMainCategory:category,itemSubCategory:subcategory}).fetch();
		}
		if(result)
		{
			return result;
		}

		return [];
	},

	isOnPhone:function(){
		return Meteor.isCordova;
	},
});

Template.productDetails.events({
	
});