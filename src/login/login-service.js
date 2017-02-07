loginServices=angular.module('loginServices', []);
loginServices.factory('loginService', ['requestService', '$q', function(requestService,$q){
    return {
        login:function (name) {
            var deferred=$q.defer();
            requestService.getData(ENUM_Queries.login,'',name).then(function (data) {
                deferred.resolve(data);
            },function (data,status) {
                deferred.reject(status)
            });
            return deferred.promise;
        },
        isLogged:function () {
            var deferred=$q.defer();
            requestService.getData(ENUM_Queries.checklogin).then(function (data) {
                deferred.resolve(data);
            },function (data,status) {
                deferred.reject(status)
            });
            return deferred.promise;
        },
        logout:function () {
            var deferred=$q.defer();
            requestService.getData(ENUM_Queries.logout).then(function (data) {
                deferred.resolve(data);
            },function (data,status) {
                deferred.reject(status)
            });
            return deferred.promise;
        },
        addUser:function (login) {
            var deferred=$q.defer();
            requestService.getData(ENUM_Queries.addUser,'',login).then(function (data) {
                deferred.resolve(data);
            },function (data,status) {
                deferred.reject(status)
            });
            return deferred.promise;
        }

    }
}]);