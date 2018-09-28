// $(document).ready(function(){
//     $.get("/articles")
//     .then(function(data){
//         console.log(data);
//         if(data.length != 0) {
//             $("no-articles").empty();
//         }
//     })
// })

$("#scrape").on("click", function(event){
    $.ajax({
        method: "GET",
        url: "/scrape",
    }).done(function(data){
        console.log(data)
        window.location = "/"
    })
});