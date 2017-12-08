$(function () {


    var getPriceButton = $("#get_price");
    var priceView = $("#price");
    var selectedValue = $("#year_selector");
    var yearsAgo = selectedValue.val();

    var getPrice = function getPrice(years) {
        var currentDate = new Date(Date.now());
        var selectedYear = currentDate.getFullYear() - Number(years);
        var selectedMonth = currentDate.getMonth() + 1;
        var selectedDay = currentDate.getDate();
        var selectedDateString = [selectedYear,selectedMonth,selectedDay].join("-");
        var selectedDate = new Date(selectedDateString).toISOString().split('T')[0];
        var url = "https://api.coindesk.com/v1/bpi/historical/close.json?start=" + selectedDate + "&end=" + selectedDate;
        var data;

        $.getJSON(url).done(function(response){
            data = (Object.values(response.bpi)[0].toFixed(2));
            priceView.html(data);
        });
    };

    selectedValue.change(function(){
        yearsAgo = selectedValue.val();
        getPrice(yearsAgo);
    });

    //on initialize
    getPrice(yearsAgo);

});