// Reviews

var owl = $(".owl-carousel");

owl.owlCarousel({
  loop: true,
  margin: 0,
  nav: false,
  items: 1,
  dots: false
});

$(".reviews .next").click(function () {
  owl.trigger("next.owl.carousel");
});

$(".reviews .prev").click(function () {
  owl.trigger("prev.owl.carousel");
});

// Calculator range sliders

var docsSlider = document.getElementById('documents-slider-range');
var emploSlider = document.getElementById('employee-slider-range');

noUiSlider.create(docsSlider, {
  range: {
    min: 1,
    max: 8
  },
  start: 3,
  step: 1
});

noUiSlider.create(emploSlider, {
  range: {
    min: 0,
    max: 100
  },
  start: 35,
  step: 1
});

// Calculation

var Calculator = {
  employee: {
    common: [5500, 8500, 11500, 14500, 18500],
    income: [2500, 5500, 8500, 11500, 15500],
    income_costs: [3500, 6500, 9500, 12500, 16500]
  },
  documents: {
    common: [5500, 9000, 12000],
    income: [2000, 5000, 8000],
    income_costs: [4000, 7500, 10500]
  }
}
var employeeInput = $('#employee-input');

// Расчёт результата при изменении в слайдерах
docsSlider.noUiSlider.on('update', function (values, handle) {
  var docsValue = values[handle];
  var emploValue = +emploSlider.noUiSlider.get();
  var calcType = $('input[name=system]:checked').val();

  calcResult(docsValue, emploValue, calcType);
});

emploSlider.noUiSlider.on('update', function (values, handle) {
  var emploValue = values[handle];
  var docsValue = +docsSlider.noUiSlider.get();
  var calcType = $('input[name=system]:checked').val();

  calcResult(docsValue, emploValue, calcType);

  employeeInput.val(Math.round(emploValue));
});

// Смещение слайдера при обновлении input
employeeInput.on('change', function () {
  emploSlider.noUiSlider.set($(this).val());
});

$(document).ready(function () {
  $('input[name=system]').on('change', function () {
    var emploValue = +emploSlider.noUiSlider.get();
    var docsValue = +docsSlider.noUiSlider.get();
    var calcType = $(this).val();

    calcResult(docsValue, emploValue, calcType);
  })

  // Открытие и закрытие всплывающего окна

  $("*[data-href='modal']").on('click', function () {
    $('.layout').css('display', 'flex');
  })

  $('.layout .close').on('click', function () {
    console.log(1);
    $(this).closest('.layout').css('display', 'none');
  })

  $(document).mouseup(function (e){ // событие клика по веб-документу
    var div = $(".layout form"); // тут указываем ID элемента
    if (!div.is(e.target) // если клик был не по нашему блоку
      && div.has(e.target).length === 0) { // и не по его дочерним элементам
      div.closest('.layout').hide(); // скрываем его
    }
  });

  // Открытие и закрытие меню в моб версии
  $('.hamburger').on('click', function () {
    $(this).toggleClass('active');
    $(this).closest('.container').next('.menu-container').slideToggle();
  })

  // Закрытие меню в моб версии если кликнули по ссылке

  $('.menu-row .menu-container a').on('click', function () {
    $(this).closest('.menu-container').slideToggle();
    $(this).closest('.menu-container').prev('.container').find('.hamburger').toggleClass('active');
  })

  // Плавная прокрутка до якоря

  $('.menu-row a').on('click', function (e) {
    var anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $(anchor.attr('href')).offset().top
    }, 777);
    e.preventDefault();
    return false;
  });

})


function calcResult(docsValue, emploValue, calcType) {
  var sum = null;

  if (docsValue <= 2) {
    sum = Calculator.documents[calcType][0];
  } else if (docsValue <= 4) {
    sum = Calculator.documents[calcType][1];
  } else {
    sum = Calculator.documents[calcType][2];
  }

  if (emploValue <= 10) {
    sum += Calculator.employee[calcType][0];
  } else if (emploValue <= 20) {
    sum += Calculator.employee[calcType][1];
  } else if (emploValue <= 30) {
    sum += Calculator.employee[calcType][2];
  } else if (emploValue <= 40) {
    sum += Calculator.employee[calcType][3];
  } else {
    sum += Calculator.employee[calcType][4];
  }

  $('#result').text(sum)
}
