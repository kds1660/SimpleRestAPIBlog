topicModule.controller('viewTopicController', function ($scope, $timeout, topicServices,$routeSegment) {
    $scope.thisTopic={};
    topicServices.get({name: $routeSegment.$routeParams.name}).$promise.then(function (response) {
        $scope.thisTopic=response;
        $scope.thisTopic.commentsFull=response.comments;
        $scope.thisTopic.comments=response.comments.length;
        $scope.thisTopic.textFull=response.text;


        if($routeSegment.$routeParams.edit) {
            $scope.name='Edit topic';
            $scope.thisTopic.oldTopic=$scope.thisTopic.name;
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
        }
    });

    $scope.saveTopic = function () {
        $scope.thisTopic.text = tinyMCE.activeEditor.getContent({format: 'raw'});
        if ($scope.thisTopic.imgnew) $scope.thisTopic.img = $scope.thisTopic.imgnew;
        topicServices.update($scope.thisTopic.name, $scope.thisTopic).$promise.then(function () {
            $scope.setSearchParams('name','date','');
        }, function () {
            alert('error');
        })
    };
});


