function simpleSuntax() {
    $.ajax({
        url: "/api/topic",
        type: "GET",
        dataType: "json",
    })
        .done(function (json) {
          var table=$('<table id="main">');
          var tbody=$('<tbody>');
            table.append('<thead><tr><th>Name</th><th>Author</th><th>Date</th><th>Edit</th><th>Remove</th>th>Remove</th></tr></thead>');
            table.append(tbody);
            $.each(json, function (index) {
                var tr= $('<tr>')
               .appendTo(tbody);
                var th=$('<th class="name">');
                th.text(json[index].name);
                th.appendTo(tr);
                var th=$('<th class="author">');
                th.text(json[index].author);
                th.appendTo(tr);
                var th=$('<th class=date>');
                th.text(json[index].date);
                th.appendTo(tr);
                var th=$('<th>');
                var editBtn=$('<input class="editButton" type="button" value="Edit">');
                editBtn.appendTo(th);
                th.appendTo(tr);
                var th=$('<th>');
                var delBtn=$('<input class="delButton" type="button" value="Delete">');
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
            $('.delButton').click(function (e) {
             deleteTopic($(this).parent().parent().find('th').contents().get(0).nodeValue);
               $(this).parent().parent().remove();
            });
            $('.editButton').click(function (e) {
                e.stopPropagation();
                var parent = $(this).parent().parent();

                $(parent).after("<textarea class='edit' >" + returnText($(this).parent().parent().find('.name').text()) + "</textarea>");
                $(parent).after("<input type='text' class='edit' value=" + $(this).parent().parent().find('.author').text() + ">");
                $(parent).after("<input type='text' class='edit' value=" + $(this).parent().parent().find('.name').text() + ">");
                $(this).replaceWith('<input class="saveButton" type="button" value="Save">');

                $('.saveButton').click( function (e) {
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
                    simpleSuntax();
                });
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
            if ($that.parent().has('.toggleDiv').length) {
                $('.toggleDiv').remove()
            }else {
                $($that).after('<span class="toggleDiv">'+json.text+'</span>')
            }

        })
}

function returnText(url) {
    var result=$.ajax({
        url: "/api/topic/" + url,
        type: "GET",
        dataType: "json"
    })
       result.done (function () {
           console.log(url)
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



$(document).ready(function () {
    simpleSuntax();

    $('.addButton').click(function (e) {
        var newTopic = {
            name: $(this).parent().find('.add').get(0).value,
            author: $(this).parent().find('.add').get(1).value,
            text: $(this).parent().find('.add').get(2).value,
            date: new Date(),
        };

        editTopic($(this).parent().find('.add').get(0).value, newTopic);
        simpleSuntax();

        $('.add').each(function () {
            $(this).val('');
        })
    });
});
