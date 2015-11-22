Router.configure({
			  // we use the   template to define the layout for the entire app
	  layoutTemplate: 'materializeUI',

	  // the appNotFound template is used for unknown routes and missing lists
	  notFoundTemplate: 'appNotFound',

	  // show the appLoading template whilst the subscriptions below load their data
	  loadingTemplate: 'appLoading',
	});

	Router.map(function() {
	  this.route('/', {
	      path: '/',
	      action: function() {
		this.render('firstpage');
	      }
	  });

	   this.route('login_signInTemplate', {
	      path: '/login_signInTemplate',
	      action: function() {
		this.render('login_signInTemplate');
	      }
	  });
	   this.route('admin', {
	      path: '/admin',
	      action: function() {
				this.render('adminPanel');
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

})
