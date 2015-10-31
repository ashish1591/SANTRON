toggleNavBar = function(){

    var menuLeft = document.getElementById( 'cbp-spmenu-s1' );
    var showLeft = document.getElementById( 'showLeft' );
    var body = document.getElementById( 'bodyDIV' );

    if( showLeft === null && menuLeft === null)
    { 
        return ;
    };

    showLeft.onclick = function() {
      $('#overDiv').fadeIn();
      classie.toggle( this, 'active' );
      classie.toggle( menuLeft, 'cbp-spmenu-open' );
    };

    bodyDIV.onclick = function(event) {
      if(event.target.value === undefined){
        $('#overDiv').fadeOut();
        classie.toggle( this, 'active' );
        classie.remove( body, 'cbp-spmenu-push-toright' );
        if(menuLeft){
          classie.remove( menuLeft, 'cbp-spmenu-open' );
        }
      }
    };

};
getUniqueProductList=function(){
    var allItems=Items.find().fetch();
    var uniqueProductList=[]
    var mainCategory=_.groupBy(allItems,'itemMainCategory')
    _.each(mainCategory, function(value, key) {
        if(key){
            var subcategories=_.groupBy(value,'itemSubCategory')


            var filtered_subcategories=[]
            _.each(subcategories,function(value1,key1){
            filtered_subcategories.push(key1);
            })
            var keyName=key.replace(/\s/g, '');
            keyName=keyName.replace('&','');
            uniqueProductList.push({keyName:keyName,maincategory:key,subcategories:filtered_subcategories})
        }
    });
    return uniqueProductList;
};
getLoggedInEmail=function(userId){
    var user = Meteor.user();
    if (user && user.emails)
    {
        return user.emails[0].address;
    }
    return "";
};  
