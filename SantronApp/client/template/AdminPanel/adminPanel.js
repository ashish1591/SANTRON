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
	resetActive();
	hideSteps();
	showCurrentStepInfo();

}

Template.adminPanel.events({
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
          
    },
    'click tbody > tr': function (event,temp) {
      // var dataTable = $(event.target).closest('table').DataTable();
      // var rowData = dataTable.row(event.currentTarget).data();
        var tr = $(event.currentTarget).closest('tr');
        var table = tr.closest('table').DataTable();
        var row = table.row(tr);
        console.log(row);
    }
})