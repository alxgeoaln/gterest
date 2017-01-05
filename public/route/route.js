app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'allGterest.html',
            controller: 'allGterest',
        })
        .when("/gterest",{
        templateUrl: 'gterest.html',
        controller: 'gterest'
    })
        .when('/userProfile',{
            templateUrl: 'userProfile.html',
            controller: 'allGterest'
        })
}]);
