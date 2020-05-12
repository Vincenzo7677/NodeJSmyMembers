$(document).ready(function(){
    $(".delete-member").on("click", function(e){
       $target = $(e.target);
       const id = $target.attr("data-id");
       $.ajax({
           type: "DELETE",
           url: "/member/" + id,
           success: function(response){
                alert("Deleting Member");
               window.location.href= "/";
           },
           error: function(err){
               console.log(err)
           }
       });
    });
});