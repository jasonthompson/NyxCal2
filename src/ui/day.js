module.exports =  function Day(day, calendar){
  var dateID = day.date.format("MMMM-D-YYYY");
  var dateDay = day.date.format("D");
  var dayTmpl = $("#day-template").html();

  this.render = function(){
    var dayInfo = {
      dateID: dateID,
      dateNum: dateDay,
      klasses: addDayKlasses(this.day)
    };
    var dayHTML = $($.render(dayTmpl, dayInfo));
    return dayHTML;
  };

  function addDayKlasses(){
    var dayKlass = isToday(day.date) ? "today" : "";
    var monthKlass = isThisMonth(day.date, calendar) ? "this-month" : "";
    return dayKlass === "today" ? dayKlass + " " + monthKlass : monthKlass;
  }

  function isToday(theDay){
    var day = theDay.format('MMMM D, YYYY');
    var today = moment(Date.now()).format('MMMM D, YYYY');
    return day === today;
  }

  function isThisMonth(theDay, calendar){
    var month = theDay.format('MMMM YYYY');
    var thisMonth = calendar.monthYear;
    return month === thisMonth;
  }
};
