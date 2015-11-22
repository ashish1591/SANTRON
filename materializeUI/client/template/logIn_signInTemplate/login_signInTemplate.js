var setHeight=function(){
	var halfHeight=$( window ).height()/2;
	$('#infoTemplate').css('height', halfHeight+'px');
	$('#imageHeight').css('height', (halfHeight-20)+'px','width',(halfHeight-20)+'px');
}

Template.login_signInTemplate.rendered=function(){
	// Session.set("loginTemplate",true);
 //  	Session.set("registerTemplate",false);
 //  	Session.set("forgotPwTemplate",false);

 //  	setHeight();

	// $( window ).resize(function() {
	//   setHeight();
	// });

}

Template.login_signInTemplate.helpers({
	loginTemplate:function(){
	    return Session.get("loginTemplate");
	},

	registerTemplate:function(){
	    return Session.get("registerTemplate");
	},

	forgotPwTemplate:function(){
	    return Session.get("forgotPwTemplate");
	},
});