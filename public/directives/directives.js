app.directive("topicPost", function(buttonService) {
    return {
        restrict : "E",
        templateUrl : "templates/topicTemplate.html",
    };
});

app.directive("loginLogout",function(buttonService) {
    return {
        scope:false,
        restrict : "E",
        templateUrl : "templates/loginTemplate.html",


    };
});

app.directive("whenScrolled", function($window) {
    function getDocHeight() {
        var D = document;
        return Math.max(
            Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
            Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
            Math.max(D.body.clientHeight, D.documentElement.clientHeight)
        );
    }
   return function (scope, elm, attr) {
       var raw=elm[0];
       angular.element($window).bind('scroll',function () {
           if (getDocHeight() <= $window.pageYOffset+ $window.innerHeight+1) {
            scope.$apply(attr.whenScrolled);
           }
       })
   }
});