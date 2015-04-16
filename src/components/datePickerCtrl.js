"use strict";

datePickerCtrl.$inject = ["$scope"];
function datePickerCtrl($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();	
}

module.exports = {
  url:         "",
  templateUrl: "components/sidebar.html",
  controller:  datePickerCtrl
};