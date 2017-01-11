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

var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};

function initAndModal() {
    init();
    $("#myModal").removeClass("in")
        .hide();
    $(".modal-backdrop").remove();
}

function init() {
    $.ajax({
        url: "/api/topic",
        type: "GET",
        dataType: "json"
    })
        .done(function (json) {
            var table = addTemplate('table');
            addTemplate('edit');
            var tbody = table.find('tbody');

            $.each(json, function (index) {
                    var tr = $('<tr>')
                        .appendTo(tbody);

                    for (var key in json[index]) {
                        var th = $('<th>');
                        th.addClass(key);
                        th.text(json[index][key]);
                        if (key === 'comments') th.text(json[index][key] + ' comments');
                        if (key === 'date') th.text(new Date(json[index][key]).toLocaleString("en-US", options));
                        th.appendTo(tr);
                    }

                    var th = $('<th style="width:300px;">');
                    var buttons = new ButtonItem;
                    var editBtn = buttons.returnBtn(ENUM_BTN.edit);
                    var delBtn = buttons.returnBtn(ENUM_BTN.delete);
                    var viewBtn = buttons.returnBtn(ENUM_BTN.view);
                    editBtn.hide();
                    delBtn.hide();
                    viewBtn.hide();
                    checkLogin(function (text) {
                        if (text !== json[index]['author']) {
                            editBtn.remove();
                            delBtn.remove();
                        } else {
                            editBtn.show();
                            delBtn.show();
                        }
                        viewBtn.show();

                    });
                    editBtn.appendTo(th);
                    delBtn.appendTo(th);
                    viewBtn.appendTo(th);
                    th.appendTo(tr);
                }
            );

            $('#wrapper').text('');
            table.appendTo('#wrapper');
            $('#main').DataTable({});
        })
        .fail(function (xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        })
        .always(function (xhr, status) {
        });
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
            $('.wrapper').text('');
            init();
            $("#myModal").removeClass("in")
                .hide();
            $(".modal-backdrop").remove();
        },
        error: function (xhr, status, err) {
            showAllert(false, 'Something wrong ' + err, '.modal-footer');
        }
    })
}

function addUser(data, $that) {
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
        error: function (xhr) {
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
        $('<div id="logged"></div>').insertBefore('.exitButton');
        $('#logged').text('Logged  ' + JSON.parse(result.responseText).username);
        var addButton = buttons.returnBtn(ENUM_BTN.addTopic);
        addButton.insertAfter($('.exitButton'));

        $('.registerButton').get(0).remove();
    });
    result.fail(function (xhr, status, errorThrown) {
        showAllert(false, 'Invalid User name or password');
    })
}

function logout() {
    var result = $.ajax({
        url: "/api/login/logout",
        type: "GET",
    });
    result.done(function () {
        $('#logged,.exitButton,.addTopicBtn').remove();
        addTemplate('login').insertBefore('#wrapper');
        var buttons = new ButtonItem;
        var add = buttons.returnBtn(ENUM_BTN.login)
            .insertBefore('#wrapper');
        var reg = buttons.returnBtn(ENUM_BTN.register)
            .insertAfter(add);
        init();
    });
    result.fail(function (xhr, status, errorThrown) {
        showAllert(false, 'Something wrong');
    })
}

function viewComments(url) {
    var result = $.ajax({
        url: "/api/comments/" + url,
        type: "GET",
        dataType: "json"
    });
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
    var result = $.ajax({
        url: "/api/comments/" + url,
        type: "PUT",
        data: data,
        success: function (json) {
            if (json === 'Created') showAllert(true, 'Comment added', '.modal-footer')
            else if (json === 'OK') showAllert(true, 'Comment edited', '.modal-footer');
        },
        error: function (req, err) {
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
            topic: $that.closest('tr').find('.name').text(),
            author: $that.closest('tr').find('.author').text(),
            date: new Date($that.closest('tr').find('.date').text()).toLocaleString("en-US", options),
            oldTopic: $that.closest('tr').find('.name').text(),
            text: 'Edit Topic'
        };

        template = $('#mustache_edit').html();
        var $copy = Mustache.to_html(template, data);
        $copy = $($copy);
        var buttons = new ButtonItem;
        var save = buttons.returnBtn(ENUM_BTN.save);
        save.appendTo($copy.find('.modal-footer'));
        returnText($that.parent().parent().find('.name').text());
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
            topic: $that.closest('tr').find('.name').text(),
            author: 'Written by ' + $that.closest('tr').find('.author').text(),
            date: new Date($that.closest('tr').find('.date').text()).toLocaleString("en-US", options)
        };

        template = $('#mustache_view').html();
        var $copy = Mustache.to_html(template, data);
        $copy = $($copy);
        var buttons = new ButtonItem;
        var comments = buttons.returnBtn(ENUM_BTN.viewComments);
        var commentsAdd = buttons.returnBtn(ENUM_BTN.addComments);
        if ($('#logged').text()) {
            commentsAdd.appendTo($copy.find('.modal-footer'));
        }
        comments.appendTo($copy.find('.modal-footer'));
        returnText($that.closest('tr').find('.name').text());

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
    var buttons = new ButtonItem;
    init();
    addTemplate('login').insertBefore('#wrapper');
    var add = buttons.returnBtn(ENUM_BTN.login)
        .insertAfter('div#login');
    var reg = buttons.returnBtn(ENUM_BTN.register)
        .insertAfter(add);
    $('.login').hide();
    add.hide();
    reg.hide();
    checkLogin(function (text) {
        if (text !== '0') {
            init();
            $('div#login').remove();
            var buttons = new ButtonItem;
            var button = buttons.returnBtn(ENUM_BTN.exit);
            $('.loginButton').replaceWith(button);
            $('<div id="logged"></div>').insertBefore('.exitButton');
            $('#logged').text('Logged  ' + text);
            var addButton = buttons.returnBtn(ENUM_BTN.addTopic);
            addButton.insertAfter($('.exitButton'));
            $('.registerButton').get(0).remove();
        } else {
            $('.login').show();
            add.show();
            reg.show();
        }
    })
});
