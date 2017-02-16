loginModule.controller('loginController',function($scope,$timeout,loginServices,$rootScope){
    $scope.login={username:'',password:''};
    loginServices.get({name:'logged'}).$promise.then(function (response) {
        $scope.setName(response.data);
    });
    $scope.isAddUser=false;

    $scope.loginBtn=function () {
        window.scroll(0,0);
        loginServices.save($scope.login).$promise.then(function (response) {
            $scope.isLogged=response.username;
            $scope.setName(response.username);
                $scope.login={};
            $scope.setAllert(true, 'Logged!!')

        },function (response) {
            $scope.setAllert(false, 'Check login/password or register')
        });
    };

    $scope.logoutBtn=function () {
        window.scroll(0,0);
        loginServices.get({name:'logout'}).$promise.then(function (response) {
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
           $scope.setAllert(false,'Login or password null');
       } else {
           loginServices.update($scope.login).$promise.then (
               function (response) {
                   $scope.setAllert(true,'User added, try login!');
                   $scope.login={username:'',password:''};
                   $scope.isAddUser=false;
                   $timeout(function () {
                       $rootScope.allertFalse=false;
                       $rootScope.allertTrue=false;
                   },2000);
               }, function (response) {
                   $scope.setAllert(false,'User exist!');
               }
           )
       }
    };

    $scope.addTopicBtn=function () {
        $scope.setCurrentTopic({});
        $scope.thisTopic.date=Date();
        $scope.thisTopic.author=$scope.isLogged;
        $scope.setViewFormat('edit');

       setTimeout(function () {
           tinymce.init({
               width: "100%",
               height: "100%",
               selector: 'textarea',
               force_br_newlines: false,
               force_p_newlines: false,
               forced_root_block: ''
           })
       },100)
    };

});