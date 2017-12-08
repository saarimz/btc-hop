$(function () {


    var getPriceButton = $("#get_price");
    var currentPriceView = $("#price_now");
    var priceView = $("#price");
    var selectedValue = $("#year_selector");
    var yearsAgo = selectedValue.val();

    var numberWithCommas = function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    var getPrice = function (years) {
        var currentDate = new Date(Date.now());
        var selectedYear = currentDate.getFullYear() - Number(years);
        var selectedMonth = currentDate.getMonth() + 1;
        var selectedDay = currentDate.getDate();
        var selectedDateString = [selectedYear,selectedMonth,selectedDay].join("-");
        var selectedDate = new Date(selectedDateString).toISOString().split('T')[0];
        var url = "https://api.coindesk.com/v1/bpi/historical/close.json?start=" + selectedDate + "&end=" + selectedDate;
        var data;

        $.getJSON(url).done(function(response){
            data = numberWithCommas(Object.values(response.bpi)[0].toFixed(2));
            priceView.html(data);
        });
    };

    var getCurrentPrice = function() {
        var url = "https://api.coindesk.com/v1/bpi/currentprice.json"
        $.getJSON(url).done(function(response){
            data = numberWithCommas(response.bpi.USD.rate_float.toFixed(2));
            currentPriceView.html(data);
        });
    }

    selectedValue.change(function(){
        yearsAgo = selectedValue.val();
        getPrice(yearsAgo);
        getCurrentPrice();
    });

    //on initialize
    getPrice(yearsAgo);
    getCurrentPrice();
});