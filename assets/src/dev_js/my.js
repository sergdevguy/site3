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




    //
    //
    // КНОПКИ СКРЫТИЯ/РАСКРЫТИЯ В ФУТЕРЕ
    //
    //


    // Если юзер кликнул на текст/карту - раскрыл или скрыл его, то перестаем
    // сами управлять их видимостью
    var userClickText = false;

    // Скрываем и показываем текст и карту на маленьких дисплеях
    $( "footer .path1" ).click(function() {
        if($(window).width() <= 414){
            userClickText = true;
            $( "footer .path-text" ).slideToggle( "slow", function() {
                // Animation complete.
            });
        }
    });
    $( "footer .path2" ).click(function() {
        if($(window).width() <= 414){
            $( "footer .small-map" ).slideToggle( "slow", function() {
                // Animation complete.
            });
        }
    });

    // Скрываем и показвыаем текст при изменении размера экрана
    $(window).resize(function(){
        var w = $(window).width();
        // показываем текст на больших дисплеях, даже если на маленьком его скрыли
        if(w > 414 && $(".path-text").css("display") == "none") {
            $("footer .path-text").css("display", "block");
        }
        // скрываем маленькую карту на самых больших дисплеях
        if(w > 991 && $(".small-map").css("display") == "block") {
            $("footer .small-map").css("display", "none");
        }
        // показываем маленькую карту на больших дисплеях, даже если на маленьких её скрыли
        if(w > 414 && w <= 991 && $(".small-map").css("display") == "none") {
            $("footer .small-map").css("display", "block");
        }
    });




    //
    //
    // КНОПКА ПЕРЕЛИСТЫВАНИЯ КОММЕНТАРИЯ 
    //
    //


    // Обрезаем текст в зависимости от размера экрана
    function sliceComment(text){
        // храним text и slisedText отдельно
        var slisedText = text;
        var w = $(window).width();
        // если ширина экрана 414 и меньше то обрезаем текст, иначе нет
        if(w <= 414){
            slisedText = text.slice(1, 279);
            slisedText += " ...";
            $(" .comments .slide-container .comment-child").html(slisedText);
        } else{
            $(" .comments .slide-container .comment-child").html(text);
        }
    }

    // считаем номер слайда
    var slidesSum = $(".container .text-block").length;
    var nextSlide = 1;

    // Будем хранить здесь все оригиналы комментариев, что бы не обращаться к ним в DOM при каждом клике
    var commentTextTemp = [];

    // записываем все комментарии в темп - commentTextTemp
    for(var i = 1; i <= slidesSum; i++){
        commentTextTemp.push( $(" .comments .slide-container .text-block:nth-child( " + i + " ) .comment-child").html() );
    }

    // Изначально проверим размер и определим какой текст будет
    sliceComment(commentTextTemp[nextSlide-1]);

    // Теперь проверяем размер экрана и меняем текст, при необходимости
    $(window).resize(function(){
        sliceComment(commentTextTemp[nextSlide-1]);
    });

    $( ".comments .small-button" ).click(function() {
        $( ".comments .slide-container .text-block:nth-child(" + nextSlide + ")" ).animate({
            left: "-=150",
            opacity: 0
        }, 700, function() {
            $( ".comments .slide-container .text-block:nth-child(" + nextSlide + ")" ).css("display", "none");
            if(nextSlide < slidesSum){
                nextSlide += 1;
            } else{
                nextSlide = 1;
            }
            sliceComment(commentTextTemp[nextSlide-1]);
            $( ".comments .slide-container .text-block:nth-child(" + nextSlide + "), .comments .comment-img" ).css({"display": "block", "opacity": "1", "left": "0px"});
            $( ".comments .comment-img" ).attr("src", "img/comments-img" + nextSlide + ".jpg");
        });
    });




});