Template.home.rendered=function(){
	
}

Template.home.helpers({

})

Template.home.events({
	'click .upload' : function(e){
        Meteor.call('exceleread', function(err,res){
            if(err)
            {
              console.log(err.message)
            }   
            else
            {
                console.log("record inserted succesfully")
            }
        });
          
  	}
})
			
