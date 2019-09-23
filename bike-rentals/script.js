$(function() {
    $.getJSON('https://jameskrizan.com/bike-rentals/bikerentals.json', function(data) {
        $.each(data.products, function(i, prod) {
            $('#products').append('<article class="row my-4 align-items-center ' + prod.product_type + '"><section class="col-md-2 text-center text-md-left"><img src="' + prod.image + '" alt=""/></section><section class="col-md-6"><h2 class="item-name">' + prod.name + '</h2><h3 class="item-price text-muted text-center text-md-left">' + prod.price + '</h3></section><section class="col-md-2 text-center text-md-left"><h3 class="quantity"><span class="quantity-subtract">- </span><span class="quantity-num">0</span><span class="quantity-add"> +</span></h3></section><section class="col-md-2 text-right text-md-left"><h2 class="item-total">0.00</h2></section></article>');
        });
        formatPrices();
        addListeners();
    });
});

function formatPrices() {
    $('.item-price').each(function() {
        $(this).text(Number($(this).text()).toFixed(2));
    });
}

function changeVal(num) {
    var quantity = parseInt(num.parent().children(".quantity-num").text());
    var price = parseFloat(num.parent().parent().parent().find(".item-price").text());

    num.parent().parent().parent().find(".item-total").text((price * quantity).toFixed(2));

    changeTotal();
}

function changeTotal() {
    var subTotal = 0;

    $('.item-total').each(function() {
        subTotal += parseFloat($(this).text());
    });

    $('#cart-subtotal').text(subTotal.toFixed(2));
}

function addListeners() {
    $('.quantity-add').click(function() {
        $(this).parent().children(".quantity-num").text(parseInt($(this).parent().children(".quantity-num").text()) + 1);

        changeVal($(this));
    });
    $(".quantity-subtract").click(function() {
        num = $(this).parent().children(".quantity-num");

        if (parseInt(num.text()) > 0) {
            num.text(parseInt(num.html()) - 1);
            changeVal($(this));
        }
    });
}

function checkOut() {
    var noBike = true;
    $('#item-list').html('');

    $('.bike').each(function() {
        if (parseInt($(this).find('.quantity-num').text()) > 0) {
            noBike = false;
        }
    });

    if (noBike) {
        alert("You must have at least one bike in your cart!");
    } else {
        subTotal = 0;

        $('#products article').each(function() {
            const itemPrice = parseFloat($(this).find('.item-total').text());

            if (itemPrice > 0) {
                subTotal += itemPrice;
                $('#item-list').append('<article class="row"><section class="col"><p><strong>' + $(this).find('.item-name').text() + '</strong>  -  <span class="no-wrap">' + $(this).find('.quantity-num').text() + ' x $' + $(this).find('.item-price').text() + '</p></section><section class="col text-right"><p>$' + itemPrice.toFixed(2) + '</span></p></section></article>');
            }
        });

        var tax = Math.round((subTotal * 0.0875) * 100) / 100;
        var total = Math.round((subTotal + tax) * 100) / 100;

        $('#checkout-subtotal').text(subTotal.toFixed(2));
        $('#checkout-tax').text(tax.toFixed(2));
        $('#checkout-total').text(total.toFixed(2));

        $('#checkout-page').show(500);
        $([document.documentElement, document.body]).animate({
            scrollTop: $('#checkout-page').offset().top
        }, 1000);
    }
}

function confirmRental() {
    alert("Thanks for your business!");
    location.reload(true);
}