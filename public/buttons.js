function ButtonItem() {
    delBtn = $('<input class="delButton btn btn-info" type="button" value="Delete">');
    delBtn.click(function () {
        deleteTopic($(this).closest('tr').find('th').contents().get(0).nodeValue);
        $(this).closest('tr').remove();
        $('.toggleDiv').remove();
    });
    this.delBtn = delBtn;

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
    this.saveBtn = saveBtn;

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
    this.logoutBtn = logoutBtn;

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
    this.editBtn = editBtn;

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
    this.addBtn = addBtn;

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
    this.addTopicBtn = addTopicBtn;

    loginBtn = $('<input class="loginButton btn btn-success" type="button" value="login">');
    loginBtn.click(function (e) {
        var loginUser = {
            name: $('.login').get(0).value,
            password: $('.login').get(1).value
        };
        login(loginUser);
    });
    this.loginBtn = loginBtn;

    viewBtn = $('<input class="viewButton btn btn-info" type="button" value="View">');
    viewBtn.click(function (e) {
        e.stopPropagation();
        var modalText = addTemplate('view', $(this));
        $(modalText).appendTo('#wrapper');
        $('#myModal').on('hide.bs.modal', function () {
            initAndModal();
        });
        $('#myModal').modal('show');
    });
    this.viewBtn = viewBtn;


    registerBtn = $('<input class="registerButton btn btn-success" type="button" value="Register">');
    registerBtn.click(function (e) {
        var modalText = addTemplate('reg', $(this));
        $(modalText).appendTo('#wrapper');
        $('#myModal').modal('show');

    });
    this.registerBtn = registerBtn;

    addUserBtn = $('<input class="registerButton btn" type="button" value="Register">');
    addUserBtn.click(function (e) {
        $(this).parent().find('span').remove();
        var newUser = {
            name: $(this).parent().parent().find('.login').get(0).value,
            password: $(this).parent().parent().find('.login').get(1).value
        };

        if (newUser.name === '' || newUser.password === '') {
            showAllert(false, 'Enter password and user', '.modal-footer');

        } else {
            addUser(newUser, $(this));
        }

    });
    this.addUserBtn = addUserBtn;

    viewCommentsBtn = $('<input class="viewButton btn btn-primary" type="button" value="View comments">');
    viewCommentsBtn.click(function (e) {
        tinymce.remove();
        $('#addCommment').remove();
        $('.saveNCommBtn').remove();

        if ($('.panel-default').length) {
            $('.panel-default').remove();
            tinymce.remove();
            $('#addCommment').remove();
            $('.saveNCommBtn').remove();
        } else {
            viewComments($(this).closest('.modal-content').find('h2').eq(0).text());
        }
    });
    this.viewCommentsBtn = viewCommentsBtn;

    addCommentsBtn = $('<input class="viewButton btn btn-primary" type="button" value="Add comment">');
    addCommentsBtn.click(function (e) {
        $('.panel-default').remove();
        $('<div id="addCommment">').appendTo(".modal-footer");
        var buttons = new ButtonItem;
        var saveBtn = buttons.returnBtn(ENUM_BTN.saveComment);
        saveNewComment.appendTo(".modal-footer");
        tinymce.init({
            width: "100%",
            height: "100%",
            selector: '#addCommment',
            force_br_newlines: false,
            force_p_newlines: false,
            forced_root_block: ''
        });
    });
    this.addCommentsBtn = addCommentsBtn;

    saveNewComment = $('<input class="saveNCommBtn btn-danger" type="button" value="Save">');
    saveNewComment.click(function (e) {
        saveComments($(this).closest('.modal-content').find('h2').eq(0).text(), {
            new: 'new',
            name: $('#logged').text().substring(8),
            text: tinyMCE.activeEditor.getContent({format: 'raw'})
        });
        tinymce.remove();
        $('#addCommment').remove();
        $(this).remove();
    });
    this.saveNewComment = saveNewComment;

    deleteComment = $('<input class="dellBtn btn-danger" type="button" value="Delete">');
    deleteComment.click(function (e) {
        deleteComm($(this).parent().find('#mongoId').text(), {name: $('#textH').text()});
        $(this).parent().remove();
    });
    this.deleteComment = deleteComment;

    editComment = $('<input class="editBtn btn-danger" type="button" value="Edit">');
    editComment.click(function (e) {

        if (!tinymce.activeEditor) {
            $(this).parent().find('.panel-body').eq(0).attr('id', 'editable');
            $(this).parent().find('.panel-body').eq(0).focus();
            var buttons = new ButtonItem;
            var saveBtn = buttons.returnBtn(ENUM_BTN.saveComment);
            tinymce.init({
                width: "100%",
                height: "100%",
                selector: '#editable',
                force_br_newlines: false,
                force_p_newlines: false,
                forced_root_block: ''
            });
            $(e.target).replaceWith(saveBtn);
        }
    });
    this.editComment = editComment;

    saveComment = $('<input class="editBtn btn-primary" type="button" value="Save">');
    saveComment.click(function (e) {
        $(this).parent().find('.panel-body').eq(0).attr('contentEditable', 'false');
        var buttons = new ButtonItem;
        var editBtn = buttons.returnBtn(ENUM_BTN.editComment);

        saveComments($(this).parent().find('#mongoId').text(), {
            name: $('#textH').text(),
            text: tinyMCE.activeEditor.getContent({format: 'raw'})
        });
        tinymce.remove();
        $(this).parent().parent().find('.viewButton').click();
        $(e.target).replaceWith(editBtn);
    });
    this.saveComment = saveComment;

    this.returnBtn = function (button) {
        return this[button];
    };
}