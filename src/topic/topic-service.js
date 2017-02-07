topicServices=angular.module('topicServices', []);
topicServices.factory('topicServices', ['$resource' , function($resource){
return $resource('/api/topic/:name',{name:'@name'},{
    'update':{method:'PUT'}
});
}]);