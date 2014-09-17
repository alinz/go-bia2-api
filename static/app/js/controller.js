angular.module('app.controllers')
  .controller("homeCtrl", ["$scope", "restCalls", function ($scope, restCalls) {
    $scope.$watch("search", function (value) {
      restCalls.searchArtist(value).then(function (results) {
        $scope.artists = results;
      });
    });
  }]);
