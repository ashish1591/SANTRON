

var validateEmail=function(email)
{
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

Template.ForgotPassword.created = function() {
	Session.set("errorMessage", "");
	Session.set("resetPasswordSent", "");
}

Template.ForgotPassword.rendered = function() {
	$("input[autofocus]").focus();
};

Template.ForgotPassword.events({
	// send reset password link
	'click .submit' : function(e, t) {
		e.preventDefault();

		var submit_button = $(t.find(":submit"));
		var reset_email = t.find('#reset_email').value.trim();

		// check email
		if(validateEmail(reset_email)===false)
		{
			Session.set("errorMessage", "Please enter your e-mail address.");
			t.find('#reset_email').focus();
			return false;
		}

		// submit_button.button("loading");
		Accounts.forgotPassword({email: reset_email}, function(err) {
			// submit_button.button("reset");
			if (err)
				Session.set("errorMessage", err.message);
			else
			{
				Session.set("errorMessage", "");
				Session.set("resetPasswordSent", true);				
			}
		});

		return false; 
	},

	// button "OK" in information box after reset password email is sent
	'click #reset_password_sent' : function(e, t) {
		Session.set("resetPasswordSent", false);
		return true;
	}, 
	'click .pathForLogin':function(event,Template)
	{
		Session.set("loginTemplate",true);
		Session.set("forgotPwTemplate",false);
		Session.set("registerTemplate",false);
	},
	'click .signInBtn':function()
	{
  		Session.set("forgotPwTemplate",false);
  		Session.set("registerTemplate",false);
		Session.set("loginTemplate",true);
	},
	
});

Template.ForgotPassword.helpers({
	errorMessage: function() {
		return Session.get("errorMessage");
	},

	resetPasswordSent: function() {
		return Session.get("resetPasswordSent");
	}, 
	
});
