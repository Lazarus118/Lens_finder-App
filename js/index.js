$(document).on("pageinit", "#info-page", function() {

    var products;
    $.ajax({
        url: "products.json",
        mimeType: "application/json; charset=UTF-8",
        type: "GET",
        async: true,
        dataType: "json",
        cache: false,
        success: function(products) {
            successCallback(products);
        }
    });

    function successCallback(products) {
        var li = " ";
        $.each(products, function(i, internal) {

            li += '<li><a href="#" id="' + i + '" class="info-go"><img src="img/lens.png" alt="Lens" width="16" height="16" class="ui-li-icon ui-corner-none"><p>' + internal.internal + '</p><span class="ui-li-count" id="uiCount">' + internal.quantity + '</span></a></li>';

           // for (var x in internal.quantity) {
            //var quantity_value = internal.quantity + " ";
            //if (quantity_value) {
                $("p").css({"background": "#e74c3c", "text-shadow": "none", "color": "#ecf0f1"});
              // }
           // }
            //alert(quantity_value);
        });

        $("#prof-list").append(li).promise().done(function() {

            $(this).on("click", ".info-go", function(e) {
                e.preventDefault();
                $("#details-page").data("products", products[this.id]);
                $.mobile.changePage("#details-page");
            });
            $(this).listview("refresh");
        });
    }
});

$(document).on("pagebeforeshow", "#details-page", function() {

    //var quantity_value = products.quantity;
    //var empty_count = $(".ui-li-count").html();
    //alert(empty_count);
    //var count_value = " ";
    //var empty_count = document.getElementById(".ui-li-count").innerHTML;
    var products = $(this).data("products");
    var info_view = "";
    for (var key in products) {
        info_view += '<div class="ui-grid-a"> <div class="ui-block-a"> <div class="ui-bar field" style="font-weight:bold; text-align:center; color:#bdc3c7;">' + key + '</div> </div> <div class="ui-block-b"> <div class="ui-bar value" style="font-weight:bold; text-align:center;">' + products[key] + '</div> </div></div>';
        /*
         if (products.quantity === 0) {
         var quantity_value = products.quantity + " ";
         // } else if ((count_value === 0) && (empty_count === 0)) {
         } else if ((quantity_value === 0) && (document.getElementById(".ui-li-count").innerHTML() === 0)) {
         $(".ui-listview>li,a").css({"background": "#e74c3c", "text-shadow": "none", "color": "#ecf0f1"});
         }
         */
    }



    $(this).find(".details").html(info_view);


    $("#subtrack").click(function() {

        $.ajax({
            type: 'PUT',
            url: "products.json",
            data: JSON.stringify([{quantity: "-1"}]),
            dataType: 'json',
            processData: false,
            cache: false,
            success: function(data) {
                alert('Success');
            },
            error: function(err) {
                alert('Error');
            }
        });
    });

});