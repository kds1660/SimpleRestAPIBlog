loginServices=angular.module('loginServices', []);
loginServices.factory('loginServices', ['$resource',function($resource){
    return $resource('/api/login/:name',{name:'@name'},{
        'update':{method:'PUT'},
        'get':{
            method:'get',
            transformResponse:function (data) {
             return {data:data}
            },
            'update':{method:'PUT'}
        }
    });
}]);