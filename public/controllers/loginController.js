app.controller('loginController',function($scope,$timeout,requestService,buttonService){
    $scope.allert={};
    $scope.login={username:'',password:''};
    requestService.getData(ENUM_Queries.checklogin).then(function (response) {
        $scope.isLogged=response.data;
        $scope.setName(response.data);
    });

    $scope.loginBtn=function () {
        requestService.getData(ENUM_Queries.login,'',$scope.login).then(function (response) {
            $scope.isLogged=response.data.username;
            $scope.setName(response.data.username);
                $scope.login={};
            $scope.allert.text='You logged'
            $scope.allertTrue=true;

        },function (response) {
            $scope.allert.text='Check login/password or register'
            $scope.allertFalse=true;
        });
        $timeout(function () {
            $scope.allertFalse=false;
                $scope.allertTrue=false;
        },2000)

    };
    $scope.logoutBtn=function () {
        requestService.getData(ENUM_Queries.logout).then(function (response) {
            $scope.isLogged=0;
            $scope.setName(0);
        })
    }
});