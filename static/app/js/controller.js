angular.module('app.controllers')
  .controller("homeCtrl", ["$scope", "restCalls", function ($scope, restCalls) {
    $scope.searchValue = "";
    $scope.searchType = "artist";

    $scope.doSearchQuery = function () {
      if ($scope.searchValue && $scope.searchValue.length > 0) {
        restCalls.search($scope.searchValue, $scope.searchType).then(function (results) {
          switch ($scope.searchType) {
            case "artist":
              break;
            case "album":
              results = results.map(function (artist) {
                artist.albums = artist.albums.filter(function (album) {
                  return album.title.toLowerCase().indexOf($scope.searchValue.toLowerCase()) != -1;
                });
                return artist;
              });
              break;
            case "track":
              results = results.map(function (artist) {
                artist.albums = artist.albums.filter(function (album) {
                  album.tracks = album.tracks.filter(function (track) {
                    return track.name.toLowerCase().indexOf($scope.searchValue.toLowerCase()) != -1;
                  });
                  return album.tracks.length != 0;
                });
                return artist;
              });
              break;
          }

          $scope.artists = results;
        });
      } else {
        $scope.artists = [];
      }
    };
  }]);
