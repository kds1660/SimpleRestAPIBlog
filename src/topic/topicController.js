var page = 0;
var limit = 2;
app.controller('topicController', function ($scope, $timeout, topicServices) {

    $scope.init = function () {
        $scope.topic.data = [];
        page = 0;
        $scope.setViewFormat('list');
        topicServices.query({}).$promise.then(
            function (response) {
                $scope.topic.data = response;
            }
        );
    };

    $scope.init();

    $scope.loadMore = function () {
        page++;
        topicServices.query({page: page, limit: limit}).$promise.then(
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
            $scope.setAllert(true, 'Topic deleted!')
            $scope.init();
        });
    };


    $scope.viewTopic = function ($index) {
        $scope.setCurrentTopic($scope.topic.data[$index]);
        $scope.setViewFormat('view');
        topicServices.get({name: $scope.topic.data[$index].name}).$promise.then(function (response) {
            $scope.thisTopic.textFull=response.text;
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
        console.log( $scope.thisTopic)
        $scope.thisTopic.text = tinyMCE.activeEditor.getContent({format: 'raw'});
        if ($scope.thisTopic.imgnew) $scope.thisTopic.img = $scope.thisTopic.imgnew;
        topicServices.update($scope.thisTopic.name, $scope.thisTopic).$promise.then(function () {
            $scope.init();
        }, function () {
            alert('error');
        })
    };

});

