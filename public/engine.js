var ENUM_BTN = {add:'add',delete:'del', edit:'edit',save:'save',login:'login',exit:'exit'};
function init() {
    $.ajax({
        url: "/api/topic",
        type: "GET",
        dataType: "json",
    })
        .done(function (json) {
            var table=addTemplate('table');
            addTemplate('edit');
            var tbody=table.find('tbody');

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
                    if ($('#logged').text().substring(8)&&json[index]['author']===$('#logged').text().substring(8)) {editBtn.appendTo(th);}
                    th.appendTo(tr);
                    var th = $('<th>');
                    var buttons = new ButtonItem;
                    var delBtn = buttons.returnBtn(ENUM_BTN.delete);
                if ($('#logged').text().substring(8)&&json[index]['author']===$('#logged').text().substring(8)) {delBtn.appendTo(th);}
                    th.appendTo(tr);
                }
            );

            $('#wrapper').text('');
            table.appendTo('#wrapper');
            var oTable=$('#main');
            oTable.DataTable({
            });
            oTable.find('td').hover( function() {
                console.log('hi');
                var iCol = $('td', this.parentNode).index(this) % 5;
                console.log(iCol);
                $('td:nth-child('+(iCol+1)+')', oTable.$('tr')).addClass( 'highlight' );
            }, function() {
                oTable.$('td.highlight').removeClass('highlight');
            } );

            $('tbody tr').click(function (e) {
                showText($(this).find('th').contents().get(0).nodeValue, $(this));
                var buttons = new ButtonItem;
                $(this).find('.saveButton').replaceWith(buttons.returnBtn(ENUM_BTN.edit));
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

function showText(url, $that) {
    $.ajax({
        url: "/api/topic/" + url,
        type: "GET",
        dataType: "json"
    })
        .done(function (json) {
            if ($that.next('.toggleDiv').length) {
                $that.next('.toggleDiv').remove()
            } else {
                $($that).after('<tr class="toggleDiv"><th colspan="5">' + json.text + '</th></tr>>');
            }
        })
}

function returnText(url) {
    var result = $.ajax({
        url: "/api/topic/" + url,
        type: "GET",
        dataType: "json"
    })
    result.done(function () {
        $('textarea.edit').text(JSON.parse(result.responseText).text);
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
        dataType: "json"
    })
}

function login(data) {
    var result=$.ajax({
        url: "/api/login/",
        type: "POST",
        data: data,
        dataType: "json"
    })
    result.done(function () {
        init();
        $('span').remove();
        $('.login').remove();
        $('<div id="logged"></div>').insertBefore ('.loginButton');
        $('#logged').text('Logged  '+JSON.parse(result.responseText).name)

        var buttons= new ButtonItem;
        var button = buttons.returnBtn(ENUM_BTN.exit)
        console.log(button)
        $('.loginButton').replaceWith(button);

    })
    result.fail(function (xhr, status, errorThrown) {
        $('span').remove();
        var span=$('<span>Incorect login</span>');
            $(span).insertBefore ('.loginButton')
        })
}

function addTemplate(tmpl,$that) {
    if (tmpl==='table') {
        var $copy = $('#tableTmpl').children().clone();
    } else if (tmpl==='edit'&&$that) {
        var $copy = $('#editTmpl').children().clone();
        $copy.children().get(0).value=$that.closest('tr').find('.name').text();
        $copy.children().get(1).value=$that.closest('tr').find('.author').text()
        returnText($that.parent().parent().find('.name').text());
    }
    return $copy
}


$(document).ready(function () {
    var buttons = new ButtonItem;
    var add = buttons.returnBtn(ENUM_BTN.login)
        .insertAfter('#login');
    init();
    addTemplate();
});
