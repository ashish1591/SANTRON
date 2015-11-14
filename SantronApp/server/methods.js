
var Fiber = Npm.require('fibers');
sleep =function(ms) {
    var fiber = Fiber.current;
    setTimeout(function() {
        fiber.run();
    }, ms);
    Fiber.yield();
}
Meteor.methods({
   	exceleread : function(){
   		// Items.find().forEach(function(data){ Items.remove({_id:data._id})})
      	var excel = new Excel('xls');
      	var workbook = excel.readFile('/home/ark/Downloads/Santron Product File.xls');
      	var yourSheetsName = workbook.SheetNames;
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
				    
			}).run();
    	}
    	
    }
});