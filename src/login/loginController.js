loginModule.controller('loginController',function($scope,$timeout,loginServices){
    $scope.allert={};
    $scope.login={username:'',password:''};
    loginServices.get({name:'logged'}).$promise.then(function (response) {
        $scope.isLogged=response.data;
        $scope.setName(response.data);
    });
    $scope.isAddUser=false;

    $scope.loginBtn=function () {
        loginServices.save($scope.login).$promise.then(function (response) {
            $scope.isLogged=response.username;
            $scope.setName(response.username);
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
        loginServices.get({name:'logout'}).$promise.then(function (response) {
            $scope.isLogged=0;
            $scope.setName(0);
            $scope.setViewFormat('list');
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
           loginServices.update($scope.login).$promise.then (
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

    $scope.addTopicBtn=function () {
        $scope.setCurrentTopic('');
        $scope.thisTopic.date=Date();
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