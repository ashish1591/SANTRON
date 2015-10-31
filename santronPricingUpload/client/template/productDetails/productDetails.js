Template.productDetails.rendered=function(){
	// $('#example-getting-started').multiselect();
	Session.set("SELECTED_BRANDS",'');
};
Template.productDetails.helpers({
	getAllProducts:function(){
		var category=Router.current().params.category;
		var subcategory=Router.current().params.subcategory;
		subcategory=subcategory.replace('#','/')
		var selectedProductItems=Session.get("SELECTED_BRANDS")
		if(selectedProductItems)
		{
			var result=Items.find({itemMainCategory:category,itemSubCategory:subcategory,productTitle:{$in:selectedProductItems}}).fetch();
		}
		else
		{
			var result=Items.find({itemMainCategory:category,itemSubCategory:subcategory}).fetch();
		}
		if(result)
		{
			return result;
		}

		return [];
	},

	getFilterComponents:function(){
		var category=Router.current().params.category;
		var subcategory=Router.current().params.subcategory;
		subcategory=subcategory.replace('#','/')
		var items=Items.find({itemMainCategory:category,itemSubCategory:subcategory}).fetch();
		var result=_.groupBy(items,'productTitle');
		var companiesList=[];
		_.each(result,function(value1,key1){
        	companiesList.push(key1);
        })

        var maxPrice=_.max(items, function(items){ return items.productPrice; });
        var minPrice=_.min(items, function(items){ return items.productPrice; });

        return {companies:companiesList,min:minPrice.productPrice,max:maxPrice.productPrice};
	}
});

Template.productDetails.events({
	'click #filter':function(e,t){
		Session.set("SELECTED_BRANDS",'');		
		var selected=[]
		$('.checkboxList').each(function () {
           if (this.checked) {
               selected.push($(this).val()); 
           }
		});
		Session.set("SELECTED_BRANDS",selected);
	}
});