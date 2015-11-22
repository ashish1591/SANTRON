Template.officialSite.rendered=function(){
	$('iframe').css('pointer-events','none')
}

Template.officialSite.helpers({
	getProductLink:function(){
		var productId=Router.current().params.productId;
		if(productId)
			return Items1.findOne({_id:productId}).link;
		return ""
	}
});

Template.officialSite.events({
	
});