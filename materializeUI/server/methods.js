var Fiber = Npm.require('fibers');
sleep =function(ms) {
    var fiber = Fiber.current;
    setTimeout(function() {
        fiber.run();
    }, ms);
    Fiber.yield();
}
filterRecordByCategory=function(){
	var allItems=Items1.find().fetch();
    // var uniqueProductList=[]
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
            var entry={keyName:keyName,maincategory:key,subcategories:filtered_subcategories};
            uniqueProductList.upsert(entry,{$set:entry},function (err,res){
            	if(err){
            		console.log("Error>>>"+err)
            	}else{
            		console.log("Success"+res);
            	}
            })
            // uniqueProductList.push({keyName:keyName,maincategory:key,subcategories:filtered_subcategories})
        }
    });

}
Meteor.methods({
   	exceleread : function(){
      	var excel = new Excel('xls');
      	var workbook = excel.readFile('/home/ark/Downloads/Santron Product File.xls');
      	var yourSheetsName=workbook.SheetNames;
      	var res = excel.utils.sheet_to_json(workbook.Sheets[yourSheetsName[0]]);
      	if(res.length > 0)
    	{
    		
			Fiber(function() 
			{
				if(Items1.find().count()>0){
	    			Items1.remove();
					console.log("all items removed");
					console.log(Items1.find().count());
	    		}
				sleep(2000);
				for(var i = 0 ; i < res.length ; i++)
		        {
		            if(res[i]["Cost price"] && res[i]["Santron Price"])
		            {
		            	var oldData=Items1.findOne({
		            		itemName           : res[i]["Item Name (required)"],
							itemNumber         : res[i]["Item Number"],
							itemMainCategory   : res[i]["Main Category"],
							productTitle       : res[i]["Product Title"],
							itemSubCategory    : res[i]["Sub-Category"],
							productDescription : res[i]["Product Description"]
		            	});

		                if( oldData === undefined )
		                {
			                Items1.insert({
			                    lastUpdateTime     : moment().valueOf(),
			                    creationTime       : moment().valueOf(),
			                    itemName           : res[i]["Item Name (required)"],
			                    itemNumber         : res[i]["Item Number"],
			                    itemMainCategory   : res[i]["Main Category"],
			                    productDescription : res[i]["Product Description"],
			                    productTitle       : res[i]["Product Title"],
			                    productPrice       : res[i]["Santron Price"],
			                    itemSubCategory    : res[i]["Sub-Category"]
			                },function(error,result){
			                	if(error)
			                	{
			                		console.log(error.message);
			                	}else
			                	{
			                	}
			                })
		                }
		                else if(oldData)
		                {
		                	Items1.update( oldData._id,{$set:{
		                		lastUpdateTime     : moment().valueOf(),
			                    productDescription : res[i]["Product Description"],
			                    productPrice       : res[i]["Santron Price"],
		                	}})
		                }
		            }

		        }
		        sleep(2000);
		        filterRecordByCategory();
		        console.log("UPLOAD COMPLETE");
		        console.log(Items1.find().count());
				    
			}).run();
    	}
    	
    },
    isAdmin:function(userId){
		var user=Meteor.users.findOne({_id:userId});
		console.log(user);
		if(user && user.emails && user.emails[0]){
			email=user.email[0].address;
			if(email==="admin@codehr.com")
				return true;
			else
				return false;
		}
		return false;
	}
});