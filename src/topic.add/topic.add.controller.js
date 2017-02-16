topicModule.controller('addTopicController', function ($scope, topicServices) {
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
    
    $scope.saveTopic = function () {
        $scope.thisTopic.text = tinyMCE.activeEditor.getContent({format: 'raw'});
        if ($scope.thisTopic.imgnew) $scope.thisTopic.img = $scope.thisTopic.imgnew;
        topicServices.update($scope.thisTopic.name, $scope.thisTopic).$promise.then(function () {
            $scope.setSearchParams('name','date','');
        }, function () {
            $scope.setAllert(true, 'Some error!');
        })
    };
});


