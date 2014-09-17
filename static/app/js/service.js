angular.module("app.services")
  .factory("restCallCache", ["$cacheFactory", function ($cacheFactory) {
    return $cacheFactory("api:cache");
  }])
  .factory("restCalls", ["$http", "restCallCache", function ($http, restCallCache) {
    return {
      searchArtist: function (name) {
        return $http.get("http://music.unilius.com/api/search/artist", {
          params: {
            q: name
          },
          cache: restCallCache
        }).then(function (response) {
          return response.data;
        });
      }
    };
  }]);
