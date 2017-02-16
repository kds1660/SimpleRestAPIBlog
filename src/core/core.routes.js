app.config(function ($routeSegmentProvider, $routeProvider, $locationProvider) {

    $routeSegmentProvider

        .when('/main', 's1')
        .when('/view/:name', 's2')
        .when('/view/:name/comments', 's2.comments')
        .when('/view/:name/addComment', 's2.addComment')
        .when('/edit/:name', 's3')
        .when('/add/', 's4')

        .segment('s1', {
            default: true,
            template: '<topic-post ></topic-post>',
            controller: 'topicController',
            controllerAs: 'topic'
        })

        .segment('s2', {
            default: true,
            templateUrl: '/templates/topicView.html',
            controller: 'viewTopicController'
        })
        .within()
        .segment('comments', {
            template: '<comment-view></comment-view>',
            controller: 'commentController',
            contollreAs: 'comment'
        })
        .segment('addComment', {
            templateUrl: '/templates/commentAdd.html',
            controller: 'commentController',
            contollreAs: 'comment'
        })
        .up()
        .segment('s3', {
            default: true,
            templateUrl: '/templates/topicEdit.html',
            controller: 'viewTopicController'
        })

        .segment('s4', {
            default: true,
            templateUrl: '/templates/topicEdit.html',
            controller: 'addTopicController'
        })

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider.otherwise({redirectTo: '/main'});
});