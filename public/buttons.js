function ButtonItem() {
    delBtn = $('<input class="delButton action" type="button" value="Delete">');
    delBtn.click(function (e) {
        deleteTopic($(this).closest('tr').find('th').contents().get(0).nodeValue);
        $(this).closest('tr').remove();
        $('.toggleDiv').remove();
    });

    saveBtn = $('<input class="saveButton action" type="button" value="Save">');
    saveBtn.click(function (e) {
        e.stopPropagation();

        var newTopic = {
            name: $(this).parent().find('.name').get(0).value,
            author: $(this).parent().find('.author').get(0).value,
            img:$(this).parent().find('#previewImg').get(0).src,
            text: $(this).parent().find('.text').get(0).value,
            date: new Date(),
            oldTopic: $(this).parent().find('#oldTopic').get(0).value
        };
        console.log(newTopic)
        editTopic($(this).parent().find('.name').get(0).value, newTopic);

    });

    logoutBtn = $('<input class="exitButton create" type="button" value="Logout">');
    logoutBtn.click(function (e) {
        $('#logged,.exitButton,.addTopicBtn').remove();

        addTemplate('login').insertBefore('#wrapper');
        var add = loginBtn
            .insertBefore('#wrapper');
        var reg=registerBtn
            .insertAfter(add);
        init();
    });

    editBtn = $('<input class="editButton action" type="button" value="Edit">');
    editBtn.click(function (e) {
        e.stopPropagation();
        $(addTemplate('edit', $(this)).dialog({
            modal: true,
            minWidth: 1500,
            closeText : '',
            close: function (ev, ui) {
            $(this).dialog("destroy");
            $(this).remove();
        }
        }));

        $('.image').change(function() {
            var file = $(this)[0].files[0];
            var preview=$(this).prev();
            var reader=new FileReader();
            reader.onload=function (e) {
                preview.attr('src',e.target.result);
            }
            if (file&&file.type.match('image.*')) {
                reader.readAsDataURL(file)
            } else {
                preview.scr=''
            }


        });
    });

    addBtn = $('<input class="addButton action" type="button" value="add">');
    addBtn.click(function (e) {
        var newTopic = {
            name: $(this).parent().find('.name').get(0).value,
            author: $(this).parent().find('.author').get(0).value,
            img:$(this).parent().find('#previewImg').get(0).src,
            text: $(this).parent().find('.text').get(0).value,
            date: new Date(),
        };
        editTopic($(this).parent().find('.name').get(0).value, newTopic);

    });

    addTopicBtn = $('<input class="addTopicBtn action" type="button" value="Add topic">');
    addTopicBtn.click(function () {
        $(addTemplate('add', $(this)).dialog({
            modal: true,
            minWidth: 1500,
            closeText : '',
            close: function (ev, ui) {
                $(this).dialog("destroy");
                $(this).remove();
            }
        }));
        $('.image').change(function() {
            var file = $(this)[0].files[0];
            var preview=$(this).prev();
            var reader=new FileReader();
            reader.onload=function (e) {
                preview.attr('src',e.target.result);
            }
            if (file&&file.type.match('image.*')) {
                reader.readAsDataURL(file)
            } else {
                preview.scr=''
            }


        });
    });

    loginBtn = $('<input class="loginButton share" type="button" value="login">');
    loginBtn.click(function (e) {
        var loginUser = {
            name: $('.login').get(0).value,
            password: $('.login').get(1).value
        };
        login(loginUser);
    });

    viewBtn = $('<input class="viewButton action" type="button" value="View">');
    viewBtn.click(function (e) {
        e.stopPropagation();
        $(addTemplate('view', $(this)).dialog({
            modal: true,
            minWidth: $(document).width()-100,
            closeText : '',
            close: function (ev, ui) {
                $(this).dialog("destroy");
                $(this).remove();
            }
        }));
    });

    registerBtn = $('<input class="registerButton share" type="button" value="Register">');
    registerBtn.click(function (e) {
        $(addTemplate('reg').dialog({
            modal: true,
            minWidth: 1500,
            closeText : '',
            close: function (ev, ui) {
                $(this).dialog("destroy");
                $(this).remove();
            }
        }));
    });
    addUserBtn = $('<input class="registerButton share" type="button" value="Register">');
    addUserBtn.click(function (e) {
        $(this).parent().find('span').remove();
        var newUser = {
            name: $(this).parent().find('.login').get(0).value,
            password: $(this).parent().find('.login').get(1).value,
        };
        if (newUser.name===''||newUser.password==='') {
            var span = $('<span>Enter password and user</span>');
            console.log(span)
            $(span).insertBefore($(this));
        } else {  addUser(newUser,$(this))}

    });

    this.returnBtn = function (button) {
        if (button === 'add') {
            return addBtn
        } else if (button === 'del') {
            return delBtn
        } else if (button === 'save') {
            return saveBtn
        } else if (button === 'edit') {
            return editBtn
        }
        else if (button === 'login') {
            return loginBtn;
        }
        else if (button === 'exit') {
            return logoutBtn;
        }
        else if (button === 'view') {
            return viewBtn;
        }
        else if (button === 'addTopic') {
            return addTopicBtn;
        }
        else if (button === 'reg') {
            return registerBtn;
        }
        else if (button === 'addUser') {
            return addUserBtn;
        }
    };
}