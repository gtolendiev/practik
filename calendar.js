window.onload = function(){
    window.setInterval(function(){
    var now = new Date();
    var clock = document.getElementById("clock");
    clock.innerHTML = now.toLocaleTimeString();
    },1000);
  };
  function calendar(id, year, month) {
    var Dlast = new Date(year, month + 1, 0).getDate(),
      D = new Date(year, month, Dlast),
      DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay(),
      DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(),
      calendar = '<tr>',
      month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    if (DNfirst != 0) {
      for (var i = 1; i < DNfirst; i++) calendar += '<td>';
    } else {
       for (var i = 0; i < 6; i++) calendar += '<td>';
    }
    for (var i = 1; i <= Dlast; i++) {
       if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
        calendar += '<td class="today">' + i;
       } else {
         calendar += '<td>' + i;
       }
       if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
         calendar += '<tr>';
       }
    }
    for (var i = DNlast; i < 7; i++) calendar += '<td> ';
    document.querySelector('#' + id + ' tbody').innerHTML = calendar;
    document.querySelector('#' + id + ' thead td:nth-child(2)').innerHTML = month[D.getMonth()] + ' ' + D.getFullYear();
    document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.month = D.getMonth();
    document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.year = D.getFullYear();
    if (document.querySelectorAll('#' + id + ' tbody tr').length < 6) { 
        // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
    document.querySelector('#' + id + ' tbody').innerHTML += '<tr><td> <td> <td> <td> <td> <td> <td> ';
    }
  }
  calendar("calendar", new Date().getFullYear(), new Date().getMonth());
        // переключатель минус месяц
  document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
    calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month) - 1);
  }
        // переключатель плюс месяц
  document.querySelector('#calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
    calendar("calendar", document.querySelector('#calendar thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar thead td:nth-child(2)').dataset.month) + 1);
  }
  var checkHoliday = function (id) {
    var Holidays = [ //месяцы с единицы!
     //о каждом празднике в формате день, месяц, описание
     { day: 1, month: 1, desc: 'Новый год' },
     { day: 7, month: 1, desc: 'Рождество' },
     { day: 23, month: 2, desc: 'День Мужыка' },
     { day: 8, month: 3, desc: 'День Бабы' },
     { day: 1, month: 5, desc: 'Первомай' },
     { day: 9, month: 5, desc: 'День Победы' },
     { day: 23, month: 5, desc: 'ДР нашего любимого Одмина' },
     { day: 1, month: 6, desc: 'День защиты детей' },
     { day: 1, month: 9, desc: 'День знаний' },
     { day: 7, month: 11, desc: 'День большевичка' },
     { day: 31, month: 12, desc: 'Новый год' }
    ];
    function today () { //сегодняшняя дата в формате { day: 31, month: 12 }
     var t = new Date();
     var d = t.getDate();
     var m = t.getMonth() + 1;
     return { day: d, month: m };
    }
    function check (t) { //поиск праздника, вернём его номер в списке или -1
     for (var i=0; i<Holidays.length; i++)
      if (Holidays[i].day == t.day && Holidays[i].month == t.month) return i;
     return -1;
    }
    function strDate (t) { //дата t в формате "31 декабря"
     var monthes = [ '','января','февраля','марта','апреля','мая','июня',
     'июля','августа','сентября','октября','ноября','декабря' ];
     return t.day + ' ' + monthes[t.month];
    }
    var t = today();
    var k = check(t);
    if (k > -1) { //если найдено
     var el = document.getElementById (id);
     el.innerHTML = strDate(t)+': '+Holidays[k].desc;
    }
   } 
   window.addEventListener('load', function (e) { 
    checkHoliday('holidayId'); //передать id элемента, куда пишем!
   });  
 var checkHoliday = function (id) {
  var Holidays = [ //месяцы с единицы!
   //о каждом празднике в формате день, месяц, описание
   { day: 1, month: 1, desc: 'Новый год' },
   { day: 7, month: 1, desc: 'Рождество' },
   { day: 23, month: 2, desc: 'День Мужыка' },
   { day: 8, month: 3, desc: 'День Бабы' },
   { day: 1, month: 5, desc: 'Первомай' },
   { day: 9, month: 5, desc: 'День Победы' },
   { day: 23, month: 5, desc: 'ДР нашего любимого Одмина' },
   { day: 1, month: 6, desc: 'День защиты детей' },
   { day: 1, month: 9, desc: 'День знаний' },
   { day: 7, month: 11, desc: 'День большевичка' },
   { day: 31, month: 12, desc: 'Новый год' }
  ];
  function today () { //сегодняшняя дата в формате { day: 31, month: 12 }
   var t = new Date();
   var d = t.getDate();
   var m = t.getMonth() + 1;
   return { day: d, month: m };
  }
  function check (t) { //поиск праздника, вернём его номер в списке или -1
   for (var i=0; i<Holidays.length; i++)
    if (Holidays[i].day == t.day && Holidays[i].month == t.month) return i;
   return -1;
  }
  function strDate (t) { //дата t в формате "31 декабря"
   var monthes = [ '','января','февраля','марта','апреля','мая','июня',
   'июля','августа','сентября','октября','ноября','декабря' ];
   return t.day + ' ' + monthes[t.month];
  }
  var t = today();
  var k = check(t);
  if (k > -1) { //если найдено
   var el = document.getElementById (id);
   el.innerHTML = strDate(t)+': '+Holidays[k].desc;
  }
 } 
 window.addEventListener('load', function (e) { 
  checkHoliday('holidayId'); //передать id элемента, куда пишем!
 });  

(function checkHoliday(id) {
  var Holidays = [
 { day:  1, month:  1, desc: '&starf; Новый год' },
 { day:  2, month:  1, desc: '&ecolon;Новый год' },
 { day:  3, month:  1, desc: '&ecolon;Новый год' },
 { day:  4, month:  1, desc: '&ecolon;Новый год' },
 { day:  5, month:  1, desc: '&ecolon;  ' },
 { day:  6, month:  1, desc: '&ecolon; ' },
 { day:  7, month:  1, desc: '&dagger; Рождество Христово' },
 { day:  8, month:  1, desc: '&ecolon; православное Рождество' },
 { day:  9, month:  1, desc: '&starf; Кровавое воскресенье' },
 { day: 10, month:  1, desc: '' },
 { day: 11, month:  1, desc: '&check; День Спасибо' },
 { day: 12, month:  1, desc: '' },
 { day: 13, month:  1, desc: '' },
 { day: 14, month:  1, desc: '&dagger; Старый новый год' },
 { day: 15, month:  1, desc: '' },
 { day: 16, month:  1, desc: '&check; День снеговика' },
 { day: 17, month:  1, desc: '' },
 { day: 18, month:  1, desc: '' },
 { day: 19, month:  1, desc: '&dagger; Крещение Господне' },
 { day: 20, month:  1, desc: '' },
 { day: 21, month:  1, desc: '&starf; Святое Околевание Мумии' },
 { day: 22, month:  1, desc: '' },
 { day: 23, month:  1, desc: '' },
 { day: 24, month:  1, desc: '' },
 { day: 25, month:  1, desc: '&check; День студента' },
 { day: 26, month:  1, desc: '' },
 { day: 27, month:  1, desc: '&check; День рождения лампочки' },
 { day: 28, month:  1, desc: '' },
 { day: 29, month:  1, desc: '&check; День изобретения автомобиля' },
 { day: 30, month:  1, desc: '' },
 { day: 31, month:  1, desc: '&hearts; День русской водки' },
 { day:  1, month:  2, desc: '&hearts; Февраль. Доставание чернил и плач' },
 { day:  2, month:  2, desc: '' },
 { day:  3, month:  2, desc: '' },
 { day:  4, month:  2, desc: '&check; День домашнего супа' },
 { day:  5, month:  2, desc: '' },
 { day:  6, month:  2, desc: '' },
 { day:  7, month:  2, desc: '' },
 { day:  8, month:  2, desc: '&check; День памяти российской науки' },
 { day:  9, month:  2, desc: '' },
 { day: 10, month:  2, desc: '' },
 { day: 11, month:  2, desc: '' },
 { day: 12, month:  2, desc: '' },
 { day: 13, month:  2, desc: '' },
 { day: 14, month:  2, desc: '&equiv; День Святой Валентины' },
 { day: 15, month:  2, desc: '' },
 { day: 16, month:  2, desc: '&hearts; ДР Златы' },
 { day: 17, month:  2, desc: '' },
 { day: 18, month:  2, desc: '' },
 { day: 19, month:  2, desc: '' },
 { day: 20, month:  2, desc: '&check; День справедливости' },
 { day: 21, month:  2, desc: '' },
 { day: 22, month:  2, desc: '' },
 { day: 23, month:  2, desc: '&starf; День Мужыка' },
 { day: 24, month:  2, desc: '' },
 { day: 25, month:  2, desc: '&check; День револьвера' },
 { day: 26, month:  2, desc: '' },
 { day: 27, month:  2, desc: '' },
 { day: 28, month:  2, desc: '' },
 { day: 29, month:  2, desc: '&hearts; День св. Тиба. Дядин день' },
 { day:  1, month:  3, desc: '&check; День кота' },
 { day:  2, month:  3, desc: '' },
 { day:  3, month:  3, desc: '&check; День дикой природы' },
 { day:  4, month:  3, desc: '' },
 { day:  5, month:  3, desc: '' },
 { day:  6, month:  3, desc: '' },
 { day:  7, month:  3, desc: '' },
 { day:  8, month:  3, desc: '&starf; День Бабы' },
 { day:  9, month:  3, desc: '' },
 { day: 10, month:  3, desc: '' },
 { day: 11, month:  3, desc: '' },
 { day: 12, month:  3, desc: '' },
 { day: 13, month:  3, desc: '' },
 { day: 14, month:  3, desc: '&hearts; День Пи! И Светы' },
 { day: 15, month:  3, desc: '' },
 { day: 16, month:  3, desc: '' },
 { day: 17, month:  3, desc: '' },
 { day: 18, month:  3, desc: '' },
 { day: 19, month:  3, desc: '' },
 { day: 20, month:  3, desc: '' },
 { day: 21, month:  3, desc: '' },
 { day: 22, month:  3, desc: '' },
 { day: 23, month:  3, desc: '' },
 { day: 24, month:  3, desc: '&hearts; День Сибирских Партизан' },
 { day: 25, month:  3, desc: '&check; День работника культуры' },
 { day: 26, month:  3, desc: '' },
 { day: 27, month:  3, desc: '&check; День театра' },
 { day: 28, month:  3, desc: '' },
 { day: 29, month:  3, desc: '' },
 { day: 30, month:  3, desc: '' },
 { day: 31, month:  3, desc: '' },
 { day:  1, month:  4, desc: '&equiv; День Дурака, главный праздник страны!' },
 { day:  2, month:  4, desc: '' },
 { day:  3, month:  4, desc: '' },
 { day:  4, month:  4, desc: '&check; День 404. День крысы' },
 { day:  5, month:  4, desc: '' },
 { day:  6, month:  4, desc: '' },
 { day:  7, month:  4, desc: '&check; День здоровья' },
 { day:  8, month:  4, desc: '' },
 { day:  9, month:  4, desc: '' },
 { day: 10, month:  4, desc: '' },
 { day: 11, month:  4, desc: '' },
 { day: 12, month:  4, desc: '&starf; День космонавтики' },
 { day: 13, month:  4, desc: '' },
 { day: 14, month:  4, desc: '' },
 { day: 15, month:  4, desc: '' },
 { day: 16, month:  4, desc: '' },
 { day: 17, month:  4, desc: '' },
 { day: 18, month:  4, desc: '' },
 { day: 19, month:  4, desc: '' },
 { day: 20, month:  4, desc: '' },
 { day: 21, month:  4, desc: '' },
 { day: 22, month:  4, desc: '&starf; ДР дедушки Ленина. &check; День Земли' },
 { day: 23, month:  4, desc: '' },
 { day: 24, month:  4, desc: '' },
 { day: 25, month:  4, desc: '&check; День ДНК' },
 { day: 26, month:  4, desc: '' },
 { day: 27, month:  4, desc: '' },
 { day: 28, month:  4, desc: '' },
 { day: 29, month:  4, desc: '&hearts; Иро, налевай!' },
 { day: 30, month:  4, desc: '' },
 { day:  1, month:  5, desc: '&starf; Праздник единства народа Казахстана' },
 { day:  2, month:  5, desc: '' },
 { day:  3, month:  5, desc: '&check; День Солнца' },
 { day:  4, month:  5, desc: '' },
 { day:  5, month:  5, desc: '&starf; День совковой печати' },
 { day:  6, month:  5, desc: '' },
 { day:  7, month:  5, desc: '&starf; День радио' },
 { day:  8, month:  5, desc: '' },
 { day:  9, month:  5, desc: '&starf; День Победы' },
 { day: 10, month:  5, desc: '' },
 { day: 11, month:  5, desc: '' },
 { day: 12, month:  5, desc: '' },
 { day: 13, month:  5, desc: '' },
 { day: 14, month:  5, desc: '' },
 { day: 15, month:  5, desc: '&check; День семей' },
 { day: 16, month:  5, desc: '' },
 { day: 17, month:  5, desc: '' },
 { day: 18, month:  5, desc: '' },
 { day: 19, month:  5, desc: '&starf; День савеццкой пионерии :)' },
 { day: 20, month:  5, desc: '' },
 { day: 21, month:  5, desc: '' },
 { day: 22, month:  5, desc: '' },
 { day: 23, month:  5, desc: '&hearts; ДР нашего дорогого Одмина' },
 { day: 24, month:  5, desc: '' },
 { day: 25, month:  5, desc: '' },
 { day: 26, month:  5, desc: '' },
 { day: 27, month:  5, desc: '&check; День библиотекаря' },
 { day: 28, month:  5, desc: '' },
 { day: 29, month:  5, desc: '' },
 { day: 30, month:  5, desc: '' },
 { day: 31, month:  5, desc: '' },
 { day:  1, month:  6, desc: '&starf; День защиты детей от жизни' },
 { day:  2, month:  6, desc: '' },
 { day:  3, month:  6, desc: '' },
 { day:  4, month:  6, desc: '' },
 { day:  5, month:  6, desc: '' },
 { day:  6, month:  6, desc: '&check; Пушкинский день' },
 { day:  7, month:  6, desc: '' },
 { day:  8, month:  6, desc: '' },
 { day:  9, month:  6, desc: '&check; День друзей' },
 { day: 10, month:  6, desc: '' },
 { day: 11, month:  6, desc: '' },
 { day: 12, month:  6, desc: '&equiv; День пазорища Эльцына' },
 { day: 13, month:  6, desc: '' },
 { day: 14, month:  6, desc: '' },
 { day: 15, month:  6, desc: '&check; День ветра и мыльных пузырей' },
 { day: 16, month:  6, desc: '' },
 { day: 17, month:  6, desc: '&check; День борьбы с засухой' },
 { day: 18, month:  6, desc: '' },
 { day: 19, month:  6, desc: '' },
 { day: 20, month:  6, desc: '&check; День защиты слона' },
 { day: 21, month:  6, desc: '' },
 { day: 22, month:  6, desc: '&hearts; Летнее солнцестояние, самый длинный день в году' },
 { day: 23, month:  6, desc: '' },
 { day: 24, month:  6, desc: '' },
 { day: 25, month:  6, desc: '&check; День славян' },
 { day: 26, month:  6, desc: '' },
 { day: 27, month:  6, desc: '' },
 { day: 28, month:  6, desc: '' },
 { day: 29, month:  6, desc: '' },
 { day: 30, month:  6, desc: '' },
 { day:  1, month:  7, desc: '&hearts; Водпуск фарева' },
 { day:  2, month:  7, desc: '' },
 { day:  3, month:  7, desc: '&check; День гайца' },
 { day:  4, month:  7, desc: '' },
 { day:  5, month:  7, desc: '' },
 { day:  6, month:  7, desc: '&check; День поцелуев' },
 { day:  7, month:  7, desc: '&equiv; День утопленника' },
 { day:  8, month:  7, desc: '' },
 { day:  9, month:  7, desc: '' },
 { day: 10, month:  7, desc: '' },
 { day: 11, month:  7, desc: '' },
 { day: 12, month:  7, desc: '&check; День Петра и Павла' },
 { day: 13, month:  7, desc: '' },
 { day: 14, month:  7, desc: '&check; День взятия Бастилии' },
 { day: 15, month:  7, desc: '' },
 { day: 16, month:  7, desc: '&hearts; Alice, ДР' },
 { day: 17, month:  7, desc: '' },
 { day: 18, month:  7, desc: '' },
 { day: 19, month:  7, desc: '' },
 { day: 20, month:  7, desc: '&check; День шахмат' },
 { day: 21, month:  7, desc: '' },
 { day: 22, month:  7, desc: '' },
 { day: 23, month:  7, desc: '&check; День кита и дельфина' },
 { day: 24, month:  7, desc: '' },
 { day: 25, month:  7, desc: '' },
 { day: 26, month:  7, desc: '' },
 { day: 27, month:  7, desc: '' },
 { day: 28, month:  7, desc: '' },
 { day: 29, month:  7, desc: '' },
 { day: 30, month:  7, desc: '' },
 { day: 31, month:  7, desc: '' },
 { day:  1, month:  8, desc: '' },
 { day:  2, month:  8, desc: '&hearts; Ильин день' },
 { day:  3, month:  8, desc: '' },
 { day:  4, month:  8, desc: '' },
 { day:  5, month:  8, desc: '&check; День светофора' },
 { day:  6, month:  8, desc: '' },
 { day:  7, month:  8, desc: '' },
 { day:  8, month:  8, desc: '&check; День холодильника' },
 { day:  9, month:  8, desc: '' },
 { day: 10, month:  8, desc: '' },
 { day: 11, month:  8, desc: '' },
 { day: 12, month:  8, desc: '' },
 { day: 13, month:  8, desc: '' },
 { day: 14, month:  8, desc: '&hearts; День золотого сечения' },
 { day: 15, month:  8, desc: '' },
 { day: 16, month:  8, desc: '&check; Малинник' },
 { day: 17, month:  8, desc: '' },
 { day: 18, month:  8, desc: '' },
 { day: 19, month:  8, desc: '' },
 { day: 20, month:  8, desc: '' },
 { day: 21, month:  8, desc: '' },
 { day: 22, month:  8, desc: '' },
 { day: 23, month:  8, desc: '' },
 { day: 24, month:  8, desc: '' },
 { day: 25, month:  8, desc: '&hearts; ДР бабушки' },
 { day: 26, month:  8, desc: '' },
 { day: 27, month:  8, desc: '' },
 { day: 28, month:  8, desc: '' },
 { day: 29, month:  8, desc: '' },
 { day: 30, month:  8, desc: '' },
 { day: 31, month:  8, desc: '' },
 { day:  1, month:  9, desc: '&starf; День Незнайки' },
 { day:  2, month:  9, desc: '' },
 { day:  3, month:  9, desc: '' },
 { day:  4, month:  9, desc: '&hearts; Янкин день' },
 { day:  5, month:  9, desc: '' },
 { day:  6, month:  9, desc: '' },
 { day:  7, month:  9, desc: '' },
 { day:  8, month:  9, desc: '' },
 { day:  9, month:  9, desc: '' },
 { day: 10, month:  9, desc: '' },
 { day: 11, month:  9, desc: '' },
 { day: 12, month:  9, desc: '' },
 { day: 13, month:  9, desc: '&equiv; День программиста' },
 { day: 14, month:  9, desc: '' },
 { day: 15, month:  9, desc: '' },
 { day: 16, month:  9, desc: '&hearts; День знакомств' },
 { day: 17, month:  9, desc: '' },
 { day: 18, month:  9, desc: '' },
 { day: 19, month:  9, desc: '&check; День смайлика' },
 { day: 20, month:  9, desc: '' },
 { day: 21, month:  9, desc: '' },
 { day: 22, month:  9, desc: '' },
 { day: 23, month:  9, desc: '' },
 { day: 24, month:  9, desc: '' },
 { day: 25, month:  9, desc: '' },
 { day: 26, month:  9, desc: '' },
 { day: 27, month:  9, desc: '&check; День туризма' },
 { day: 28, month:  9, desc: '' },
 { day: 29, month:  9, desc: '' },
 { day: 30, month:  9, desc: '&check; День рунетика' },
 { day:  1, month: 10, desc: '' },
 { day:  2, month: 10, desc: '' },
 { day:  3, month: 10, desc: '' },
 { day:  4, month: 10, desc: '&check; День защиты животных' },
 { day:  5, month: 10, desc: '&check; День учителя' },
 { day:  6, month: 10, desc: '' },
 { day:  7, month: 10, desc: '' },
 { day:  8, month: 10, desc: '' },
 { day:  9, month: 10, desc: '' },
 { day: 10, month: 10, desc: '' },
 { day: 11, month: 10, desc: '' },
 { day: 12, month: 10, desc: '' },
 { day: 13, month: 10, desc: '&check; День игрального кубика' },
 { day: 14, month: 10, desc: '' },
 { day: 15, month: 10, desc: '&check; День мытья рук' },
 { day: 16, month: 10, desc: '' },
 { day: 17, month: 10, desc: '' },
 { day: 18, month: 10, desc: '' },
 { day: 19, month: 10, desc: '' },
 { day: 20, month: 10, desc: '' },
 { day: 21, month: 10, desc: '&hearts; Мамин день' },
 { day: 22, month: 10, desc: '' },
 { day: 23, month: 10, desc: '' },
 { day: 24, month: 10, desc: '' },
 { day: 25, month: 10, desc: '&check; День автомобилиста' },
 { day: 26, month: 10, desc: '' },
 { day: 27, month: 10, desc: '' },
 { day: 28, month: 10, desc: '' },
 { day: 29, month: 10, desc: '' },
 { day: 30, month: 10, desc: '&starf; День памяти жертв политических репрессий' },
 { day: 31, month: 10, desc: '' },
 { day:  1, month: 11, desc: '' },
 { day:  2, month: 11, desc: '' },
 { day:  3, month: 11, desc: '&check; День сэндвича' },
 { day:  4, month: 11, desc: '&equiv; День Ивана Сусанина' },
 { day:  5, month: 11, desc: '' },
 { day:  6, month: 11, desc: '' },
 { day:  7, month: 11, desc: '&starf; День Совка' },
 { day:  8, month: 11, desc: '&ecolon; День Совка, дубль 2' },
 { day:  9, month: 11, desc: '' },
 { day: 10, month: 11, desc: '' },
 { day: 11, month: 11, desc: '' },
 { day: 12, month: 11, desc: '' },
 { day: 13, month: 11, desc: '&check; День доброты' },
 { day: 14, month: 11, desc: '&hearts; ДР бложека' },
 { day: 15, month: 11, desc: '' },
 { day: 16, month: 11, desc: '' },
 { day: 17, month: 11, desc: '' },
 { day: 18, month: 11, desc: '&check; ДР Деда Мороза' },
 { day: 19, month: 11, desc: '' },
 { day: 20, month: 11, desc: '' },
 { day: 21, month: 11, desc: '&check; День зомбоящика' },
 { day: 22, month: 11, desc: '' },
 { day: 23, month: 11, desc: '' },
 { day: 24, month: 11, desc: '' },
 { day: 25, month: 11, desc: '' },
 { day: 26, month: 11, desc: '&hearts; День мобильника' },
 { day: 27, month: 11, desc: '' },
 { day: 28, month: 11, desc: '&hearts; День памяти ужоса' },
 { day: 29, month: 11, desc: '' },
 { day: 30, month: 11, desc: '' },
 { day:  1, month: 12, desc: '' },
 { day:  2, month: 12, desc: '' },
 { day:  3, month: 12, desc: '' },
 { day:  4, month: 12, desc: '&check; День информатики. День писем деду Морозу' },
 { day:  5, month: 12, desc: '' },
 { day:  6, month: 12, desc: '' },
 { day:  7, month: 12, desc: '' },
 { day:  8, month: 12, desc: '' },
 { day:  9, month: 12, desc: '' },
 { day: 10, month: 12, desc: '' },
 { day: 11, month: 12, desc: '' },
 { day: 12, month: 12, desc: '' },
 { day: 13, month: 12, desc: '' },
 { day: 14, month: 12, desc: 'Праздник дня Галеки'},
 { day: 15, month: 12, desc: '&check; День чая' },
 { day: 16, month: 12, desc: '' },
 { day: 17, month: 12, desc: '' },
 { day: 18, month: 12, desc: '' },
 { day: 19, month: 12, desc: '' },
 { day: 20, month: 12, desc: '' },
 { day: 21, month: 12, desc: '&hearts; Конец света' },
 { day: 22, month: 12, desc: '&hearts; Зимнее солнцестояние, самый короткий день в году' },
 { day: 23, month: 12, desc: '' },
 { day: 24, month: 12, desc: '' },
 { day: 25, month: 12, desc: '&hearts; Начало новогодней суеты' },
 { day: 26, month: 12, desc: '' },
 { day: 27, month: 12, desc: '' },
 { day: 28, month: 12, desc: '' },
 { day: 29, month: 12, desc: '&hearts; Дедушка родился' },
 { day: 30, month: 12, desc: '&starf; День памяти Совка' },
 { day: 31, month: 12, desc: '&ecolon; Предновогодний' }
];
  function today () { //сегодняшняя дата в формате { day: 31, month: 12, year: 2019 }
   let t = new Date();
   let d = t.getDate();
   let m = t.getMonth() + 1;
   let y = t.getFullYear();
   return { day: d, month: m, year: y };
  }
  function diff (d1,m1,d2,m2) { 
   //количество дней от d1.m1 до d2.m2 с учетом перехода через год
   let td = new Date();
   let year = td.getFullYear();
   let y1 = year;
   let y2 = y1;
   if (m1 > m2 || m1 == m2 && d1 > d2) y2++;
   let date1 = new Date (y1, m1-1, d1); 
   let date2 = new Date (y2, m2-1, d2); 
   let d = date2.getTime() - date1.getTime(); 
   return Math.round (d / (1000 * 3600 * 24)); 
  }
  function leapYear(year) {
   return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
  }
  function check (t) { //поиск следующего праздника, вернём его номер в списке или -1
   let nearest = 400;
   let num = -1; 
   for (let i=0; i < Holidays.length; i++) {
    if (Holidays[i].desc.trim()==='' || 
        (Holidays[i].day==29 && Holidays[i].month==2 && !leapYear(t.year))
       ) continue;
    let d = diff(t.day,t.month,Holidays[i].day,Holidays[i].month);
    if (d < nearest) { nearest = d; num = i; }
   }
   return num;
  }
  function strDate (t) { //дата t в формате "31 декабря"
   var monthes = [ '','января','февраля','марта','апреля','мая','июня',
   'июля','августа','сентября','октября','ноября','декабря' ];
   return t.day + ' ' + monthes[t.month];
  }
  let t = today();
  let k = check (t);
  if (k != -1) { //если найдено
   let el = document.getElementById (id);
   let next = { day: Holidays[k].day, month: Holidays[k].month };
   let d = diff (t.day,t.month,next.day,next.month);
   let str = '';
   if (d == 0) str = 'Сегодня празднуем';
   else if (d == 1) str = 'Завтра отмечаем';
   else if (d == 2) str = 'Послезавтра у нас';
   else if (d < 7 ) str = 'Скоро будет праздник';
   else if (d == 7) str = 'Через неделю празднуем';
   else str = 'Следующий праздник';
   el.innerHTML = str + ': ' + strDate(next)+'. '+Holidays[k].desc;
  }
}('holidayId')); //checkHoliday