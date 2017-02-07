var loginElement = angular.module('loginElement', []);
app.directive("loginLogout",function() {
    return {
        scope:false,
        restrict : "E",
        templateUrl : "templates/loginTemplate.html",
    };
});