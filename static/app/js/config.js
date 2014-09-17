angular.module("app", [
  "ngRoute",
  "ngResource",
  "ngCookies",
  "ui.router",
  "ui.bootstrap",
  "app.services",
  "app.controllers"
])
.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state("home", {
      url: "/home",
      templateUrl: "template/home.html",
      controller: "homeCtrl"
    });
}]);

angular.module('app.controllers', []);
angular.module('app.services', []);
