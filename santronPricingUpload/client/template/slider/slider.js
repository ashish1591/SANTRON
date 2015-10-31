Template.slider.rendered = function(){
	// $('.mainCategoryBtn').click(function(){
	// 	console.log($(this));	
	// })

	$('.mainCategoryBtn').click(function(){
		$('.mainCategoryBtn').removeClass('drop');
        $(this).addClass('drop');
	})
};

Template.slider.helpers({
	getApplicationName:function(){
		return "Santron Computers";
	},

	remove_space : function(label)
	{
		if(label)
		{
			return label.replace(/ +/g, "");
		}
	},
	getUniqueProucts: function(){
		return getUniqueProductList();
	}
	// userProfilePic:function(){
	// 	var profileData=Meteor.user();
	// 	if(profileData && profileData.profile)
	// 	{
	// 		return Documents.find({_id: profileData.profile[0].image});
	// 	}
	// 	return false;
	// }

});

Template.slider.events({
	'click .titleClick':function(){
		Router.go('/');
		$('#overDiv').click();
	},

	'click .logout':function(){
		Meteor.logout();
		$('#overDiv').click();
	},

	'click .subCategoryBtn':function(e,t){
		var category=$(e.currentTarget).attr('category');
		var subcategory=$(e.currentTarget).attr('subcategory');
		subcategory=subcategory.replace('/','#');
		Router.go('productDetails',{category:category,subcategory:subcategory});

		$('.sublinks').removeClass('in');
		$('#overDiv').click();
		
	}
});