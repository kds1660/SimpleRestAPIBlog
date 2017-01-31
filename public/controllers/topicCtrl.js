app.controller('topicController', function($scope,requestService){
    console.log($scope.isLogged)
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
});




