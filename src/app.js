"use strict";

require("angular");
require("ui-router");
require("angular-sanitize");
require("angular-bootstrap");

var mod = angular.module("bookingApp", ["ui.router", "ngSanitize", "ui.bootstrap"]);

var booking = require('./booking/booking.js');
var bookingPerHours = require('./booking/bookingPerHours.js');

// Show/hide spinner icon when starting a new state
initLoader.$inject = ["$rootScope"];
function initLoader($rootScope) {
  $rootScope.$on("$stateChangeStart", function() {
    $rootScope.loading = true;
  });

  $rootScope.$on("$stateChangeSuccess", function(event, toState) {
    $rootScope.loading = false;
    $rootScope.currentState = toState;
  });

  $rootScope.$on("$stateChangeError", function() {
    $rootScope.loading = false;
  });
}

// List states 
states.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
function states($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $urlRouterProvider.when("",  "/booking/1");	// assume that we are in specific hotel with #ID is "1"
  $urlRouterProvider.when("/", "/booking/1");

  $stateProvider.state("booking", booking);
  $stateProvider.state("bookingPerHours", bookingPerHours);
}

mod.config(states);
mod.run(initLoader);