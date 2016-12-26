function ButtonItem() {
    delBtn = $('<input class="delButton btn btn-info" type="button" value="Delete">');
    delBtn.click(function () {
        deleteTopic($(this).closest('tr').find('th').contents().get(0).nodeValue);
        $(this).closest('tr').remove();
        $('.toggleDiv').remove();
    });

    saveBtn = $('<input class="saveButton btn btn-info" type="button" value="Save">');
    saveBtn.click(function (e) {
        e.stopPropagation();

        var newTopic = {
            name: $(this).parent().parent().find('.name').get(0).value,
            author: $(this).parent().parent().find('.author').get(0).value,
            img: $(this).parent().parent().find('#previewImg').get(0).src,
            text: tinyMCE.activeEditor.getContent({format: 'raw'}),
            date: new Date(),
            oldTopic: $(this).parent().parent().find('#oldTopic').get(0).value
        };

        editTopic($(this).parent().parent().find('.name').get(0).value, newTopic);

    });

    logoutBtn = $('<input class="exitButton btn btn-danger" type="button" value="Logout">');
    logoutBtn.click(function (e) {
        $('#logged,.exitButton,.addTopicBtn').remove();

        addTemplate('login').insertBefore('#wrapper');
        var add = loginBtn
            .insertBefore('#wrapper');
        var reg = registerBtn
            .insertAfter(add);
        init();
    });

    editBtn = $('<input class="editButton btn btn-info" type="button" value="Edit">');
    editBtn.click(function (e) {
        e.stopPropagation();
        var modalText = addTemplate('edit', $(this));
        $(modalText).appendTo('#wrapper');
        $('#myModal').modal('show');

        tinymce.init({
            width: "100%",
            height: "100%",
            selector: 'textarea',
            force_br_newlines: false,
            force_p_newlines: false,
            forced_root_block: ''
        });

        $('.image').change(function () {
            var file = $(this)[0].files[0];
            var preview = $(this).prev();
            var reader = new FileReader();
            reader.onload = function (e) {
                preview.attr('src', e.target.result);
            };
            if (file && file.type.match('image.*')) {
                reader.readAsDataURL(file)
            } else {
                preview.scr = '';
            }
        });
    });

    addBtn = $('<input class="addButton btn btn-info" type="button" value="add">');
    addBtn.click(function (e) {
        var newTopic = {
            name: $(this).parent().parent().find('.name').get(0).value,
            author: $(this).parent().parent().find('.author').get(0).value,
            img: $(this).parent().parent().find('#previewImg').get(0).src,
            text: tinyMCE.activeEditor.getContent({format: 'raw'}),
            date: new Date()
        };
        editTopic($(this).parent().parent().find('.name').get(0).value, newTopic);

    });

    addTopicBtn = $('<input class="addTopicBtn btn btn-info" type="button" value="Add topic">');
    addTopicBtn.click(function () {
        var modalText = addTemplate('add', $(this));
        $(modalText).appendTo('#wrapper');
        $('#myModal').modal('show');

        tinymce.init({
            width: "100%",
            height: "100%",
            selector: 'textarea',
            force_br_newlines: false,
            force_p_newlines: false,
            forced_root_block: ''
        });

        $('.image').change(function () {
            var file = $(this)[0].files[0];
            var preview = $(this).prev();
            var reader = new FileReader();
            reader.onload = function (e) {
                preview.attr('src', e.target.result);
            };
            if (file && file.type.match('image.*')) {
                reader.readAsDataURL(file)
            } else {
                preview.scr = '';
            }


        });
    });

    loginBtn = $('<input class="loginButton btn btn-success" type="button" value="login">');
    loginBtn.click(function (e) {
        var loginUser = {
            name: $('.login').get(0).value,
            password: $('.login').get(1).value
        };
        login(loginUser);
    });

    viewBtn = $('<input class="viewButton btn btn-info" type="button" value="View">');
    viewBtn.click(function (e) {
        e.stopPropagation();
        var modalText = addTemplate('view', $(this));
        $(modalText).appendTo('#wrapper');
        $('#myModal').modal('show');
    });

    registerBtn = $('<input class="registerButton btn btn-success" type="button" value="Register">');
    registerBtn.click(function (e) {
        var modalText = addTemplate('reg', $(this));
        $(modalText).appendTo('#wrapper');
        $('#myModal').modal('show');

    });

    addUserBtn = $('<input class="registerButton btn" type="button" value="Register">');
    addUserBtn.click(function (e) {
        $(this).parent().find('span').remove();
        var newUser = {
            name: $(this).parent().parent().find('.login').get(0).value,
            password: $(this).parent().parent().find('.login').get(1).value
        };
        if (newUser.name === '' || newUser.password === '') {
            var span = $('<span>Enter password and user</span>');
            $(span).insertBefore($(this));
        } else {
            addUser(newUser, $(this));
        }

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