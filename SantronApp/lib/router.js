
// Router.onBeforeAction(function(){
// },
// {except: ['login_signInTemplate'] });


var mustBeSignedIn = function() {
    if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('login_signInTemplate');
    }
};

Router.onBeforeAction(mustBeSignedIn, {except: ['login_signInTemplate']});

Router.configure({
	// we use the   template to define the layout for the entire app
	layoutTemplate: 'santronPricingUpload',

	// the appNotFound template is used for unknown routes and missing lists
	notFoundTemplate: 'appNotFound',

	// show the appLoading template whilst the subscriptions below load their data
	loadingTemplate: 'appLoading',
	
	});

	Router.map(function() {
	    this.route('/', {
	        path: '/',
	        action: function() 
	        {
				this.render('home');
		    }
		});
		
 		this.route('login_signInTemplate', {
	        path: '/login_signInTemplate',
	        action: function() 
	        {
				this.render('login_signInTemplate');
		    }
		});

		this.route('/admin', {
	        path: '/admin',
	        action: function() 
	        {
				this.render('adminPanel');
		    }
		});

		this.route('visitSite', {
	        path: '/visitSite/:productId',
	        action: function() 
	        {
				this.render('officialSite');
		    },
		    data: function () { 
		      	return {
		        	productId: this.params.productId
		      	}
		    }
		});

		this.route('goToSearchPage_OnMobile', {
	        path: '/Search/:category/:subcategory',
	        action: function() 
	        {
				this.render('searchPage_OnMobile');
		    },
		    data: function () { 
		      	return {
		        	category: this.params.category,
		        	subcategory:this.params.subcategory,
		      	}
		    }
		});


	    this.route('productDetails',{
		    path: "/productDetails/:category/:subcategory",
		    action: function() {
		      this.render('productDetails');
		    },
		    data: function () { 
		      	return {
		        	category: this.params.category,
		        	subcategory:this.params.subcategory,
		      	}
		    }
		});

})
