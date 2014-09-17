angular.module("app.services")
  .factory("restCallCache", ["$cacheFactory", function ($cacheFactory) {
    return $cacheFactory("api:cache");
  }])
  .factory("restCalls", ["$http", "restCallCache", function ($http, restCallCache) {
    return {
      search: function (name, type) {
        return $http.get("http://music.unilius.com/api/search/" + type, {
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
