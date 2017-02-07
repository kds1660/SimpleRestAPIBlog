var app = angular.module('BlogApp', [
    'blogServices',
    'loginModule',
    'topicModule'
],function () {
});

app.filter('to_html',['$sce',function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);







