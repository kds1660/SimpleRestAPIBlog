topicModule.controller('topicController', function($scope,$timeout,topicService){
    function copyObj (obj) {
        var newobj={};
        for (key in obj) {newobj[key]=obj[key]}
        return newobj;
    };

   $scope.init=function () {
       $scope.topic.data=[];
       page=0;
       $scope.viewformat='list';
       topicService.getAlltopics(ENUM_Queries.getAllTopics).then(function (response) {
           $scope.topic.data=response.data;
       });
   };

    $scope.init();

    $scope.loadMore=function () {
        page++;
        topicService.getAlltopics(ENUM_Queries.getAllTopics).then(function (response) {
            $scope.topic.data=$scope.topic.data.concat(response.data);
        },function () {
            $scope.topicAllert=true;
            $timeout(function () {
                $scope.topicAllert=false;
            },2000);
        });
    };

    $scope.deleteTopic=function ($index) {
        topicService.deleteTopic($scope.topic.data[$index].name).then(function () {
            $scope.topic.data.splice($index, 1);
            $scope.setAllert(true,'Topic deleted!')
            $scope.init();
        });

    };



    $scope.viewTopic=function ($index) {
        $scope.thisTopic=copyObj($scope.topic.data[$index]);
        $scope.viewformat='view';
        topicService.selectOneTopic($scope.topic.data[$index].name).then(function (response) {
            $scope.thisTopic.textFull=response.data.text;
        });
    };

    $scope.back=function () {
        $scope.viewformat='list';
    };

    $scope.edit=function ($index) {
        $scope.viewformat='edit';
        $scope.thisTopic=copyObj($scope.topic.data[$index]);
        $scope.thisTopic.oldTopic=$scope.thisTopic.name;
        topicService.selectOneTopic($scope.thisTopic.name).then(function (response) {
            $scope.thisTopic.textFull=response.data.text;

            tinymce.init({
              width: "100%",
              height: "100%",
              selector: 'textarea',
              force_br_newlines: false,
              force_p_newlines: false,
              forced_root_block: ''
          });
           setTimeout(function () {
               if (tinyMCE.activeEditor) tinyMCE.activeEditor.setContent((response.data.text));
           }, 300);
        });
    };

    $scope.SaveTopic=function () {
        $scope.thisTopic.text=tinyMCE.activeEditor.getContent({format: 'raw'});
        if ($scope.thisTopic.imgnew) $scope.thisTopic.img=$scope.thisTopic.imgnew;
        topicService.saveTopic($scope.thisTopic.name,$scope.thisTopic).then (function () {
            $scope.init();

        },function () {
            alert('error');
        })

    }

});

