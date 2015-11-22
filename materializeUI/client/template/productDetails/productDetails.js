Template.productDetails.rendered=function(){
	// $('#example-getting-started').multiselect();
	Session.set("SELECTED_BRANDS",'');
	Session.set("SEARCH_TEXT",'');
};

Template.productDetails.helpers({
	getAllProducts:function(){
		var category=Router.current().params.category;
		var subcategory=Router.current().params.subcategory;
		subcategory=subcategory.replace('#','/');

		var search= Session.get(SEARCH_TEXT);

		if(search=="" || search===undefined)
		{
			var selectedProductItems=Session.get("SELECTED_BRANDS");
			if(selectedProductItems && selectedProductItems.length>0)
			{
				var result=Items1.find({itemMainCategory:category,itemSubCategory:subcategory,productTitle:{$in:selectedProductItems}}).fetch();
			}
			else
			{
				var result=Items1.find({itemMainCategory:category,itemSubCategory:subcategory}).fetch();
			}
		}
		else
		{
			var pattern=""+search;
			var result=Items1.find({ 
				$and:
				  [
					{ 
						itemMainCategory:category,
						itemSubCategory:subcategory
					},
					{
						$or : 
							[
								{ itemName: { $regex: pattern, $options: 'i' } },
								{ itemNumber: { $regex: pattern, $options: 'i' } }
							]
					}
				  ]
			},{sort:{creationTime:-1}}).fetch();
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
	'click .productDiscription':function(event,template){
		console.log(this);
		Router.go('visitSite',{productId:this._id});
	}
});