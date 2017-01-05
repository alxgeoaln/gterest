app.controller('gterest', ['$scope', '$http', function($scope, $http){


    $scope.saveGterest = function(){
        var gterest = {
            img : $scope.image,
            title: $scope.alt
        };

        $http.post('/gterest/gterest', gterest).then(function(){
            refresh();
        });
    };

    var refresh = function() {
        $http.post('/gterest/').then(function (results) {
            console.log(results);
            $scope.gterestList = results.data;
            console.log($scope.gterestList);
        });
    };

    $scope.deleteGterest = function(gterest){
        console.log(gterest);
        $http.post('/gterest/deleteGterest',{
            gterestID : gterest._id
        }).then(function(){
            refresh();
        })
    };

    $scope.clearAddGterest = function(){
        $scope.alt = null;
        $scope.image = null;
    };


    refresh();
}]);