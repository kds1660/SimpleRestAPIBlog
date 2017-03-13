commentServices=angular.module('commentServices', []);
commentServices.factory('commentServices', ['$resource' , function($resource){
return $resource('/api/comments/:commentID',{commentID:'@commentID',topicName:'@topicName'},{
    'update':{method:'PUT'}
});
}]);