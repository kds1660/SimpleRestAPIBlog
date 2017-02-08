app.controller('mainController', function($scope,$timeout){
    $scope.isLogged=0;
    $scope.alert={};
    $scope.alert.text='';

    $scope.setDefaultSearchParams=function () {
        $scope.tabSelect='name';
        $scope.tabSort='date';
        $scope.search='';
    };
    $scope.setDefaultSearchParams();

    $scope.setSearchParams=function (select,sort,keyworld) {
       if (select) $scope.tabSelect=select;
       if (sort) $scope.tabSort=sort;
       if (keyworld) $scope.search=keyworld;
    };

    $scope.setName = function(name){
        $scope.isLogged = name;
    };

    $scope.setViewFormat= function (format) {
        $scope.viewformat=format;
    };

    $scope.setCurrentTopic= function (data) {
            $scope.thisTopic=data;
    };



    $scope.viewformat='';
    $scope.setAllert=function (trueFalse,text) {
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