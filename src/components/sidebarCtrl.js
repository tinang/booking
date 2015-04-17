"use strict";

datePickerCtrl.$inject = ["$scope"];
function datePickerCtrl($scope) {
  $scope.dt = new Date();
  $scope.minDate = $scope.minDate ? null : new Date();
}

module.exports = datePickerCtrl;

angular.module('bookingApp')
  .controller('datePickerCtrl', ["$scope", datePickerCtrl]);