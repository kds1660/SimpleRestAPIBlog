
topicModule.controller('topicController', function ($scope, $timeout, topicServices) {
    $scope.init = function () {
        $scope.setPage(0);
        window.scroll(0,0);
        $scope.topic={};
        var requestParams={
            page:$scope.page,
            limit:$scope.limit,
            keyworld:$scope.setDefaultSearchParams.search,
            findBy:$scope.setDefaultSearchParams.tabSelect,
            sortBy:$scope.setDefaultSearchParams.tabSort
        };

        $scope.topic.data = [];
        topicServices.query(requestParams).$promise.then(
            function (response) {
                $scope.topic.data = response;
            },
            function () {
                $scope.topic.data = [];
            }
        );
    };
    $scope.init();
    $scope.loadMore = function () {
        $scope.setPage($scope.page+1);
        var requestParams={
            page:$scope.page,
            limit:$scope.limit,
            keyworld:$scope.setDefaultSearchParams.search,
            findBy:$scope.setDefaultSearchParams.tabSelect,
            sortBy:$scope.setDefaultSearchParams.tabSort
        };
        topicServices.query(requestParams).$promise.then(
            function (response) {
                $scope.topic.data = $scope.topic.data.concat(response);
            }, function (response) {
                $scope.topicAllert = true;
                $timeout(function () {
                    $scope.topicAllert = false;
                }, 2000);
            }
        );
    };

    $scope.deleteTopic = function ($index) {
        topicServices.delete({name: $scope.topic.data[$index].name}).$promise.then(function () {
            $scope.topic.data.splice($index, 1);
            $scope.setAllert(true, 'Topic deleted!');
            $timeout(function () {
                $scope.allertFalse=false;
                $scope.allertTrue=false;
            },2000);
            $scope.init();
        });
    };


    $scope.viewTopic = function ($index) {
        $scope.setCurrentTopic($scope.topic.data[$index],$index);
        $scope.setViewFormat('view');
        topicServices.get({name: $scope.topic.data[$index].name}).$promise.then(function (response) {
            $scope.thisTopic.textFull=response.text;
            $scope.thisTopic.commentsFull=response.comments;
        });
    };
});


