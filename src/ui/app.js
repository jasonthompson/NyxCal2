/* Presenter */

module.exports = (function() {
  'use strict';

  var Calendar = require('../models/calendar');
  var root = $('#nyxcal-app');

  // $('#left-nav').click(function(){
  //   return $.route($(this).attr('href'));
  // });

  // $('#right-nav').click(function(){
  //   return $.route($(this).attr('href'));
  // });

  $.route(function(hash) {
    var month = hash.slice(7);
    var year = hash.slice(2,6);
    var CalendarView = require('./calendar-view');
    var calendar = new Calendar(month, year);
    var currentMonthView = new CalendarView(calendar, root);


    currentMonthView.render();
  });
})();
