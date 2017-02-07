var page = 0;
var limit = 2;
app.controller('topicController', function ($scope, $timeout, topicServices) {
    function copyObj(obj) {
        var newobj = {};
        for (key in obj) {
            newobj[key] = obj[key]
        }
        return newobj;
    };

    $scope.init = function () {
        $scope.topic.data = [];
        page = 0;
        $scope.viewformat = 'list';
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
        $scope.thisTopic = copyObj($scope.topic.data[$index]);
        $scope.viewformat = 'view';
        topicServices.get({name: $scope.topic.data[$index].name}).$promise.then(function (response) {
            $scope.thisTopic.textFull = response.text;
        });
    };

    $scope.back = function () {
        $scope.viewformat = 'list';
    };

    $scope.edit = function ($index) {
        $scope.viewformat = 'edit';
        $scope.thisTopic = copyObj($scope.topic.data[$index]);
        $scope.thisTopic.oldTopic = $scope.thisTopic.name;
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
            $scope.init();
        }, function () {
            alert('error');
        })
    };

});

