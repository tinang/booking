"use strict";

require("../utilities/utilities.js");

var hotel = require("./service.js");

bookingHotelCtrl.$inject = ["$scope", "$state", "$stateParams", "$timeout", "helper", "hotelService", "hotel"];
function bookingHotelCtrl($scope, $state, $stateParams, $timeout, helper, hotelService, hotel) {
  $scope.helper = helper;

  $scope.hotel = hotel;
  $scope.gridPeriod = helper.getGridPeriod();
  $scope.flagForm = false;
  $scope.error = false;

  // Just for dummy booking types
  $scope.bookingTypes = ["event-full", "event-hours", "event-half"];
  $scope.bookingRoomId = null;
  $scope.bookingDate = null;

  // Calendar popup
  $scope.minDate = new Date();
  $scope.today = new Date();
  $scope.open = function($event, obj) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope[obj] = true;
  };

  function hideError() {
    $scope.error = false;
  }

  $scope.showBookingForm = function(roomId, timestamp) {
    // Validate booking time before show form
    // Still not test
    /*
    var count = $scope.hotel.rooms[roomId]['info'].length;
    if (count > 0) {
      for(var i = 0; i < count; i++) {
        if ($scope.hotel.rooms[roomId]['info'][i]['fromDate'] < timestamp < $scope.hotel.rooms[roomId]['info'][i]['toDate']) {
          $scope.error = "This time is reserved. Please choose another date!";
          $timeout(hideError, 10000);

          return false;
        }
      }
    }
    */

    // Show booking form
    $scope.flagForm = true;
    $scope.bookingRoomId = roomId;
    $scope.bookingDate = timestamp;
  }

  $scope.bookingSubmit = function(form) {
    var fromDate = new Date($scope.fromDate).getTime(),
        toDate = new Date($scope.toDate).getTime();

    if (fromDate > toDate) {
      $scope.error = "To date should be greater than min date!";
      $timeout(hideError, 10000);

      return false;
    }
    else {
      // Update dummy data
      $scope.hotel.rooms[$scope.bookingRoomId]['info'].push({
        "id": "1",
        "name": "Client " + Math.floor((Math.random() * 100) + 1),
        "fromDate": fromDate,
        "toDate": toDate,
        "bookingType": $scope.bookingTypes[Math.floor(Math.random() * 3)]
      });

      $scope.flagForm = false;
    }      
  }
}

module.exports = {
  url: "/booking/:hotelId",
  templateUrl: "booking/index.html",
  controller: bookingHotelCtrl,
  resolve: {
    hotel: hotel.get    
  }
};