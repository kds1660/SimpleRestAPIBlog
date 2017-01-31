var app = angular.module('BlogApp', []);

app.filter('to_html',['$sce',function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);







