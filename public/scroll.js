var page=1;
var limit=2;
var loading = false;


function loadMore(keyworld){
   var  keyworld=keyworld||'';
        request1= getContent(page,limit,keyworld);
        page++;
        request2= $.ajax({
            url: "/api/login/logged",
            type: "GET"
        });
        $.when(request1, request2).done(function (response1,response2) {
            $.each(response1[0], function (index) {
                template = $('#mustache_topic').html();
                data={
                    name:response1[0][index].name,
                    date: new Date(response1[0][index].date).toLocaleString('en-GB',options),
                    author:response1[0][index].author,
                    text:response1[0][index].text,
                    img:response1[0][index].img,
                    comments:response1[0][index].comments
                };
                var $copy = Mustache.to_html(template, data);
                $copy = $($copy);
                $copy.appendTo('#wrapper');
                var buttons = new ButtonItem;
                var editBtn = buttons.returnBtn(ENUM_BTN.edit);
                var delBtn = buttons.returnBtn(ENUM_BTN.delete);
                var viewBtn = buttons.returnBtn(ENUM_BTN.view);
                viewBtn.appendTo($copy.find('.buttons'));
                if (response2[0] === response1[0][index].author) {
                    editBtn.insertAfter($copy.find('.buttons'));
                    delBtn.insertAfter($copy.find('.buttons'));
                }
            });
        });
    $.when(request1, request2).fail(function (xhr, status) {
        $('.all').remove();
        var $allert= $('<div class="alert alert-danger collapse all" role="alert">')
        $allert.appendTo('#wrapper');
        $allert.html("That's All,folks!")
            .show()
    })
    }
