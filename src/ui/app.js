/* Presenter */

module.exports = (function() {
  'use strict';

  var Calendar = require('../models/calendar');
  var root = $('#nyxcal-app');

  $('#left-nav').click(function(){
    return $.route($(this).attr('href'));
  });

  $.route(function(hash) {

    var presentCalendarView = require('./calendar-view');
    var month = hash.slice(7);
    var year = hash.slice(2,6);

    var calendar = new Calendar(month, year);
    presentCalendarView(calendar, root);
  });
})();
