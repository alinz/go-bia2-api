angular.module('app.controllers')
  .controller("homeCtrl", ["$scope", "restCalls", function ($scope, restCalls) {
    $scope.searchType = "artist";

    $scope.$watch("search", function (value) {
      if (value && value.length > 0) {
        restCalls.search(value, $scope.searchType).then(function (results) {
          $scope.artists = results;
        });
      } else {
        $scope.artists = [];
      }
    });
  }]);
