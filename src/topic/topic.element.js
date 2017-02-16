app.directive("topicPost", function() {
    return {
        restrict : "E",
        templateUrl : "templates/topicTemplate.html",
        controller:'topicController',
        controllerAs:'topic'
    };
});