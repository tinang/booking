"use strict";

angular.module('bookingApp')
	.factory('helper', function() {
		var getGridPeriod = function() {
			var period = 14,
					gridPeriod = [],
		  		startDate = new Date(),
		      endDate = new Date(startDate.getTime() + period*24*60*60*1000);

		  for (var i = 0; i < period; i++) {
		    var curDate = new Date(startDate.getTime() + i*24*60*60*1000);
		    gridPeriod.push({
		      'niceDate': curDate.getDate() + '.' + curDate.getMonth(),
		      'datetime': curDate
		    });
		  }

		  return gridPeriod;
		};
		
		return {
			'getGridPeriod': getGridPeriod
		}

	});