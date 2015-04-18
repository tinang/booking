"use strict";

require("../utilities/utilities.js");

var hotel = require("./service.js");

bookingHotelCtrl.$inject = ["$scope", "$stateParams", "helper", "hotel"];
function bookingHotelCtrl($scope, $stateParams, helper, hotel) {
  $scope.helper = helper;

  $scope.hotel = hotel;
  $scope.gridPeriod = helper.getGridPeriod();
  $scope.flagForm = false;

  $scope.showBookingForm = function(roomId, timestamp) {
    $scope.flagForm = true;
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