function requestService (query,url,data) {
    var custom={};
    custom.getTopicAll= {
        url: "/api/topic",
        type: "GET",
        dataType: "json",
        data:data
    };
    custom.chekLogin= {
        url: "/api/login/logged",
        type: "GET"
    };
    custom.selectOneTopic = {
        url: "/api/topic/" + url,
        type: "GET",
        dataType: "json"
    };
    custom.deleteTopic={
        url: "/api/topic/" + url,
        type: "DELETE"
    };
    custom.deleteComment= {
        url: "/api/comments/" + url,
        type: "DELETE",
        data: data
    };
    custom.editTopic= {
        url: "/api/topic/" + url,
        type: "PUT",
        data: data
    };

    custom.addUser = {
        url: "/api/login/",
        type: "PUT",
        data: data
    };

    custom.login = {
        url: "/api/login/",
        type: "POST",
        data: data,
        dataType: "json"
    };

    custom.logout = {
        url: "/api/login/logout",
        type: "GET"
    };

    custom.viewComment = {
        url: "/api/comments/" + url,
        type: "GET",
        dataType: "json"
    };

    custom.putComment={
        url: "/api/comments/" + url,
        type: "PUT",
        data: data
    };
    return $.ajax(custom[query]);
}
