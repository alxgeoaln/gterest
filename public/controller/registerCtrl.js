app.controller('registerCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.register = function () {
        $http.post('/register/', {
            username: $scope.username,
            password: $scope.password
        }).success(function () {
        })
    }
}]);