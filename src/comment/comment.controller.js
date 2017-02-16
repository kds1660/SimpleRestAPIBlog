app.controller('commentController', function ($scope, $timeout, commentServices,topicServices) {
    tinymce.remove();
    if (!tinymce.activeEditor){
        setTimeout(function () {
            tinymce.init({
                width: "100%",
                height: "100%",
                selector: 'textarea',
                force_br_newlines: false,
                force_p_newlines: false,
                forced_root_block: ''
            });

        },10);
    }
    $scope.deleteComment = function ($index) {
        commentServices.delete({
            commentID:$scope.thisTopic.commentsFull[$index]._id},
            {topicName: $scope.thisTopic.name})
            .$promise.then(function () {
            $scope.thisTopic.comments=$scope.thisTopic.comments-1;
            $scope.thisTopic.commentsFull.splice($index, 1);
            $scope.setAllert(true, 'Comment deleted!');
        });
    };

    $scope.editComment = function ($index,$element) {
        angular.element(document.querySelectorAll('.panel-body')[$index]).addClass('selected')

       if (!tinymce.activeEditor) {
           $scope.thisTopic.commentsFull[$index].state='edit';
            tinymce.init({
                width: "100%",
                height: "100%",
               selector:'.selected',
                force_br_newlines: false,
                force_p_newlines: false,
                forced_root_block: ''
            });
        }
    };

    $scope.saveComment = function ($index,$element) {

        commentServices.update({commentID:$scope.thisTopic.commentsFull[$index]._id},{
            name: $scope.thisTopic.name,
            text:tinyMCE.activeEditor.getContent({format: 'raw'})
        }).$promise.then(function () {
            $scope.setAllert(true, 'Comment edited!');
            angular.element(document.querySelectorAll('.panel-body')[$index]).removeClass('selected');
            $scope.thisTopic.commentsFull[$index].state='view';
            tinymce.remove();
        }, function () {
            alert('error');
        })
    };


    $scope.addNewComment = function ($index,$element) {
        if (!tinymce.activeEditor){
       setTimeout(function () {
               tinymce.init({
                   width: "100%",
                   height: "100%",
                   selector: 'textarea',
                   force_br_newlines: false,
                   force_p_newlines: false,
                   forced_root_block: ''
               });

       },10);
        }
    };

    $scope.saveNewComment = function ($index,$element) {
        commentServices.update({commentID:$scope.thisTopic.name},{
            new: 'new',
            text:tinyMCE.activeEditor.getContent({format: 'raw'})
        }).$promise.then(function () {
            $scope.addComment=false;
            tinymce.remove();
            $scope.setAllert(true, 'Comment added!');
            $scope.thisTopic.comments=$scope.thisTopic.comments+1;
            topicServices.get({name: $scope.thisTopic.name}).$promise.then(function (response) {
                $scope.thisTopic.commentsFull=response.comments;
            });

        }, function () {
            alert('error');
        })

    };
});

/*
*/
