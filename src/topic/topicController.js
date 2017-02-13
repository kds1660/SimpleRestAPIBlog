
topicModule.controller('topicController', function ($scope, $timeout, topicServices) {
    $scope.init = function () {
        var requestParams={
            page:0,
            limit:limit,
            keyworld:$scope.setDefaultSearchParams.search,
            findBy:$scope.setDefaultSearchParams.tabSelect,
            sortBy:$scope.setDefaultSearchParams.tabSort
        };
        $scope.setPage(0);
        $scope.topic.data = [];
        $scope.setViewFormat('list');
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
        $scope.page++;
        var requestParams={
            page:$scope.page,
            limit:limit,
            keyworld:$scope.setDefaultSearchParams.search,
            findBy:$scope.setDefaultSearchParams.tabSelect,
            sortBy:$scope.setDefaultSearchParams.tabSort
        };
        console.log(requestParams)
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

    $scope.back = function () {
        $scope.setViewFormat('list');
    };

    $scope.edit = function ($index) {
        $scope.setViewFormat('edit');
        $scope.setCurrentTopic($scope.topic.data[$index]);
        $scope.thisTopic.oldTopic=$scope.thisTopic.name;
        topicServices.get({name: $scope.thisTopic.name}).$promise.then(function (response) {
            $scope.thisTopic.textFull = response.text;

            tinymce.init({
                width: "100%",
                height: "100%",
                selector: 'textarea',
                force_br_newlines: false,
                force_p_newlines: false,
                forced_root_block: ''
            });
            setTimeout(function () {
                if (tinyMCE.activeEditor) tinyMCE.activeEditor.setContent((response.text));
            }, 300);
        });
    };

    $scope.SaveTopic = function () {
        $scope.thisTopic.text = tinyMCE.activeEditor.getContent({format: 'raw'});
        if ($scope.thisTopic.imgnew) $scope.thisTopic.img = $scope.thisTopic.imgnew;
        topicServices.update($scope.thisTopic.name, $scope.thisTopic).$promise.then(function () {
            $scope.setSearchParams('name','date','');
            $scope.init();
        }, function () {
            alert('error');
        })
    };

});


