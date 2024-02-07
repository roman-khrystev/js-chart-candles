$(document).ready(function () {

    // show on scroll 
    function scrollBlock(className, showGapPX = 0) {
        var elementOffsetTop = $(className).offset().top;
        var elementHeight = $(className).outerHeight();
        var windowHeight = $(window).height();
        var windowScrollTop = $(window).scrollTop();

        if (windowScrollTop > elementOffsetTop + elementHeight * 0.3 - windowHeight + showGapPX) {

            if (generateChart === false) {
                startChart()
                generateChart = true; // Prevent from generating chart again
            }


        }
    }

    // items chart 
    let generateChart = false;
    function startChart() {
        let maxVal = 0;
        const itemsLen = $('.chart-item-column').length // Get items length

        // Detect max value
        $('.chart-item-column').each(function () {
            const t = $(this)
            const amount = t.attr('data-amount');

            if (maxVal < amount) maxVal = +amount
        });

        // Generate vertical points
        $('.chart-y').append('<span>' + maxVal.toFixed(0) + '</span>')
        $('.chart-y').append('<span>' + (maxVal / 4).toFixed(0) + '</span>')
        $('.chart-y').append('<span>' + (maxVal / 2).toFixed(0) + '</span>')
        $('.chart-y').append('<span>' + (maxVal / 3).toFixed(0) + '</span>')
        $('.chart-y').append('<span>' + (maxVal / 5).toFixed(0) + '</span>')

        let generateColumnsI = 0;

        const generateColumns = setInterval(() => {
            if (generateColumnsI === itemsLen) clearInterval(generateColumns); // Stop Interval

            const columnItem = $('.chart-item').eq(generateColumnsI).find('.chart-item-column');
            const amount = columnItem.attr('data-amount');
            const heightPercentage = (amount / maxVal) * 100; // Calculate the percentage
            columnItem.css('height', heightPercentage + '%'); // Set the percentage as height

            generateColumnsI++;
        }, 500)
    }

    // show on scroll
    $(window).scroll(function () {
        if ($('.chart').length) {
            scrollBlock('.chart', 200);
        }
    });

    // show if this block is visible on first screen
    if ($('.chart').length) {
        scrollBlock('.chart', 200);
    }
});