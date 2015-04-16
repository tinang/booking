"use strict";

var hotel = require("./service.js");

bookingHotelCtrl.$inject = ["$scope", "$stateParams", "hotel"];
function bookingHotelCtrl($scope, $stateParams, hotel) {
  $scope.hotel = hotel;
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