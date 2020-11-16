$(document).ready(function(){
    // TAB CODE ============================================

    $(".next").click(function(e) {
        e.preventDefault();
        var parentId = $( this ).parent().attr('id');
        if (parentId === "design-pizza") {
            console.log('were in');
            $("#design-pizza").addClass("hide");
            $("#customer-info").removeClass("hide");
        } else if ( parentId === "customer-info") {
            buildOrderConfirmation();
            $("#customer-info").addClass("hide");
            $("#order-confirmation").removeClass("hide");
        } else {
            alert("Order Confirmed");
        }
    });

    $(".back").click(function(e) {
        e.preventDefault();
        var parentId = $( this ).parent().attr('id');

        if (parentId === "customer-info") {
            $("#customer-info").addClass("hide");
            $("#design-pizza").removeClass("hide");
        } else if ( parentId === "order-confirmation") {
            $("#order-confirmation").addClass("hide");
            $("#customer-info").removeClass("hide");
        }
    });

    // PIZZA DESIGN EVENT HANDLER
    var size, crust;
    var meats = [];
    var vegetables = [];

    var priceFinder = {
        "small": 7,
        "medium": 9,
        "large": 12,
        "meats": 1.50,
        "vegetables": 1.00
    }


    // Manage order
    $('#size').change(function(){
        size = $("input[name='size']:checked").val();
        outputSubtotal(calculateTotal());
    });

    $('#crust').change(function(){
        crust = $("input[name='crusts']:checked").val();
        outputSubtotal(calculateTotal());
    });

    $('#meat').change(function(){
        meats = [];
        $('#meat [type=checkbox]:checked').each(function () {
            meats.push($(this).val());
        });
        outputSubtotal(calculateTotal());
    });

    $('#vegetables').change(function(){
        vegetables = [];
        $('#vegetables [type=checkbox]:checked').each(function () {
            vegetables.push($(this).val());
        });
        outputSubtotal(calculateTotal());
    });

    // Calculate Price
    function calculateTotal() {
        var total = 0;
        total += priceFinder[size] || 0;
        total += (priceFinder['meats'] * meats.length);
        total += (priceFinder['vegetables'] * vegetables.length);
        return total;
    }

    function outputSubtotal (subtotal) {
        buildOrderConfirmation();
       $("#subtotal").text('Subtotal: $' + subtotal);

    }

    function buildOrderConfirmation() {
        // Pizza Stuff
        $("#pizza-size").text(size).css('textTransform', 'capitalize');
        $("#pizza-crust").text(crust).css('textTransform', 'capitalize');
        // meats
        var meatsHTML = "";
        for (var i = 0; i < meats.length; i++) {
            meatsHTML += `<li>${meats[i]}</li>`;
        }
        $("#pizza-meats").html(meatsHTML);

        var vegetablesHTML = ""
        for (var j = 0; j < vegetables.length; j++) {
            vegetablesHTML += `<li>${vegetables[j]}</li>`;
        }
        $("#pizza-vegetables").html(vegetablesHTML);

        // Delivery Stuff
        $("#delivery-name").text($("#FName").val() + ' ' + $("#LName").val());
        $("#delivery-address").text($("#address").val());
        $("#delivery-city").text($("#city").val());
        $("#delivery-state").text($("#state").val());
        $("#delivery-zip").text($("#zip").val());

        $("#delivery-phone").text($("#phone").val());

        // Total Price
        var subtotal = calculateTotal();
        var tax = subtotal * .051;
        $("#subtotal-price").text(subtotal.toFixed(2));
        $("#tax").text(tax.toFixed(2));
        $("#total-price").text((subtotal + tax + 2).toFixed(2));
    }

})














// var size;
// var crust
// var meats
// var veggies
//
// var firstName;
// var lastName;
// var address;
// var phone;
//
// function updateOrder(){
//     firstName = $("#firstName").val()
//     lastName = $("#lastName").val()
//     address = $("#address").val()
//     phone = $("#phone").val()
// }
//
// function outputDetails(){
//     $("#display").text()
// }