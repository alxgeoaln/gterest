app.controller('allGterest', ['$scope', '$http', '$window', '$rootScope', '$cookies', '$cookieStore', function ($scope, $http, $window, $rootScope, $cookies, $cookieStore) {

    var refresh = function () {
        $http.post('/').then(function (results) {
            console.log(results);
            $scope.allGterestList = results.data;
        });
    };

    var refreshRaiting = function () {
        $http.post('/').then(function (results) {
            console.log(results);
            $scope.allRaiting = results.data;
            console.log($scope.allRaiting);
        });
    };
    refreshRaiting();

    refresh();
    $scope.seeProfile = function (gterest) {
        console.log(gterest);
        var user = gterest.author;
        refreshUserProfile = function () {
            $http.post('/userProfile/', {user: user}).then(function (results) {
                $rootScope.userProfileList = results.data;
                $cookieStore.put('userProfile', $rootScope.userProfileList);
                var profileList = $cookieStore.get('userProfile');
                console.log(profileList);
            })
        };
        refreshUserProfile();
    };

    //#region Check user is logged in
    $http.get('/checkLogin')
        .success(function (data) {
            console.log(data);
            $rootScope.loggedIn = data;
        });
    //#end

    //#region Get user profile name
    $http.get('/profileName')
        .success(function (data) {
            console.log(data);
            $rootScope.profileName = data;
        });
    //#endregion

//    #region Give like


    $scope.like = {};
    $scope.like.votes = 0;

    //$scope.doVote = function (raiting) {
    //    $http.post('/like').success(function (user) {
    //
    //        $scope.isTrue = user[0].local.like;
    //        console.log("$scope.like: " + $scope.isTrue);
    //        if ($scope.isTrue == true) {
    //            delete $scope.isTrue;
    //            $scope.like.votes--;
    //            $http.post('/raiting', {
    //                id: user[0]._id,
    //                idPicture: raiting._id,
    //                like: $scope.like.votes,
    //                isTrue: false
    //            }).then(function () {
    //                refreshRaiting();
    //            });
    //            console.log("$scope.like.votes: " + $scope.like.votes)
    //        } else {
    //            $scope.like.userVotes = 1;
    //            $scope.like.votes++;
    //            $http.post('/raiting', {
    //                id: user[0]._id,
    //                idPicture: raiting._id,
    //                like: $scope.like.votes,
    //                isTrue: true
    //            }).then(function () {
    //                refreshRaiting();
    //            })
    //        }
    //    })
    //}

    $scope.doVote = function (gterest) {
        $scope.pictureId = gterest._id;
        $http.post('/like').success(function (user) {
            $scope.userId = user[0]._id;
            $http.post('/raitingFind', {id: $scope.userId}).success(function (raitingFind) {
                console.log(raitingFind);
                if(raitingFind.data = false){
                    $scope.raiting = 1;
                    $http.post('/raitingUpdate',{
                        id: $scope.userId,
                        pictureId: $scope.pictureId,
                        raiting: $scope.raiting
                    })
                } else {
                    $scope.raiting = -1;
                    $http.post('/raitingUpdate',{
                        id: $scope.userId,
                        pictureId: $scope.pictureId,
                        raiting: $scope.raiting
                    }).then(function(){
                        $http.post('/deletePost',{})
                    })
                }
            })
        });

    };

}]);