var ENUM_Queries = {
    getAllTopics:'getTopicAll',
    checklogin:'chekLogin',
    selectOneTopic:'selectOneTopic',
    delTopic:'deleteTopic',
    delComm:'deleteComment',
    editTopic:'editTopic',
    addUser:'addUser',
    login:'login',
    logout:'logout',
    viewComment:'viewComment',
    putComment:'putComment'
};

var page=0;
var limit=2;

app.factory('requestService', function($http){

    var factory={};

    factory.getTopicAll= {
        url: "/api/topic",
        method: "GET",
        dataType: "json",
        data:{}
    };

    factory.chekLogin= {
        url: "/api/login/logged",
        method: "GET"
    };

    factory.selectOneTopic = {
        url: "/api/topic/",
        method: "GET",
        dataType: "json"
    };

    factory.deleteTopic={
        url: "/api/topic/",
        method: "DELETE"
    };

    factory.deleteComment= {
        url: "/api/comments/",
        method: "DELETE"
    };

    factory.editTopic= {
        url: "/api/topic/",
        method: "PUT"
    };

    factory.addUser = {
        url: "/api/login/",
        method: "PUT"
    };

    factory.login = {
        url: "/api/login/",
        method: "POST",
        dataType: "json"
    };

    factory.logout = {
        url: "/api/login/logout",
        method: "GET"
    };

    factory.viewComment = {
        url: "/api/comments/" ,
        method: "GET",
        dataType: "json"
    };

    factory.putComment={
        url: "/api/comments/",
        method: "PUT"
    };


    factory.getData=function (query,url,data) {
        /*query=ENUM_Queries[query];*/
        url=url||'';
        data=data||'';
        factory[query].params=data;
        factory[query].url=factory[query].url+url;
        return $http(factory[query])
    };

    factory.loadMore=function (query,url,data) {
        url=url||'';
        factory[query].params={page:page,limit:limit};
        factory[query].url=factory[query].url+url;
        factory[query].data=data;
        return $http(factory[query])
    };

    return factory;
});

app.factory('buttonService', function(requestService){
    var factory={};
    var _data;
    var scope={};
    factory.setScope=function (insertScope) {
      //  scope=insertScope;
    };

    factory.getScope=function () {
        return scope;
    };
    factory.viewBtn = angular.element('<input class="viewButton btn btn-info" type="button" value="View">');
    factory.viewBtn.clicked=function () {
      alert('In progress')


    };
    factory.registerBtn = angular.element('<input class="registerButton btn btn-success" type="button" value="Register">');
    factory.registerBtn.clicked=function () {
        alert('not complete')
    };
    factory.getButton=function (button) {
      return factory[button];
    }
    /*factory.loginBtn.setData=function (data) {
    _data=data;
    };
    factory.loginBtn.getData=function () {
        return _data;
    };*/

    return factory;
});
