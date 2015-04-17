"use strict";

require("../utilities/utilities.js");

var hotel = require("./service.js");
var sidebar = require("../components/sidebarCtrl.js");

bookingHotelCtrl.$inject = ["$scope", "$stateParams", "helper", "hotel"];
function bookingHotelCtrl($scope, $stateParams, helper, hotel) {
  $scope.hotel = hotel;
  $scope.gridPeriod = helper.getGridPeriod();

  console.log(hotel);
}

module.exports = {
  url: "/booking/:hotelId",
  templateUrl: "booking/index.html",
  controller: bookingHotelCtrl,
  resolve: {
    hotel: hotel.get
  }
};