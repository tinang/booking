"use strict";
// Build utility functions 
angular.module('bookingApp')
	.factory('helper', function() {
		function _parseToDateObject(obj) {
			return new Date(parseInt(obj));
		}

		var formatDate = function formatDate(obj) {
			var obj = _parseToDateObject(obj);
			return obj.getDate() + '.' + obj.getMonth() + '.' + obj.getFullYear();
		}		

		var getGridPeriod = function() {
			var period = 14,
					gridPeriod = [],
		  		startDate = new Date(),
		      endDate = new Date(startDate.getTime() + period*24*60*60*1000);

		  for (var i = 0; i < period; i++) {
		    var curDate = new Date(startDate.getTime() + i*24*60*60*1000);
		    gridPeriod.push({
		    	'displayDate': curDate.toString().slice(4, 10),
		      'niceDate': curDate.getDate() + '.' + curDate.getMonth() + '.' + curDate.getFullYear(),
		      'timestamp': curDate.getTime()
		    });
		  }

		  return gridPeriod;
		}		

		var compareDate = function(obj1, obj2) {
			return (formatDate(obj1) == formatDate(obj2));
		}

		var calDistance = function(from, to) {
			var from = _parseToDateObject(from),
					to = _parseToDateObject(to);

			return (1 + (to - from)/(24*60*60*1000));
		}
		
		return {
			'formatDate': formatDate,
			'getGridPeriod': getGridPeriod,
			'compareDate': compareDate,
			'calDistance': calDistance
		}

	});