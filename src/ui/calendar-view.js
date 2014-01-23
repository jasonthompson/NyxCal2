module.exports = function CalendarView(calendar, root){
  var Day = require('./day.js');

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
    var calendarHeaderTmpl = $('#calendar-header-tmpl').html();
    var headerInfo = {
      month: calendar.month,
      year: calendar.year,
      previousMonthPath: pMonthPath,
      nextMonthPath: nMonthPath,
      previousMonth: pMonth,
      nextMonth: nMonth
    };

    var calHeader = $($.render(calendarHeaderTmpl, headerInfo));
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
      var theDay = new Day(day, calendar);
      week.append(theDay.render);
    });
    return week;
  };

};
