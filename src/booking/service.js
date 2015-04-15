"use strict";

function responseData(resp) {
  return resp.data;
}

hotelService.$inject = ["$http"];
function hotelService($http) {
  return {    
    get: function(id) {
      return $http({
        method: "GET",
        url: "__dummy/hotel/" + id + '.json'
      }).then(responseData);
    },
    update: function(hotel) {
      return $http({
        method: "PUT",
        url: "__dummy/hotel/" + hotel.id,
        data: hotel
      });
    }
  };
}

angular.module("bookingApp")
  .factory("hotelService", hotelService);

getHotel.$inject = ["hotelService", "$stateParams"];
function getHotel(hotel, $stateParams) {
  return hotel.get($stateParams.hotelId);
}

module.exports = {
  get: getHotel
};