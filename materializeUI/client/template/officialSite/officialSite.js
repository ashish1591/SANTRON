Template.officialSite.rendered=function(){
	$('iframe').css('pointer-events','none')
}

Template.officialSite.helpers({
	getProductLink:function(){
		var productId=Router.current().params.productId;
		if(productId && Items1.findOne({_id:productId}).link)
			return Items1.findOne({_id:productId}).link;
		return "https://www.google.co.in/"
	}
});

Template.officialSite.events({
	
});