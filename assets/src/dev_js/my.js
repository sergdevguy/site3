$( document ).ready(function() {




    // При нажатии на dot получить его порядковый номер и отобразить картинку
    // с таким же порядковым номером в img-container > img

    // Каждая dot реагирует на клик
    $('.dot').each(function(index, element){
        $(element).click(function(){
            // меняем главную картинку
            $('.slider .img').attr("src", "img/4_slider_" + (index + 1) + ".jpg");
            // перекрашиваем все dot в белые - неактивные
            $('.dot').each(function(index, element){
                $(element).css("background-color", "#ffffff");
            });
            // активный dot перекрашиваем в фирменный цвет
            $('.dot:nth-child(' + (index + 1) + ')').css("background-color", "#7e54b0");
            // меняем bgi у .top-buttons (правая часть слайдера на большом экране)
            // если это кнопки от 1 до 9, то показываем следующую картинку
            // если это 10 кнопка, то следующей картинки нет - none.
            if((index + 1) < 10){
                $('.top-buttons').css("backgroundImage", "url('../img/4_slider_" + (index + 2) + ".jpg')");
            } else{
                $('.top-buttons').css("backgroundImage", "none");
            }
            // меняем текстовый слайд под слайдером
            // все текстовые слайды скрываем
            $('.slide').each(function(index, element){
                $(element).css("display", "none");
            });
            // показываем слайд такого номера, по какому номеру dot кликнули
            $(".slide:nth-child(" + (index + 1) + ")").css("display", "block");
            // показываем кнопку на .top-buttons если кликаем на dot от 1 до 9
            // и скрываем если кликнули на 10, дальше листать некуда
            if((index + 1) < 10){
                $('.top-buttons .small-button').css("display", "block");
            } else{
                $('.top-buttons .small-button').css("display", "none");
            }
        });
    });




});