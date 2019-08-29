$( document ).ready(function() {




    //
    //
    // СЛАЙДЕР
    //
    //


    function changeSlide(index){
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
            $('.top-buttons .small-button, .small-screen-button .small-button').css("display", "block");
        } else{
            $('.top-buttons .small-button, .small-screen-button .small-button').css("display", "none");
        }
    }


    // .dot
    // ___
    // каждый .dot переключает слайды 

    $('.dot').each(function(index, element){
        $(element).click(function(){

            // Запускаем функцию меняющую слайд
            changeSlide(index);
    
        });
    });


    // .small-button
    // _____________
    // кнопка .small-button переключает слайд на следующий

    $('.slider .small-button').click(function(){

        // Здесь будет храниться номер активного слайда
        var activeNumSlide;

        // по цвету dot узнать какой слайд сейчас активен и внести в переменную activeNumSlide
        $('.dot').each(function(index, element){
            if($(element).css("background-color") != "rgb(255, 255, 255)"){
                activeNumSlide = index + 1;
            }
        });

        // Запускаем функцию меняющую слайд
        changeSlide(activeNumSlide);

    });




});