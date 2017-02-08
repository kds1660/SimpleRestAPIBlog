topicModule.controller('panelController', function ($scope) {

    $scope.search=function () {
        $scope.setSearchParams('','',$scope.panel.search);
        $scope.$$prevSibling.init();
    };

    $scope.selectSelector=function (tab) {
        $scope.tabSelect=tab;
        $scope.setSearchParams(tab)
    };

    $scope.isSelectSelector=function (tab) {
        return $scope.tabSelect===tab;
    };

    $scope.selectSort=function (tab) {
        $scope.tabSort=tab;
        $scope.setSearchParams('',tab)
    };

    $scope.isSelectSort=function (tab) {
        return $scope.tabSort===tab;
    }
});