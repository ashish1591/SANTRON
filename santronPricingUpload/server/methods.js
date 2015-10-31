Meteor.methods({
   	exceleread : function(){
   		console.log("CALLED");	
      	var excel = new Excel('xls');
      	var workbook = excel.readFile('/home/ark/Downloads/Santron Product File.xls');
      	var yourSheetsName = workbook.SheetNames;
      	var res = excel.utils.sheet_to_json(workbook.Sheets[yourSheetsName[0]]);

      	if(res.length > 0)
    	{
	        for(var i = 0 ; i < res.length ; i++)
	        {
	            if(res[i]["Cost price"] && res[i]["Santron Price"])
	            {
	            	// var chkExist=Categories.findOne({maincategory:})
	            	var oldData=Items.findOne({
	            		itemName           : res[i]["Item Name (required)"],
						itemNumber         : res[i]["Item Number"],
						itemMainCategory   : res[i]["Main Category"],
						productTitle       : res[i]["Product Title"],
						itemSubCategory    : res[i]["Sub-Category"]
	            	});

	                if( oldData === undefined )
	                {
		                Items.insert({
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
		                		console.log(error.message)
		                	}
		                	else
		                	{
		                		// console.log(res[i]["No"])
		                	}
		                })
	                }
	                else
	                {
	                	Items.update( oldData._id,{$set:{
	                		lastUpdateTime     : moment().valueOf(),
		                    productDescription : res[i]["Product Description"],
		                    productPrice       : res[i]["Santron Price"],
	                	}})
	                	// console.log(i+1)
	                }
	            }
	        }
    	}
    }
});