var ENUM_BTN = {
    add: 'saveBtn',
    delete: 'delBtn',
    edit: 'editBtn',
    save: 'saveBtn',
    login: 'loginBtn',
    exit: 'logoutBtn',
    view: 'viewBtn',
    addTopic: 'addTopicBtn',
    register: 'registerBtn',
    addUser: 'addUserBtn',
    viewComments: 'viewCommentsBtn',
    addComments: 'addCommentsBtn',
    deleteComment: 'deleteComment',
    editComment: 'editComment',
    saveComment: 'saveComment'
};

var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};

function showAllert(success, message, selector) {

    if (success) {
        selector = $(selector);
        selector = selector.find('.alert-success');
        if (selector.length === 0) selector = $('.alert-success');
        selector.html(message)
            .show()
            .focus();
        setTimeout(function () {
            $(selector).hide();
        }, 1500);
    } else {
        selector = $(selector);
        selector = selector.find('.alert-danger');
        if (selector.length === 0) selector = $('.alert-danger');
        selector.html(message)
            .show()
            .focus();

        setTimeout(function () {
            $(selector).hide();
        }, 1500);
    }
}

function initAndModal() {
    init();
    $("#myModal").removeClass("in")
        .hide();
    $(".modal-backdrop").remove();
    $("body").removeClass("modal-open");
}
function getContent(page,limit,keyworld) {
    request= $.ajax({
        url: "/api/topic",
        type: "GET",
        dataType: "json",
        data:{page:page,limit:limit,keyworld:keyworld}
    });
    return request
}

function init(keyworld) {
    var keyworld=keyworld||'';
    page=1;
    request1= getContent('','',keyworld);
    request2= $.ajax({
        url: "/api/login/logged",
        type: "GET"
    });

    $.when(request1, request2).done(function (response1,response2) {
        $('#wrapper').text('');
        $.each(response1[0], function (index) {
                template = $('#mustache_topic').html();
                data={
                    name:response1[0][index].name,
                    date: new Date(response1[0][index].date).toLocaleString('en-GB',options),
                    author:response1[0][index].author,
                    text:response1[0][index].text,
                    img:response1[0][index].img,
                    comments:response1[0][index].comments
                };
                var $copy = Mustache.to_html(template, data);
                $copy = $($copy);
               $copy.appendTo('#wrapper');
            var buttons = new ButtonItem;
            var editBtn = buttons.returnBtn(ENUM_BTN.edit);
            var delBtn = buttons.returnBtn(ENUM_BTN.delete);
            var viewBtn = buttons.returnBtn(ENUM_BTN.view);
            viewBtn.appendTo($copy.find('.buttons'));
            if (response2[0] === response1[0][index].author) {
                editBtn.insertAfter($copy.find('.buttons'));
                delBtn.insertAfter($copy.find('.buttons'));
            }
            });




    });

    $.when(request1, request2).fail(function (xhr, status) {
        showAllert(false, 'Not found');
    })
}

function returnText(url) {
    var result = $.ajax({
        url: "/api/topic/" + url,
        type: "GET",
        dataType: "json"
    });
    result.done(function () {
        $('textarea.text, #textDiv').html(JSON.parse(result.responseText).text);
        $('#preview, #previewImg').attr('src', JSON.parse(result.responseText).img);
        //fix strange situation
        setTimeout(function () {
            if (tinyMCE.activeEditor) tinyMCE.activeEditor.setContent(JSON.parse(result.responseText).text);
        }, 100);
    })
}

function deleteTopic(url) {
    $.ajax({
        url: "/api/topic/" + url,
        type: "DELETE",
        success: function () {
            showAllert(true, 'Topic deleted');
        },
        error: function (xhr, status, err) {
            showAllert(false, 'Something wrong ' + err, '.modal-footer');
        }
    })
}

function deleteComm(url, data) {
    $.ajax({
        url: "/api/comments/" + url,
        type: "DELETE",
        data: data,
        success: function () {
            showAllert(true, 'Comment deleted', '.modal-footer');
        },
        error: function (xhr, status, err) {
            showAllert(false, 'Something wrong ' + err);
        }
    })
}

function editTopic(url, data) {
    $.ajax({
        url: "/api/topic/" + url,
        type: "PUT",
        data: data,
        success: function () {
            showAllert(true, 'Topic saved');
            $('#wrapper').text('');
            $("#myModal").removeClass("in")
                .hide();
            $(".modal-backdrop").remove();
            $("body").removeClass("modal-open");
            $('.form-control').val('');
            init();
        },
        error: function (xhr, status, err) {
            showAllert(false, 'Something wrong ' + err, '.modal-footer');
        }
    })
}

function addUser(data) {
    $.ajax({
        url: "/api/login/",
        type: "PUT",
        data: data,
        success: function () {
            $('.ui-button').click();
            $("#myModal").removeClass("in")
                .hide();
            $(".modal-backdrop").remove();
            showAllert(true, 'User registered, try login');
        },
        error: function () {
            showAllert(false, 'User already exist!', '.modal-footer');
        }
    })
}

function login(data) {
    var result = $.ajax({
        url: "/api/login/",
        type: "POST",
        data: data,
        dataType: "json"
    });
    result.done(function () {
        init();
        $('div#login').remove();

        var buttons = new ButtonItem;
        var button = buttons.returnBtn(ENUM_BTN.exit);
        $('.loginButton').replaceWith(button);

        $('#logged h2').text('Logged  ' + JSON.parse(result.responseText).username);
        var addButton = buttons.returnBtn(ENUM_BTN.addTopic);
        addButton.insertAfter($('.exitButton'));
        $('.registerButton').remove();
    });
    result.fail(function () {
        showAllert(false, 'Invalid User name or password');
    })
}

function logout() {
    var result = $.ajax({
        url: "/api/login/logout",
        type: "GET"
    });
    result.done(function () {
        $('#login,.exitButton,.addTopicBtn,#logged h2').remove();
        addTemplate('login').appendTo('#log');
        var buttons = new ButtonItem;
        var add = buttons.returnBtn(ENUM_BTN.login)
            .appendTo('#logged');
        var reg = buttons.returnBtn(ENUM_BTN.register)
            .insertAfter(add);
        init();

    });
    result.fail(function () {
        showAllert(false, 'Something wrong');
    })
}

function viewComments(url) {
    var result = $.ajax({
        url: "/api/comments/" + url,
        type: "GET",
        dataType: "json"
    });
    console.log(url)
    result.done(function (json) {
        checkLogin(function (text) {
            $.each(json, function (index) {
                var comment = addTemplate('commentsView', "", json[index], true);
                if (text === json[index].author) {
                    var buttons = new ButtonItem;
                    var delBtn = buttons.returnBtn(ENUM_BTN.deleteComment);
                    var editBtn = buttons.returnBtn(ENUM_BTN.editComment);
                    editBtn.appendTo(comment);
                    delBtn.appendTo(comment);
                }
                comment.appendTo(".modal-footer");
            })
        })
    })
}

function saveComments(url, data) {
    $.ajax({
        url: "/api/comments/" + url,
        type: "PUT",
        data: data,
        success: function (json) {
            if (json === 'Created') showAllert(true, 'Comment added', '.modal-footer');
            else if (json === 'OK') showAllert(true, 'Comment edited', '.modal-footer');
        },
        error: function () {
            showAllert(false, 'Comment not added', '.modal-footer');
        }
    });
}


function prepareTemplate(template) {
    if (template.attr('id')) template.attr('id', template.attr('id').slice(0, -3));
    template.find('*').each(function () {
        if ($(this).attr('id')) $(this).attr('id', $(this).attr('id').slice(0, -3));
        if ($(this).attr('class')) $(this).attr('class', $(this).attr('class').slice(0, -3))
    })
}

function addTemplate(tmpl, $that, data, notRemove) {
    if (!notRemove) $('#myModal').remove();

    if (tmpl === 'table') {
        var $copy = $('#tableTmpl').children().clone();
        prepareTemplate($copy);

    } else if (tmpl === 'edit' && $that) {
        var data = {
            topic: $that.closest('.topic').find('h1').text(),
            author: $that.closest('.topic').find('.author').text(),
            date: new Date($that.closest('.topic').find('.date').text()).toLocaleString("en-US", options),
            oldTopic: $that.closest('.topic').find('h1').text(),
            text: 'Edit Topic'
        };

        template = $('#mustache_edit').html();
        var $copy = Mustache.to_html(template, data);
        $copy = $($copy);
        var buttons = new ButtonItem;
        var save = buttons.returnBtn(ENUM_BTN.save);
        save.appendTo($copy.find('.modal-footer'));
        returnText($that.closest('.topic').find('h1').text());
        $copy.find('.author').attr('disabled', 'disabled');

    } else if (tmpl === 'login') {
        template = $('#mustache_login').html();
        var $copy = Mustache.to_html(template);

    } else if (tmpl === 'reg') {
        template = $('#mustache_user').html();
        var $copy = Mustache.to_html(template);
        $copy = $($copy);
        var buttons = new ButtonItem;
        var add = buttons.returnBtn(ENUM_BTN.addUser);
        add.appendTo($copy.find('.modal-footer'));
    }

    else if (tmpl === 'add') {
        var data = {
            topic: '',
            author: $that.closest('tr').find('.author').text(),
            date: new Date($that.closest('tr').find('.date').text()).toLocaleString("en-US", options),
            text: 'Add new topic'
        };

        template = $('#mustache_edit').html();
        var $copy = Mustache.to_html(template, data);
        $copy = $($copy);
        var buttons = new ButtonItem;
        var add = buttons.returnBtn(ENUM_BTN.add);
        add.appendTo($copy.find('.modal-footer'));
        checkLogin(function (text) {
            $copy.find('.author').get(0).value = text;
        });

        $copy.find('.author').attr('disabled', 'disabled');
    }

    else if (tmpl === 'view') {
        var data = {
            topic: $that.closest('.topic').find('h1').text(),
            author: 'Written by ' + $that.closest('.topic').find('.lead').text(),
        };

        template = $('#mustache_view').html();
        var $copy = Mustache.to_html(template, data);
        $copy = $($copy);
        var buttons = new ButtonItem;
        var comments = buttons.returnBtn(ENUM_BTN.viewComments);
        var commentsAdd = buttons.returnBtn(ENUM_BTN.addComments);
        (checkLogin(function(text){
            if (text !== '0') {commentsAdd.appendTo($copy.find('.modal-footer'));}

        }))


        comments.appendTo($copy.find('.modal-footer'));
        returnText($that.closest('.topic').find('h1').text());

    } else if (tmpl === 'commentsView') {
        data.date = new Date(data.date.toLocaleString("en-US", options));
        template = $('#mustache_comment').html();
        var $copy = Mustache.to_html(template, data);
        $copy = $($copy);
    }
    return $($copy)
}
function checkLogin(funk) {
    var islogged = $.ajax({
        url: "/api/login/logged",
        type: "GET"
    });
    islogged.done(function () {
        funk(islogged.responseText)
    });
}

$(document).ready(function () {
    $(window).scroll(function(){
           if($(document).height()<=$(window).scrollTop()+$(window).height()+1) {
               loadMore($('.form-control').val());
           }
    });

    var buttons = new ButtonItem;

    addTemplate('login').appendTo('#logged');
    var login = buttons.returnBtn(ENUM_BTN.login)
        .insertAfter('div#login');
    var reg = buttons.returnBtn(ENUM_BTN.register)
        .insertAfter(login);
    $('.login').hide();
    login.hide();
    reg.hide();
    checkLogin(function (text) {
        if (text !== '0') {
            init();
            $('div#login').remove();
            var buttons = new ButtonItem;
            var button = buttons.returnBtn(ENUM_BTN.exit);
            $('.loginButton').replaceWith(button);
            $('#logged h2').text('Logged  ' + text);
            var addButton = buttons.returnBtn(ENUM_BTN.addTopic);
            addButton.insertAfter($('.exitButton'));
            $('.registerButton').get(0).remove();
        } else {
            init();
            $('.login').show();
            login.show();
            reg.show();
        }
    })
    $('.search').click(function () {
        page=1;
        init($('.form-control').val());
    })
});
