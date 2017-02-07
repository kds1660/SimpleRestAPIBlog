app.controller('mainController', function($scope,$timeout){
    $scope.isLogged=0;
    $scope.alert={};
    $scope.alert.text='s';
    $scope.setName = function(name){
        $scope.isLogged = name;
    };
    $scope.setViewFormat= function (format) {
        $scope.viewformat=format;
    };

    $scope.setCurrentTopic= function (data) {
            newobj = {};
            for (key in data) {
                newobj[key] = data[key]
            }
            $scope.thisTopic=newobj;
            console.log( $scope.thisTopic)
    };



    $scope.viewformat='';
    $scope.setAllert=function (trueFalse,text) {
        console.log(trueFalse,text)
        if (trueFalse===true) {
            $scope.allertTrue=true;
            $scope.alert.text=text;
        };
        if (trueFalse===false) {
            $scope.allertFalse=true
            $scope.alert.text=text;
        };
        $timeout(function () {
            $scope.allertFalse=false;
            $scope.allertTrue=false;
        },2000);

    }
});