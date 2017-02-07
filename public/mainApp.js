var app = angular.module('BlogApp', [
    'loginModule',
    'topicModule',
    'ngResource'
],function () {
});

app.filter('to_html',['$sce',function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);







