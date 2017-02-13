topicModule.controller('panelController', function ($scope) {

    $scope.search=function () {
        $scope.setPage(0);
        $scope.setSearchParams('','',$scope.panel.search);
        $scope.$$nextSibling.$parent.init();
    };

    $scope.selectSelector=function (tab) {
        $scope.setDefaultSearchParams.tabSelect=tab;
        $scope.setSearchParams(tab)
    };

    $scope.isSelectSelector=function (tab) {
        return $scope.setDefaultSearchParams.tabSelect===tab;
    };

    $scope.selectSort=function (tab) {
        $scope.setDefaultSearchParams.tabSort=tab;
        $scope.setSearchParams('',tab)
    };

    $scope.isSelectSort=function (tab) {
        return $scope.setDefaultSearchParams.tabSort===tab;
    }
});