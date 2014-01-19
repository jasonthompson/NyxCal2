module.exports = function CalendarView(calendar, root){

  this.calendar = calendar;
  this.root = root;

  this.render = function(){
    this.root.find('#calendar-header').html(buildCalendarHeader(this.calendar));
    this.root.find('#tbody#month-display').append(buildMonthView(this.calendar));
  };

  var buildCalendarHeader = function(calendar){
    var pMonthPath = calendar.previousMonth().year + "/" + calendar.previousMonth().month;
    var nMonthPath = calendar.nextMonth().year + "/" +  calendar.nextMonth().month;
    var pMonth = pMonthPath.split('/').reverse().join(' ');
    var nMonth = nMonthPath.split('/').reverse().join(' ');
    var util = require('./util.js');
    var calendarHeaderTmpl = $('#calendar-header-tmpl').html();

    var calHeader = $($.render (calendarHeaderTmpl,
                {
                  month: util.capitalize(calendar.month),
                  year: calendar.year,
                  previousMonthPath: pMonthPath,
                  nextMonthPath: nMonthPath,
                  previousMonth: pMonth,
                  nextMonth: nMonth
                }));
    return calHeader;
  };

  var buildMonthView = function(calendar){
    var month = $('#month-display');
    month.empty();
    for (var i = 1; i <= 5; i++){
      month.append(buildWeekView(i, calendar));
    }
    return month;
  };

  var buildWeekView = function(weekNum, calendar){
    var week = $($.parseHTML('<tr id="week' + weekNum + '"></tr>'));

    $.each(calendar.week(weekNum), function(i, day){
      var dateID = day.date.format("MMMM D, YYYY");
      var dateDay = day.date.format("D");

      week.append('<td id="' + dateID + '"><span class="calendar-date">' + dateDay + '</span></td>');
    });
    return week;
  };
};
