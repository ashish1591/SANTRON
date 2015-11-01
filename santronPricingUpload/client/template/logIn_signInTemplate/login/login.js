// Session.set("errorMessage", "");

Template.Login.rendered = function() {
	$("input[autofocus]").focus();
};

Template.Login.created = function() {
	Session.set("errorMessage", "");	
};
var validateEmail=function(email)
{
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

var getLoggedInUser=function(){
        //this for getting logged-in email in publish function.
    var user = Meteor.user();
    if (user && user.emails)
    {
        return user.emails[0].address;
    }
};



Template.Login.events({
	'click .submit' : function(e, t) {
		e.preventDefault();

		var submit_button = $(t.find(":submit"));

		var login_email = t.find('#login_email').value.trim();
		var login_password = t.find('#login_password').value;

		// check email
		if(validateEmail(login_email)===false)
		{
			Session.set("errorMessage", "Please enter your e-mail address.");
			t.find('#login_email').focus();
			return false;
		}

		// check password
		if(login_password == "")
		{
			Session.set("errorMessage", "Please enter your password.");
			t.find('#login_email').focus();
			return false;
		}

		// submit_button.button("loading");
		Meteor.loginWithPassword(login_email, login_password, function(err) {
			// submit_button.button("reset");
			if (err)
			{
				console.log('error='+err.message);
				Session.set("errorMessage", err.message);
				return false;
			}
			else
			{
				
				// subscribeAll();
				
				Router.go('/admin');
			}
		});
		return false; 
	},
	'click .signUpBtn':function()
	{
		Session.set("loginTemplate",false);
  		Session.set("registerTemplate",true);
  		Session.set("forgotPwTemplate",false);
  		Session.set("resetPwd",false);
	},
	'click .forgotPwBtn':function()
	{
		Session.set("loginTemplate",false);
  		Session.set("registerTemplate",false);	
  		Session.set("forgotPwTemplate",true);
  		Session.set("resetPwd",false);
  	},
});

Template.Login.helpers({
	errorMessage: function() {
		return Session.get("errorMessage");
	}, 
	isOnPhone:function(){
		return Meteor.isCordova;
	}
});
