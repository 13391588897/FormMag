!function(window,document,$,undefined) {
    var init = function() {
        initEvent();
        initDatePicker();
    };

    var initEvent = function() {
        $('#checkSale').on('click',onCheckSaleBtnClick);
        $('#checkPay').on('click',onCheckPayBtnClick);
        $('#oriOrProm').on('click',onOriOrPromBtnClick);
    };

    var initDatePicker = function() {
        /*$('#datetimepicker').datetimepicker({
            format: 'yyyy-mm-dd',
            minView:'month',
            language: 'zh-CN',
            autoclose:true,
        });*/
        $("#datetimeStart").datetimepicker({
            format: 'yyyy-mm-dd',
            minView:'month',
            language: 'zh-CN',
            autoclose:true,
            //startDate:new Date()
        }).on("changeDate",function(ev){  //值改变事件
            if(ev.date){
              $("#datetimeEnd").datetimepicker('setStartDate', new Date(ev.date.valueOf()));
            }else{
              $("#datetimeEnd").datetimepicker('setStartDate',null);
            }
        });
        $("#datetimeEnd").datetimepicker({
            format: 'yyyy-mm-dd',
            minView:'month',
            language: 'zh-CN',
            autoclose:true,
            //startDate:new Date()
        }).on("changeDate",function(ev){
            if(ev.date){
              $("#datetimeStart").datetimepicker('setEndDate', new Date(ev.date.valueOf()));
            }else{
              $("#datetimeStart").datetimepicker('setEndDate',new Date());
            }
        });
    };

    var onCheckSaleBtnClick = function() {
        var params = {
            datetimeStart: $("#datetimeStart").val(),
            datetimeEnd: $("#datetimeEnd").val()
        };
        console.log(params);
        location.href = "checksale.html";
    };

    var onCheckPayBtnClick = function() {
        var params = {
            datetimeStart: $("#datetimeStart").val(),
            datetimeEnd: $("#datetimeEnd").val()
        };
    };

    var onOriOrPromBtnClick = function() {
        var params = {
            datetimeStart: $("#datetimeStart").val(),
            datetimeEnd: $("#datetimeEnd").val()
        };
    };

    init();        
}(window,document,jQuery);
