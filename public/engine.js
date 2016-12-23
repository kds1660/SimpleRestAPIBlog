var ENUM_BTN = {
    add: 'add',
    delete: 'del',
    edit: 'edit',
    save: 'save',
    login: 'login',
    exit: 'exit',
    view: 'view',
    addTopic: 'addTopic',
    register:'reg',
    addUser:'addUser'
};

function init() {
    $.ajax({
        url: "/api/topic",
        type: "GET",
        dataType: "json",
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
    })
    result.done(function () {
        console.log('done')
        $('textarea.edit, #textDiv').text(JSON.parse(result.responseText).text);
        $('#preview, #previewImg').attr('src',JSON.parse(result.responseText).img);
    })
}

function deleteTopic(url) {
    $.ajax({
        url: "/api/topic/" + url,
        type: "DELETE",
        dataType: "json"
    })
}

function editTopic(url, data) {
   $.ajax({
        url: "/api/topic/" + url,
        type: "PUT",
        data: data,
       success:function()  {
               $('.wrapper').text('');
               init();
               $('.ui-button').click();
       },
       error:function (xhr) {
           alert(xhr.status)
       }
    })
}

function addUser(data,$that) {
    $.ajax({
        url: "/api/login/",
        type: "PUT",
        data: data,
        success:function()  {
            $('.ui-button').click();
        },
        error:function (xhr) {
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
    })
    result.done(function () {
        init();
        $('span').remove();
        $('div#login').get(0).remove();
        var buttons = new ButtonItem;
        var button = buttons.returnBtn(ENUM_BTN.exit);
        $('.loginButton').replaceWith(button);
        $('<div id="logged"></div>').insertBefore('.exitButton');
        $('#logged').text('Logged  ' + JSON.parse(result.responseText).name)
        var addButton = buttons.returnBtn(ENUM_BTN.addTopic);
        addButton.insertAfter($('.exitButton'));

        $('.share').get(0).remove();

    })
    result.fail(function (xhr, status, errorThrown) {
        $('span').remove();
        var span = $('<span>Incorect login/password, try again or register</span>');
        $(span).insertBefore('.loginButton');
    })
}

function addTemplate(tmpl, $that) {
    if (tmpl === 'table') {
        var $copy = $('#tableTmpl').children().clone();
    } else if (tmpl === 'edit' && $that) {
        var $copy = $('#editTmpl').children().clone();
        var buttons = new ButtonItem;
        var save = buttons.returnBtn(ENUM_BTN.save);
        save.appendTo($copy);
        $copy.children().get(0).value = $that.closest('tr').find('.name').text();
        $copy.children().get(1).value = $that.closest('tr').find('.author').text();
        $copy.children().get(5).value = $that.closest('tr').find('.name').text();
        returnText($that.parent().parent().find('.name').text());

    } else if (tmpl === 'login') {
        $('#loginTmpl').find('.share').remove();
        var $copy = $('#loginTmpl').children().clone();
    } else if (tmpl === 'reg') {
        $('#loginTmpl').find('.share').remove();
        $('#loginTmpl').find('span').remove();
    var $copy = $('#loginTmpl').children().clone();
        var buttons = new ButtonItem;
        var add = buttons.returnBtn(ENUM_BTN.addUser);
        add.appendTo($copy);

}
    else if (tmpl === 'add') {
        var $copy = $('#editTmpl').children().clone();
        var buttons = new ButtonItem;
        var add = buttons.returnBtn(ENUM_BTN.add);
        add.appendTo($copy);
        $copy.children().get(1).value = $('#logged').text().substring(8);
        $copy.find('textarea.edit').text('');
        $copy.find('#previewImg').attr('src', '');
        $copy.find('.author').eq(0).attr('readonly', true);
    }
    else if (tmpl === 'view') {
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
        var $copy = $('#viewTmpl').children().clone();
        $copy.find('h2').text($that.closest('tr').find('.name').text());
        $copy.find('#authorP').text('Written by '+$that.closest('tr').find('.author').text());
        $copy.find('#dateP').text(new Date($that.closest('tr').find('.date').text()).toLocaleString("en-US", options));
        returnText($that.closest('tr').find('.name').text());
    }
    return $copy
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
