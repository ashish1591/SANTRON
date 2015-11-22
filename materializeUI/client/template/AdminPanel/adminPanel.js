resetActive=function(event, percent, step) {
    if(event === undefined)
    {
        return;
    }

    $(".progress-bar").css("width", percent + "%").attr("aria-valuenow", percent);
    $(".progress-completed").text(percent + "%");

    $("div").each(function () {
        if ($(this).hasClass("activestep")) {
            $(this).removeClass("activestep");
        }
    });

    if (event.target.className == "col-md-2") {
        $(event.target).addClass("activestep");
    }
    else {
        $(event.target.parentNode).addClass("activestep");
    }

    hideSteps();
    showCurrentStepInfo(step);
}

hideSteps=function() {
    $("div").each(function () {
        if ($(this).hasClass("activeStepInfo")) {
            $(this).removeClass("activeStepInfo");
            $(this).addClass("hiddenStepInfo");
        }
    });
}

showCurrentStepInfo=function(step) {        
    var id = "#" + step;
    $(id).addClass("activeStepInfo");
}

Template.adminPanel.rendered=function(){
    Session.set('ISDATALOADING',false);
    $('#mainMenu').css('display','none');
	resetActive();
    hideSteps();
    showCurrentStepInfo();
   

}

Template.adminPanel.helpers({
    settings: function () {
        return {
            collection: Items1,
            rowsPerPage: 10,
            showFilter: true,
            fields: ['productTitle', 'itemName','itemMainCategory','itemSubCategory','productDescription','productPrice']
        };
    },
    dataIsLoading: function(){
        return Session.get('ISDATALOADING');
    }
})

Template.adminPanel.events({
    'click .upload' : function(e){
        Session.set('ISDATALOADING',true);
        Meteor.call('exceleread', function(err,res){
            if(err)
            {
              console.log(err)
            }   
            else
            {
                console.log("record inserted succesfully");
                Session.set('ISDATALOADING',false);
            }
        });
          
    },
    'click .reactive-table tbody tr': function (event) {
        // set the blog post we'll display details and news for
        var post = this;
        console.log(post);
        // Session.set('post', post);
      }
    // 'change #file-uploader':function(event,temp) {
    //     var file;
    //     file = new FS.File(document.getElementById('file-uploader').files[0]);  
    //     file.userId=Meteor.userId();
    //     file.createdAt=moment().valueOf();
    //     console.log(file)
    //     assetFiles.insert(file,function(err,res){
    //         if(err){
    //             console.log("Error");
    //             console.log(err);
    //         }else{
    //             console.log(res);
    //             Meteor.call('exceleread')
    //         }
    //     });

    // }
})