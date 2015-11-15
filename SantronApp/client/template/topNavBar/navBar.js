Template.navBar.rendered=function(){
	// Session.set(TOGGLE_SEARCH_PANEL,true);
	// Session.set(SEARCH_TEXT,"");
}

Template.navBar.helpers({

	getToggleSearchValue:function(){
		return Session.get(TOGGLE_SEARCH_PANEL);
	},

	isOnPhone:function(){
		return Meteor.isCordova;
	},

	isOnHomePage:function(){
		if(Router.current().path === "/")
		{
			return true;
		}
		return false;
	},
})

Template.navBar.events({

})

Template.nav.rendered=function(){
	toggleNavBar();
}

Template.nav.helpers({
	getApplicationName:function(){
		return "Santron Computers";
		// var routerPath=Router.current().path.split("/")[1];
		// switch(routerPath)
		// {
		// 	case "":
		// 		break;

		// 	case "GroupDetails":
		// 		var groupListData=GroupList.findOne({_id:Router.current().params.groupId});
		// 		if(groupListData)
		// 		{
		// 			return groupListData.group_name;
		// 		}
		// 		break;

		// 	case "profilePage":
		// 		return "My Profile";
		// 		break;
		// }
	},
	
	isOnPhone:function(){
		return Meteor.isCordova;
	},
})

Template.nav.events({
	'click .navbarTitle':function(event,template){
		Router.go('/');
	},

	'click .searchClick':function(event,template){
		// $('#overDivCSSWhenSearchOnMobile').fadeIn();
		Session.set(TOGGLE_SEARCH_PANEL,false);
	},
	'click .logout':function(){
		Meteor.logout();
		Router.go('/');
	},
})

Template.searchPanel.rendered=function(){
	$('#txtSearchBox').focus();
}

Template.searchPanel.events({
	'keyup #txtSearchBox':function(){
		Session.set(SEARCH_TEXT, $('#txtSearchBox').val() );
	},

	'click .clearSearchSession':function(){
		Session.set(SEARCH_TEXT,"");
		$('#txtSearchBox').val("");
	},

	'click .backFromSearch':function(){
		// $('#overDivCSSWhenSearchOnMobile').fadeOut();
		Session.set(TOGGLE_SEARCH_PANEL,true);
		Session.set(SEARCH_TEXT,"");
	},
})

Template.mainMenu.rendered=function(){
	$('nav ul li').hover(
        function () {
            //show its submenu
            $('ul', this).slideDown(150);
        }, 
        function () {
            //hide its submenu
            $('ul', this).slideUp(150);         
        }
    );
}

Template.mainMenu.helpers({
	getUniqueProucts: function(){
        return getUniqueProductList();
    },
})

Template.mainMenu.events({
	'click .subCategoryBtn':function(e,t){
        var category=$(e.currentTarget).attr('category');
        var subcategory=$(e.currentTarget).attr('subcategory');
        subcategory=subcategory.replace('/','#');
        Router.go('productDetails',{category:category,subcategory:subcategory});

        $('.sublinks').removeClass('in');
        $('#overDiv').click();
        
    }
})



Template.productDetailsMenu.helpers({
	getFilterComponents:function(){
		var category=Router.current().params.category;
		var subcategory=Router.current().params.subcategory;
		if(category === undefined || subcategory === undefined)
		{
			return ;
		}

		subcategory=subcategory.replace('#','/')
		var items=Items1.find({itemMainCategory:category,itemSubCategory:subcategory}).fetch();
		var result=_.groupBy(items,'productTitle');
		var companiesList=[];
		_.each(result,function(value1,key1){
	    	companiesList.push(key1);
	    })

	    var maxPrice=_.max(items, function(items){ return items.productPrice; });
	    var minPrice=_.min(items, function(items){ return items.productPrice; });

	    return {companies:companiesList,min:minPrice.productPrice,max:maxPrice.productPrice};
	},
})

Template.productDetailsMenu.events({
	'click .checkboxList':function(e,t){
		Session.set("SELECTED_BRANDS",'');		
		var selected=[];
		$('.checkboxList').each(function () {
           if (this.checked) {
               selected.push($(this).val()); 
           }
		});
		Session.set("SELECTED_BRANDS",selected);
	}
})