Template.home.rendered=function(){
	// show and hide sub menu
    $('nav ul li').hover(
        function () {
            //show its submenu
            $('ul', this).slideDown(150);
        }, 
        function () {
            //hide its submenu
            $('ul', this).slideUp(150);         
        }
    );
}

Template.home.helpers({
    getUniqueProucts: function(){
        return getUniqueProductList();
    }
})

Template.home.events({
	'click .subCategoryBtn':function(e,t){
        var category=$(e.currentTarget).attr('category');
        var subcategory=$(e.currentTarget).attr('subcategory');
        subcategory=subcategory.replace('/','#');
        Router.go('productDetails',{category:category,subcategory:subcategory});

        $('.sublinks').removeClass('in');
        $('#overDiv').click();
        
    }
})
		
