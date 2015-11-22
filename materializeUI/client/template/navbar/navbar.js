Template.logoutBtn.rendered=function(){
	$('.dropdown-button').dropdown({
       inDuration: 300,
       outDuration: 225,
       constrain_width: true, 
       hover: false, 
       gutter: 0, 
       belowOrigin: false 
       }
    );
}
Template.logoutBtn.events({
	'click .logout-btn':function(e,t){
		Meteor.logout();
		$('.button-collapse').sideNav('hide');
	}
})
Template.logoutBtn.helpers({
	getUserName:function(){
		if(Meteor.user()){
			if(Meteor.user().emails && Meteor.user().emails[0]){
				return Meteor.user().emails[0].address;
			}
		}
	}
})
Template.navbar.helpers({
	getUniqueProucts:function(){
		return uniqueProductList.find({},{sort:{maincategory:1}}).fetch();
	},
	isUserAdmin:function(){
		// Meteor.call('isAdmin',Meteor.userId(),function(err,res){
		// 	console.log(err);
		// 	console.log(res);
		// 	return res;
		// })
	}
})

Template.navbar.rendered=function(){
	$('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
    // $('.dropdown-button').click(function(){
    // 	console.log(this);
    // 	$(this).dropdown();
    // })
	
}

Template.navbar.events({
	'click .signUp-btn':function(e,t){
		Session.set("loginTemplate",false);
	  	Session.set("registerTemplate",true);
	  	Session.set("forgotPwTemplate",false);

		Router.go('login_signInTemplate');
		$('.button-collapse').sideNav('hide');
	},	
	'click .signin-btn':function(e,t){
		Session.set("loginTemplate",true);
	  	Session.set("registerTemplate",false);
	  	Session.set("forgotPwTemplate",false);

		Router.go('login_signInTemplate');
		$('.button-collapse').sideNav('hide');
	},
	'click .logout-btn':function(e,t){
		Meteor.logout();
		$('.button-collapse').sideNav('hide');
	},
	'click .subCategoryBtn':function(e,t){
		var category=$(e.currentTarget).attr('category');
		var subcategory=$(e.currentTarget).attr('subcategory');
		subcategory=subcategory.replace('/','#');
		Router.go('productDetails',{category:category,subcategory:subcategory});
		$('.button-collapse').sideNav('hide');

		
	},
	'keyup #search':function(){
  		Session.set(SEARCH_TEXT, $('#search').val() );
  	},
  	'click .closeSearch':function(){
  		Session.set(SEARCH_TEXT, '' );
  		$('#search').val('')
  	},
});

Template.mainMenu.helpers({
	getUniqueProucts:function(){
		return uniqueProductList.find({},{sort:{maincategory:1}}).fetch();
	}
});

Template.mainMenu.rendered=function(){
	// $('#mainMenu nav ul li').hover(
 //        function () {
 //            //show its submenu
 //            $('ul', this).slideDown(100);
 //        }, 
 //        function () {
 //            //hide its submenu
 //            $('ul', this).slideUp(100);         
 //        }
 //    );

 	$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'centre' // Displays dropdown with edge aligned to the left of button
    }
  );
}
Template.mainMenu.helpers({
	removeNonAlphaNumericChar:function(name){
		return name.replace(/[^A-Za-z0-9]/g, '');
	}
})

Template.mainMenu.events({
	'click .subCategoryBtn':function(e,t){
		var category=$(e.currentTarget).attr('category');
		var subcategory=$(e.currentTarget).attr('subcategory');
		subcategory=subcategory.replace('/','#');
		Router.go('productDetails',{category:category,subcategory:subcategory});
		$('.button-collapse').sideNav('hide');

		
	}
})
