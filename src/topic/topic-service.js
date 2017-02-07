topicServices=angular.module('topicServices', []);
topicServices.factory('topicService', ['requestService', '$q', function(requestService,$q){
    return {
        getAlltopics:function (page,limit) {
            var deferred=$q.defer();
            requestService.getData(ENUM_Queries.getAllTopics).then(function (data) {
                deferred.resolve(data);
            },function (data,status) {
                deferred.reject(status)
            });
            return deferred.promise;
        },
        deleteTopic:function (name) {
            var deferred=$q.defer();
            requestService.getData(ENUM_Queries.delTopic,name).then(function (data) {
                deferred.resolve(data);
            },function (data,status) {
                deferred.reject(status)
            });
            return deferred.promise;
        },
        selectOneTopic:function (name) {
            var deferred=$q.defer();
            requestService.getData(ENUM_Queries.selectOneTopic,name).then(function (data) {
                deferred.resolve(data);
            },function (data,status) {
                deferred.reject(status)
            });
            return deferred.promise;
        },
        saveTopic:function (name,topic) {
            //  requestService.getData(ENUM_Queries.editTopic,$scope.thisTopic.name,$scope.thisTopic)
            var deferred=$q.defer();
            requestService.getData(ENUM_Queries.editTopic,name,topic).then(function (data) {
                deferred.resolve(data);
            },function (data,status) {
                deferred.reject(status)
            });
            return deferred.promise;
        }
    }
}]);