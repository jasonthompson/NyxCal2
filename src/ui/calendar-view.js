module.exports = function(calendar, root){

  function buildCalendarHeader(calendar){
    var util = require('./util.js');
    var calendarHeaderTmpl = $('#calendar-header-tmpl').html();
    var calHeader = $($.render (calendarHeaderTmpl,
                {month: util.capitalize(calendar.month), year: calendar.year}));
    return calHeader;
  }

  function buildMonthView(calendar){
    var month = $('#month-display');
    month.empty();
    for (var i = 1; i <= 5; i++){
      month.append(buildWeekView(i));
    }
    return month;
  }

  function buildWeekView(weekNum){
    var week = $($.parseHTML('<tr id="week' + weekNum + '"></tr>'));

    $.each(calendar.week(weekNum), function(i, day){
      var dateID = day.date.format("MMMM D, YYYY");
      var dateDay = day.date.format("D");

      week.append('<td id="' + dateID + '"><span class="calendar-date">' + dateDay + '</span></td>');
    });
    return week;
  }

  function renderMonth(root){
    root.find('#calendar-header').html(buildCalendarHeader(calendar));
    root.find('#tbody#month-display').append(buildMonthView(calendar));
  }

  renderMonth(root);
};
