app.controller('loginController',function($scope,$timeout,requestService,buttonService){
    $scope.allert={};
    $scope.login={username:'',password:''};
    requestService.getData(ENUM_Queries.checklogin).then(function (response) {
        $scope.isLogged=response.data;
        $scope.setName(response.data);
    });
    $scope.isAddUser=false;

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
    };

    $scope.registerBtn=function () {
        $scope.login={username:'',password:''};
        $scope.isAddUser=true;
    };

    $scope.addUser=function () {
       if (!$scope.login.username||!$scope.login.password) {
           $scope.allert.text='Login or password null'
           $scope.allertFalse=true;
       } else {
           requestService.getData(ENUM_Queries.addUser,'',$scope.login).then (
               function (response) {
                   $scope.setAllert(true,'User added, try login!');
                   $scope.login={username:'',password:''};
                   $scope.isAddUser=false;
               }, function (response) {
                   $scope.allert.text='User exist!';
                   $scope.allertFalse=true;
               }
           )
       }

        $timeout(function () {
            $scope.allertFalse=false;
            $scope.allertTrue=false;
        },2000);

    };

});