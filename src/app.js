/* Presenter */

module.exports = (function() {
  'use strict';

  var Calendar = require('./calendar');
  window.calendar = new Calendar("January", 2014);

  var template = $('[type="html/nyxcal-app"]').html();
  var root = $('#nyxcal-app');

  var currentMonth = $($.render(template, 
    {
      title: "=^..^= NyxCal",
      month: calendar.month,
      year: calendar.year
    }
   ));

  function buildMonthView(){
    for (var i = 1; i <= 5; i++){
      buildWeekView(i);
    }
  }

  function buildWeekView(weekNum){
    var week = $($.parseHTML('<tr></tr>'));

    $.each(calendar.week(weekNum), function(i, day){
      week.append('<td>' + day.date.format('D') + '</td>');
    });

    currentMonth.find('#month-view').append(week);
  }

  buildMonthView();
  currentMonth.appendTo(root);
})();
