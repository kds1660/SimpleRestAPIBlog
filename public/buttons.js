function ButtonItem() {
    delBtn = $('<input class="delButton" type="button" value="Delete">');
    delBtn.click(function (e) {
        deleteTopic($(this).closest('tr').find('th').contents().get(0).nodeValue);
        $(this).closest('tr').remove();
        $('.toggleDiv').remove();
    });

    saveBtn = $('<input class="saveButton" type="button" value="Save">');
    saveBtn.click(function (e) {
        e.stopPropagation();

        var newTopic = {
            name: $(this).closest('tbody').find('.edit').get(0).value,
            author: $(this).closest('tbody').find('.edit').get(1).value,
            text: $(this).closest('tbody').find('.edit').get(2).value,
            date: new Date(),
            oldTopic: $(this).closest('tr').find('.name').text()
        };
        editTopic($(this).parent().contents().get(0).nodeValue, newTopic);
        $('.wrapper').text('')
        init();
    });

    exitBtn = $('<input class="editButton" type="button" value="Logout">');

    editBtn = $('<input class="editButton" type="button" value="Edit">');
    editBtn.click(function (e) {
        e.stopPropagation();
        $('.toggleDiv').remove();
        var parent = $(this).closest('tr');
        var toggle = $('<tr class="toggleDiv"><th colspan="5"></th></tr>>');
        $(parent).after(toggle);
        toggle.find('th').append(addTemplate('edit',$(this)))
        $(this).replaceWith(saveBtn);
    });

    addBtn = $('<input class="addButton" type="button" value="add">');
    addBtn.click( function (e) {
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
    });

    loginBtn = $('<input class="loginButton" type="button" value="login">');
    loginBtn.click( function (e) {
        var loginUser = {
            name: $(this).parent().find('.login').get(0).value,
            password: $(this).parent().find('.login').get(1).value
        };
        login(loginUser);
        $('.login').each(function () {
            $(this).val('');
        })
    });

    this.returnBtn = function (button) {
        if (button === 'add') {
            return addBtn
        } else if (button === 'del') {
            return delBtn
        }
        else if (button === 'save') {
            return this.saveBtn
        } else if (button === 'edit') {
            return editBtn
        }
        else if (button === 'login') {
            return loginBtn;
        }
        else if (button === 'exit') {
            return exitBtn;
        }
    };
}