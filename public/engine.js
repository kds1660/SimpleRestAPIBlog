var ENUM_BTN = {add:'add',delete:'del', edit:'edit',save:'save'};
function init() {
    $.ajax({
        url: "/api/topic",
        type: "GET",
        dataType: "json",
    })
        .done(function (json) {
            var table = $('<table id="main">');
            var tbody = $('<tbody>');
            table.append('<thead><tr><th>Name</th><th>Author</th><th>Date</th><th>Edit</th><th>Remove</th>th>Remove</th></tr></thead>');
            table.append(tbody);

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
                    editBtn.appendTo(th);
                    th.appendTo(tr);
                    var th = $('<th>');
                    var buttons = new ButtonItem;
                    var delBtn = buttons.returnBtn(ENUM_BTN.delete);
                    delBtn.appendTo(th);
                    th.appendTo(tr);
                }
            );

            $('#wrapper').text('');
            table.appendTo('#wrapper');
            $('#main').DataTable();

            $('tr').click(function (e) {
                showText($(this).find('th').contents().get(0).nodeValue, $(this));
            });
        })
        .fail(function (xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        })
        .always(function (xhr, status) {
            console.log("The request is complete!");
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

function ButtonItem() {
    this.delBtn = $('<input class="delButton" type="button" value="Delete">');
    this.delBtn.click(function (e) {
        deleteTopic($(this).parent().parent().find('th').contents().get(0).nodeValue);
        $(this).parent().parent().remove();
    });

    saveBtn = $('<input class="saveButton" type="button" value="Save">');
    saveBtn.click(function (e) {
        e.stopPropagation();
        var newTopic = {
            name: $(this).parent().parent().parent().find('.edit').get(0).value,
            author: $(this).parent().parent().parent().find('.edit').get(1).value,
            text: $(this).parent().parent().parent().find('.edit').get(2).value,
            date: new Date(),
            oldTopic: $(this).parent().parent().find('.name').text()
        };
        editTopic($(this).parent().contents().get(0).nodeValue, newTopic);
        $('.wrapper').text('')
        init();
    });

    this.editBtn = $('<input class="editButton" type="button" value="Edit">');
    this.editBtn.click(function (e) {
        e.stopPropagation();
        $('.toggleDiv').remove();
        var parent = $(this).parent().parent();
        var toggle = $('<tr class="toggleDiv"><th colspan="5"></th></tr>>');
        $(parent).after(toggle);
        $(toggle.find('th')).append("<input type='text' class='edit' value=" + $(this).parent().parent().find('.name').text() + ">");
        $(toggle.find('th')).append("<input type='text' class='edit' value=" + $(this).parent().parent().find('.author').text() + ">");
        $(toggle.find('th')).append("<textarea class='edit' cols='100' rows='20' >" + returnText($(this).parent().parent().find('.name').text()) + "</textarea>");
        $(this).replaceWith(saveBtn);
    });

    this.addBtn = $('<input class="addButton" type="button" value="add">');
    this.addBtn.click = function (e) {
        var newTopic = {
            name: $(this).parent().find('.add').get(0).value,
            author: $(this).parent().find('.add').get(1).value,
            text: $(this).parent().find('.add').get(2).value,
            date: new Date(),
        };
        editTopic($(this).parent().find('.add').get(0).value, newTopic);
        init();
        $('.add').each(function () {
            $(this).val('');
        })
    };

    this.returnBtn = function (button) {
        if (button === 'add') {
            return this.addBtn
        } else if (button === 'del') {
            return this.delBtn
        }
        else if (button === 'save') {
            return this.saveBtn
        } else if (button === 'edit') {
            return this.editBtn
        }
    };
}

$(document).ready(function () {
    var buttons = new ButtonItem;
    var add = buttons.returnBtn(ENUM_BTN.add)
        .insertAfter('textarea');
    $('.addButton').click(buttons.addBtn.click)
    init();
});
