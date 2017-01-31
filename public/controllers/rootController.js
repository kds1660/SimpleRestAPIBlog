app.controller('mainController', function($scope,requestService){
    $scope.isLogged=0;
    $scope.setName = function(name){
        $scope.isLogged = name;
    };
});