
Router.onBeforeAction(function(){
	if(!Meteor.user())
	{
			Router.go('/')
	}
},
{except: ['login_signInTemplate'] });


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
