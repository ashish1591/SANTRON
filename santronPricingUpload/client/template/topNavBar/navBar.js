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