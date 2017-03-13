topicModule.controller('addTopicController', function ($scope,$location, topicServices) {
    $scope.name='Add topic';
    $scope.thisTopic={};
    $scope.thisTopic.date=new Date();
    $scope.thisTopic.author=$scope.isLogged;
    setTimeout(function () {
        tinymce.init({
            width: "100%",
            height: "100%",
            selector: 'textarea',
            force_br_newlines: false,
            force_p_newlines: false,
            forced_root_block: ''
        });
    }, 0);

    $scope.saveTopic = function (event) {
        $scope.thisTopic.text = tinyMCE.activeEditor.getContent({format: 'raw'});
        if ($scope.thisTopic.imgnew) $scope.thisTopic.img = $scope.thisTopic.imgnew;
        topicServices.update($scope.thisTopic.name, $scope.thisTopic).$promise.then(function () {
            $scope.setAllert(true, 'Topic added');
            $scope.setSearchParams('name','date','');
            $location.path('/main');
        }, function () {
            $scope.setAllert(false, 'Error! '+error.statusText);
        })
    };
});


