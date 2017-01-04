var ENUM_BTN = {
    add: 'add',
    delete: 'del',
    edit: 'edit',
    save: 'save',
    login: 'login',
    exit: 'exit',
    view: 'view',
    addTopic: 'addTopic',
    register: 'reg',
    addUser: 'addUser',
    viewComments:'comments',
    deleteComment:'delComments',
    editComment:'editComments',
    saveComment:'saveComment'
};
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
    $("#myModal").removeClass("in");
    $(".modal-backdrop").remove();
    $("#myModal").hide();
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
                        if (key==='comments')  th.text(json[index][key]+' comments');
                        if (key==='date')  th.text(new Date(json[index][key]).toLocaleString("en-US", options));
                        th.appendTo(tr);
                    }

                    var th = $('<th>');
                    var buttons = new ButtonItem;
                    var editBtn = buttons.returnBtn(ENUM_BTN.edit);
                    var delBtn = buttons.returnBtn(ENUM_BTN.delete);
                    var viewBtn = buttons.returnBtn(ENUM_BTN.view);

                    if ($('#logged').text().substring(8) && json[index]['author'] === $('#logged').text().substring(8)) {
                        editBtn.appendTo(th);
                        delBtn.appendTo(th);
                    }
                    viewBtn.appendTo(th);
                    th.appendTo(tr);
                }
            );

            $('#wrapper').text('');
            table.appendTo('#wrapper');
            $('#main').DataTable({
                "processing": true
            });
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
        if (tinyMCE.activeEditor) tinyMCE.activeEditor.setContent(JSON.parse(result.responseText).text);
    })
}

function deleteTopic(url) {
    $.ajax({
        url: "/api/topic/" + url,
        type: "DELETE",
        dataType: "json"
    })
}

function deleteComm(url,data) {
    $.ajax({
        url: "/api/comments/"+url,
        type: "DELETE",
        dataType: "json",
        data:data,
    })
}

function editTopic(url, data) {
    $.ajax({
        url: "/api/topic/" + url,
        type: "PUT",
        data: data,
        success: function () {
            console.log('OK');
            $('.wrapper').text('');
            init();
            $("#myModal").removeClass("in");
            $(".modal-backdrop").remove();
            $("#myModal").hide();
        },
        error: function (xhr, status, err) {
            alert(err);
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
            $("#myModal").removeClass("in");
            $(".modal-backdrop").remove();
            $("#myModal").hide();
            $('.alert-success').html('User registered, try login');
            $('.alert-success').show();
            setTimeout(function () {
                $('.alert-success').hide();
            }, 1500);
        },
        error: function (xhr) {
            console.log($that);
            var span = $('<span>User exist</span>');
            $(span).insertBefore($that);
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
        $('#logged').text('Logged  ' + JSON.parse(result.responseText)[0].username);
        var addButton = buttons.returnBtn(ENUM_BTN.addTopic);
        addButton.insertAfter($('.exitButton'));

        $('.registerButton').get(0).remove();

    });
    result.fail(function (xhr, status, errorThrown) {
        $('.alert-danger').html('Invalid User name or password');
        $('.alert-danger').show();
        setTimeout(function () {
            $('.alert-danger').hide();
        }, 1500);
    })
}

function viewComments(url) {
    var result = $.ajax({
        url: "/api/comments/"+url,
        type: "GET",
        dataType: "json"
    });
    result.done(function (json) {
        $.each(json, function (index) {
           var comment= addTemplate('commentsView',"", json[index],true);
            if ($('#logged').text().substring(8)===json[index].author) {
                var buttons = new ButtonItem;
                var delBtn = buttons.returnBtn(ENUM_BTN.deleteComment);
                var editBtn=buttons.returnBtn(ENUM_BTN.editComment);
                editBtn.appendTo(comment);
                delBtn.appendTo(comment);
            }
         comment.appendTo(".modal-footer");
            console.log();
            $('html, body, .modal').animate({ scrollTop: $('.panel-default').eq(0).offset().top }, 'slow');


        })

        })
}

function saveComments(url,data) {
    var result = $.ajax({
        url: "/api/comments/"+url,
        type: "PUT",
        data:data,
        dataType: "json"
    });
    result.done(function (json) {

    })
}

function prepareTemplate(template) {
    if (template.attr('id')) template.attr('id', template.attr('id').slice(0, -3));
    template.find('*').each(function () {
        if ($(this).attr('id')) $(this).attr('id', $(this).attr('id').slice(0, -3));
        if ($(this).attr('class')) $(this).attr('class', $(this).attr('class').slice(0, -3))
    })
}
function addTemplate(tmpl, $that,data,notRemove) {
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
        }
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
        console.log(add)
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
        $copy.find('.author').get(0).value = $('#logged').text().substring(8);
        $copy.find('.author').attr('disabled', 'disabled');
    }
    else if (tmpl === 'view') {


        var data = {
            topic: $that.closest('tr').find('.name').text(),
            author: 'Written by ' + $that.closest('tr').find('.author').text(),
            date: new Date($that.closest('tr').find('.date').text()).toLocaleString("en-US", options)
        };
        console.log(data)

        template = $('#mustache_view').html();
        var $copy = Mustache.to_html(template, data);
        $copy = $($copy);
        var buttons = new ButtonItem;
        var comments=buttons.returnBtn(ENUM_BTN.viewComments);
        comments.appendTo($copy.find('.modal-footer'));
        returnText($that.closest('tr').find('.name').text());
    }else if (tmpl === 'commentsView') {
        data.date= new Date(data.date.toLocaleString("en-US", options))
        template = $('#mustache_comment').html();
        var $copy = Mustache.to_html(template, data);
        $copy = $($copy);
    }
    return $($copy)
}


$(document).ready(function () {
    var buttons = new ButtonItem;
    init();
    addTemplate('login').insertBefore('#wrapper');
    var add = buttons.returnBtn(ENUM_BTN.login)
        .insertAfter('div#login');
    var reg = buttons.returnBtn(ENUM_BTN.register)
        .insertAfter(add);

});
