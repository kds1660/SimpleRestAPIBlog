var app = angular.module('BlogApp', [
    'loginModule',
    'topicModule',
    'commentModule',
    'ngResource'
],function () {
});

app.filter('to_html',['$sce',function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

app.run(['$rootScope',function($rootScope) {
    $rootScope.isLogged=0;
    $rootScope.page = 0;
    $rootScope.limit = 2;
    $rootScope.setDefaultSearchParams={
        'tabSelect':'name',
        'tabSort':'date',
        'search':''
    };

    $rootScope.setPage=function (page) {
        $rootScope.page=page;
    };

    $rootScope.setSearchParams=function (select,sort,keyworld) {
        if (select) $rootScope.setDefaultSearchParams.tabSelect=select;
        if (sort) $rootScope.setDefaultSearchParams.tabSort=sort;
        if (keyworld||keyworld==='') $rootScope.setDefaultSearchParams.search=keyworld;
    };

    $rootScope.setName = function(name){
        $rootScope.isLogged = name;
    };

    $rootScope.setViewFormat= function (format) {
        $rootScope.viewformat=format;
    };

    $rootScope.setCurrentTopic= function (data) {
        $rootScope.thisTopic=data;
    };

    $rootScope.viewformat='';
    $rootScope.setAllert=function (trueFalse,text,$timeout) {
        $rootScope.alert={};
        if (trueFalse===true) {
            $rootScope.allertTrue=true;
            $rootScope.alert.text=text;
        };
        if (trueFalse===false) {
            $rootScope.allertFalse=true
            $rootScope.alert.text=text;
        };
    }
}]);







