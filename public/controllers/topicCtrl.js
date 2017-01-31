app.controller('topicController', function($scope,requestService){
    requestService.getData(ENUM_Queries.getAllTopics).then(function (response) {
        $scope.topic.data=response.data;
    });
    $scope.loadMore=function () {
        page++;
        requestService.loadMore(ENUM_Queries.getAllTopics).then(function (response) {
            $scope.topic.data=$scope.topic.data.concat(response.data);
        },function () {
            $scope.topicAllert=true;
        })
    };

    $scope.deleteTopic=function ($index) {
        console.log( $scope.topic.data[$index].name);
        requestService.getData(ENUM_Queries.delTopic,$scope.topic.data[$index].name)
        $scope.topic.data.splice($index, 1);

    }
});



