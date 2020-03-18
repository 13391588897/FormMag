!function(window,document,$,undefined) {

    var data = [
        {"xianjin": 1, "card": 1},
        {"xianjin": 1, "card": 1},
        {"xianjin": 1, "card": 1},
        {"xianjin": 1, "card": 1},
        {"xianjin": 1, "card": 1},
        {"xianjin": 1, "card": 1},
        {"xianjin": 1, "card": 1},
        {"xianjin": 1, "card": 1}
    ]

	var init = function() {
		initEvent();
        initTable();
	};

	var initEvent = function() {
        $('#checkAll').on('click',onCheckAllBtnClick);
        $('#reverseCheck').on('click',onReverseCheckBtnClick);
        $('#submitBtn').on('click',onSubmitBtnClick);
        $('#gobackBtn').on('click',onGobackBtnClick);
	};

    var initTable = function() {
        /*var $shopCode = $('#shopCode').val(),
        obj = JSON.parse(localStorage.getItem('key'));
        $('.header').html($shopCode + "商场确认函");*/
        getTableList(data);
    };

    var getTableList = function(data) {
        var trs = [];
        if (data.length == 0) {
            alert('暂无查询结果，请更换店铺重试！');
            return;
        }
        //获取内容
        trs.push();
        for(var i=0; i<data.length; i++) {
                trs.push(
                    '<tr>',
                        '<td>',data[i].xianjin,'</td>',
                        '<td>',data[i].card,'</td>',
                        '<td><input id="" class="promotion-checkbox" type="checkbox" /></td>',
                    '</tr>',
                )
            };
        
        $('#promotionTbody').html(trs.join(''));
        
    };

    var onCheckAllBtnClick = function() {
        var $chkLists = $('#promotionTable input.promotion-checkbox');
        $chkLists.prop('checked', true);
    };

    var onReverseCheckBtnClick = function() {
        var $chkLists = $('#promotionTable input.promotion-checkbox');
        $chkLists.each(function(){
            $(this).prop('checked',!$(this).prop('checked'));
        })
    };

    var onSubmitBtnClick = function() {
        alert(99);
    };

    var onGobackBtnClick = function(){
        window.history.go(-1);
    };

	init();
}(window,document,jQuery);
