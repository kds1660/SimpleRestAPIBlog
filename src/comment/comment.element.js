app.directive("commentView", function() {
    return {
        restrict : "E",
        templateUrl : "/templates/commentTemplate.html",
        controller:'commentController',
        controllerAs:'comment'
    };
});