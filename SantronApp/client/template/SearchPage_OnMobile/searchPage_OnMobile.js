Template.searchPage_OnMobile.rendered=function(){
	// $('#example-getting-started').multiselect();
};

Template.searchPage_OnMobile.helpers({
	getAllProducts:function(){
		var category=Router.current().params.category;
		var subcategory=Router.current().params.subcategory;
		subcategory=subcategory.replace('#','/');

		var search= Session.get(SEARCH_TEXT);

		if(search.length <= 0 || search === undefined)
		{
			return [];
		}
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

Template.searchPage_OnMobile.events({
	
});