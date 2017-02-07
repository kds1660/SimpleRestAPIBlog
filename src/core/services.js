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

var blogServices=angular.module('blogServices', []);
blogServices.factory('requestService', function($http){

    var factory={};

    factory.getTopicAll= {
        urlT: "/api/topic",
        method: "GET",
        dataType: "json",
        data:{}
    };

    factory.chekLogin= {
        urlT: "/api/login/logged",
        method: "GET"
    };

    factory.selectOneTopic = {
        urlT: "/api/topic/",
        method: "GET",
        dataType: "json"
    };

    factory.deleteTopic={
        urlT: "/api/topic/",
        method: "DELETE"
    };

    factory.deleteComment= {
        urlT: "/api/comments/",
        method: "DELETE"
    };

    factory.editTopic= {
        urlT: "/api/topic/",
        method: "PUT"
    };

    factory.addUser = {
        urlT: "/api/login/",
        method: "PUT",
        dataType: "json"
    };

    factory.login = {
        urlT: "/api/login/",
        method: "POST",
        dataType: "json"
    };

    factory.logout = {
        urlT: "/api/login/logout",
        method: "GET"
    };

    factory.viewComment = {
        urlT: "/api/comments/" ,
        method: "GET",
        dataType: "json"
    };

    factory.putComment={
        urlT: "/api/comments/",
        method: "PUT"
    };


    factory.getData=function (query,url,data) {
        url=url||'';
        data=data||'';
        factory[query].data=data;
        factory[query].params={page:page,limit:limit};
        factory[query].url=factory[query].urlT+url;
        return $http(factory[query])
    };

    factory.loadMore=function (query,url,data) {
        url=url||'';
        console.log(page)
        factory[query].params={page:page,limit:limit};
        factory[query].url=factory[query].url+url;
        factory[query].data=data;
        return $http(factory[query])
    };

    return factory;
});



