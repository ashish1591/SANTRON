Session.set("errorMessage", "");

Template.Register.created = function() {
	Session.set("errorMessage", "");	
};

Template.Register.rendered = function() {
	
	$("input[autofocus]").focus();
};

var validateEmail=function(email)
{
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
var isValidPassword=function(register_password, min_password_len)
{
	if(register_password.length<min_password_len)
		return false;
	else
		return true;
}

var getLoggedInUser=function(){
        //this for getting logged-in email in publish function.
    var user = Meteor.user();
    if (user && user.emails)
    {
        return user.emails[0].address;
    }
};


Template.Register.events({
	'click .submit' : function(e, t) {
		e.preventDefault();

		var submit_button = $(t.find(":submit"));

		// var register_name = t.find('#register_name').value.trim();
		var register_email = t.find('#register_email').value.trim();
		var register_password = t.find('#register_password').value;

		// check name
		// if(register_name == "")
		// {
		// 	Session.set("errorMessage", "Please enter your name.");
		// 	t.find('#register_name').focus();
		// 	return false;			
		// }

		// check email
		if(validateEmail(register_email)===false)
		{
			Session.set("errorMessage", "Please enter valid e-mail address.");
			t.find('#register_email').focus();
			return false;			
		}

		// check password
		var min_password_len = 6;
		if(isValidPassword(register_password, min_password_len)===false)
		{
			Session.set("errorMessage", "Your password must be at least " + min_password_len + " characters long.");
			t.find('#register_password').focus();
			return false;						
		}

		// submit_button.button("loading");
		Accounts.createUser({email: register_email, password : register_password}, function(err) {
			// submit_button.button("reset");
			if(err)
			{
				console.log("errorMessage"+err.message);
				Session.set("errorMessage",err.message);
			}
			else
			{
				// subscribeAll();
				
		      	Router.go('/');
			}
		});
		 // return false;
	},
	'click .signInBtn':function()
	{
  		Session.set("forgotPwTemplate",false);
  		Session.set("registerTemplate",false);
		Session.set("loginTemplate",true);
	},
	
});

Template.Register.helpers({
	errorMessage: function() {
		return Session.get("errorMessage");
	}, 
	
});
