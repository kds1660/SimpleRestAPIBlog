app.controller('topicController', function($scope,requestService){
    requestService.getData(ENUM_Queries.getAllTopics).then(function (response) {
        $scope.topic.data=response.data;
        console.log($scope.topic.data)
    });
    $scope.loadMore=function () {
        page++;
        requestService.loadMore(ENUM_Queries.getAllTopics).then(function (response) {
            $scope.topic.data=$scope.topic.data.concat(response.data);
        },function () {
            $scope.topicAllert=true;
        })
    };
});
