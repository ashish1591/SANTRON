Meteor.methods({
   	exceleread : function(){
   		console.log("CALLED");	
      	var excel = new Excel('xls');
      	var workbook = excel.readFile('/home/ark/Downloads/Santron Product File.xls');
      	var yourSheetsName = workbook.SheetNames;
      	var res = excel.utils.sheet_to_json(workbook.Sheets[yourSheetsName[0]]);
      	var count=0;
      	var count1=0;
      	var insertStatements=[];
      	var updateStatements=[];
      	if(res.length > 0)
    	{
	        for(var i = 0 ; i < res.length ; i++)
	        {
	            if(res[i]["Cost price"] && res[i]["Santron Price"])
	            {
	            	var oldData=Items.findOne({
	            		itemName           : res[i]["Item Name (required)"],
						itemNumber         : res[i]["Item Number"],
						itemMainCategory   : res[i]["Main Category"],
						productTitle       : res[i]["Product Title"],
						itemSubCategory    : res[i]["Sub-Category"],
						productDescription : res[i]["Product Description"]
	            	});
	                if( oldData === undefined )
	                {
	                	count++;
	                	// console.log("BEFORE INSERT&&&&&&&&&&&&&&&&&&&&&&&&&");
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
		                		// count++
		                		// console.log("error");
		                		// console.log(error);
		                		// console.log(count);
		                		// console.log("error>>>>>>>>>>>>>>>");

		                	}else
		                	{
		                		// count1++
		                		// console.log("success");
		                		// console.log(result);
		                		// console.log(count1);
		                		// console.log("success>>>>>>>>>>>>>>>");
		                	}
		                })
	                }
	                else
	                {
	                	count1++;
	                	console.log("DATA EXIST>>>>>>>>>>>>>>>>>")
	                	console.log(JSON.stringify(oldData));
	                	// Items.update( oldData._id,{$set:{
	                	// 	lastUpdateTime     : moment().valueOf(),
		                //     productDescription : res[i]["Product Description"],
		                //     productPrice       : res[i]["Santron Price"],
	                	// }})
	                	// updateStatements.push("Items.update( oldData._id,{$set:{
	                	// 	                		lastUpdateTime     : moment().valueOf(),
	                	// 		                    productDescription : res[i]['Product Description'],
	                	// 		                    productPrice       : res[i]['Santron Price'],
	                	// 	                	}})");
	                	// console.log(i+1)
	                }
	            }
	        }
	        console.log("RESULT insertStatements>>>>>>")
      		console.log(count);
      		// console.log(insertStatements.length);
      		console.log("RESULT updateStatements>>>>>>")
      		console.log(count1);
      		// console.log(updateStatements.length);
    	}
    }
});