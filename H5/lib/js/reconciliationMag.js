!function(window, document, $, undefined) {

    var Library = {

        param: {
            size: 3,
            page: 0,
            totalPage: 0
        },

        cache: {},

        $loadingWp: $('.masker-wp'),

        shopList: [
            {"id": 1, "brand": "JILINDEBERG", shopCode: "1111", shopName: "ONLY"},
            {"id": 2, "brand": "BESTSELLER", shopCode: "2222", shopName: "JJ"},
            {"id": 3, "brand": "BESTSELLER", shopCode: "3333", shopName: "SLT"},
            {"id": 4, "brand": "BESTSELLER", shopCode: "4444", shopName: "VM"},
            {"id": 5, "brand": "BESTSELLER", shopCode: "5555", shopName: "FOL"},
            {"id": 6, "brand": "BESTSELLER", shopCode: "6666", shopName: "JL"}
        ],

        init: function() {
            this.initEvent();
            this.initTable();
            //this.initDatePicker();
        },

        renderClassifySel: function() {
            var data = this.classifyArray; // 替代后台请求数据
            data.unshift({"id": 0, name: "请选择"});
            /*var optsArr = _.map(data, function(obj,num) {
               // console.log(obj);
                return '<option value="' + obj.id + '">' + obj.name + '</option>';
            });
            $('#classify').html(optsArr.join(''));*/
            var optsArr = [];
            for(var i=0; i<data.length; i++) {
                optsArr.push('<option value="' + data[i].id + '">' + data[i].name + '</option>')
            }
            //console.log(optsArr);
            $('#classify').html(optsArr.join(''));
        },

        initTable: function() {
            var that = this;
            var data = that.shopList;
            that.renderTable(data);
            //console.log(this);

            //this.$loadingWp.show();

            //$.extend(Library.param, {query: Library.param.query || ''}, {page: Library.param.page});

            /*$.get('data', Library.param, function(response) {

                if(response.success) {
                    that.renderTable(response.data);
                    that.renderPaging(response);
                } else {
                    alert('数据请求失败，请刷新重试！');
                    that.$loadingWp.hide();
                }
            }, 'json');*/
        },

        renderPaging: function(response) {
            console.log(response);
            var total = response.total,
                size = Library.param.size,
                totalPage = Math.ceil(total / size),
                i,
                pagingArr = [];

            Library.param.totalPage = totalPage;

            if (Library.param.page == 0) {
                pagingArr.push(
                    '<li class="disabled" class="first-page">',
                        '<a href="javascript:;" aria-label="Previous">',
                          '<span aria-hidden="true">&laquo;</span>',
                        '</a>',
                    '</li>',
                    '<li class="disabled" class="prev">',
                        '<a href="javascript:;">',
                          '<span aria-hidden="true">&lsaquo;</span>',
                        '</a>',
                    '</li>'
                );
            } else {
                pagingArr.push(
                    '<li class="first-page">',
                        '<a href="javascript:;" aria-label="Previous">',
                          '<span aria-hidden="true">&laquo;</span>',
                        '</a>',
                    '</li>',
                    '<li class="prev">',
                        '<a href="javascript:;">',
                          '<span aria-hidden="true">&lsaquo;</span>',
                        '</a>',
                    '</li>'
                );
            }

            for(i=0; i<totalPage; i++ ) {
                if(i == Library.param.page) {
                    pagingArr.push('<li page="', i, '" class="active"><a href="javascript:;">', (i + 1), '</a></li>');
                } else {
                     pagingArr.push('<li page="', i, '"><a href="javascript:;">', (i + 1), '</a></li>');
                }
            }

            if(Library.param.page == Library.param.totalPage - 1) {
                pagingArr.push(
                '<li class="next disabled">',
                    '<a href="javascript:;" aria-label="Next">',
                      '<span aria-hidden="true">&rsaquo;</span>',
                    '</a>',
                '</li>',
                '<li class="last-page disabled">',
                    '<a href="javascript:;" aria-label="Next">',
                      '<span aria-hidden="true">&raquo;</span>',
                    '</a>',
                '</li>'
                );
            }   else {
                pagingArr.push(
                '<li class="next">',
                    '<a href="javascript:;" aria-label="Next">',
                      '<span aria-hidden="true">&rsaquo;</span>',
                    '</a>',
                '</li>',
                '<li class="last-page">',
                    '<a href="javascript:;" aria-label="Next">',
                      '<span aria-hidden="true">&raquo;</span>',
                    '</a>',
                '</li>'
                );
            }

            /*pagingArr.push(
                '<li class="next">',
                    '<a href="javascript:;" aria-label="Next">',
                      '<span aria-hidden="true">&rsaquo;</span>',
                    '</a>',
                '</li>',
                '<li class="last-page">',
                    '<a href="javascript:;" aria-label="Next">',
                      '<span aria-hidden="true">&raquo;</span>',
                    '</a>',
                '</li>'
            );*/

            $('#pagingUl').html(pagingArr.join(''));

        },

        renderTable: function(data) {

            var trs = [];

            if (data.length == 0) {
                alert('暂无查询结果！');
                Library.$loadingWp.hide();
                return;
            }

            $.each(data, function(i,obj) {

                //var b_status = obj.borrow_status;
                //var b_status_map = {0: '未借出', 1: '已借出'};
                //var p_date = obj.p_date.split(' ')[0];
                // p_date = p_date.substring(0, p_date.indexOf(' '));
                /*var classify_map = {
                    1: "历史类",
                    2: "文学类",
                    3: "科技类",
                    4: "军事类",
                    5: "小说类",
                    6: "教科类",
                    0: "未分类"
                };*/

                trs.push(
                    '<tr>',
                      '<td><input id="', obj.id, '" class="book-checkbox" type="checkbox" /></td>',
                      '<td class="eachShop">',obj.brand,'</td>',
                      '<td class="eachShop">',obj.shopCode,'</td>',
                      '<td class="eachShop">',obj.shopName,'</td>',
                    '</tr>'
                    );

                Library.cache[obj.id] = obj;

            });

            $('#booksTable tbody').html(trs.join(''));

            Library.$loadingWp.hide();
        },

        initEvent: function() {
            $('#shopList').on('click', this.onShopListClick);
            $('#newBookBtn').on('click', this.onNewBookBtnClick);
            $('#saveBtn').on('click', this.onSaveBtnClick);
            //$('#p_date').on('click', this.showDatePicker);
            $('#booksTable').on('click', '.book-checkbox', this.onBookCheckBoxClick);
            $('#delBookBtn').on('click', this.onDelBookBtnClick);
            $('#updateBookBtn').on('click', this.onUpdateBookBtnClick);
            $('#searchBtn').on('click', this.onSearchBtnClick);
            $('#pagingUl').on('click', 'li', this.onPagingLiClick);
            $('#jumpBtn').on('click', this.onJumpBtnClick);
            $('#chkAll').on('click', this.onChkAllBtnClick);
            $('input[name=status]').on('click', this.onstatusBtnClick);
            $('input[name=b_status]').on('click', this.onBstatusBtnClick);
            $('#searchIpt').on('keyup', this.onSearchIptKey);
            $('#booksTable').on('click', '.eachShop', this.onShowConfigClick);
        },

        onShowConfigClick: function() {
            $('#bookDlg').modal({backdrop:'static'});
        },

        onSearchIptKey: function(e) {

            if(e.keyCode == 13) {
                Library.onSearchBtnClick();
            }
            console.log(e);
        },
        
        onBstatusBtnClick: function() {
            var $target = $('input[name=status][value=0]')

            if(this.value*1) {
                $target.prop('disabled',true)
            } else {
                $target.prop('disabled',false)
            }

        },

        onstatusBtnClick: function() {
            var $target = $('input[name=b_status][value=1]')

            if(this.value*1) {
                $target.prop('disabled', false)
            } else {
                $target.prop('disabled', true)
            }
        },

        onChkAllBtnClick: function() {

            var $chkLists = $('#booksTable input.book-checkbox');

                if(this.checked) {
                    $chkLists.prop('checked', true)
                } else {
                    $chkLists.prop('checked', false)
                }
        },

        onJumpBtnClick: function() {
            var $jumpIpt = $('#jumpIpt'),
                page = $jumpIpt.val();

            if (isNaN(page)) {
                alert('请输入一个正常的页数！');
                $jumpIpt.select();
                return;
            }

            if (page > Library.param.totalPage) {
                page = Library.param.totalPage;
            }

            if (page < 1) {
                page = 1;
            }

            Library.param.page = --page;
            Library.initTable();
            $('#jumpIpt').val(page * 1 + 1);
        },

        onPagingLiClick: function() {
            var $this = $(this),
                currPage;

            if ($this.hasClass('disabled')) {
                return;
            }

            if ($this.hasClass('first-page')) {
                currPage = 0;
            } else if ($this.hasClass('last-page')) {
                currPage = Library.param.totalPage - 1;
            } else if ($this.hasClass('prev')) {
                currPage = --Library.param.page;
            } else if ($this.hasClass('next')) {
                currPage = ++Library.param.page;
            } else {
                currPage = $this.attr('page');
            }

            Library.param.page = currPage;
            Library.initTable();

            $('#jumpIpt').val(currPage * 1 + 1);

        },

        onSearchBtnClick: function(e) {
            var txt = $('#searchIpt').val();
            Library.param.query = txt;
            Library.initTable();
            $('#searchIpt').select();
        },

        onUpdateBookBtnClick: function() {
            //$('#bookDlg').find('#myModalLabel').html('修改图书').end().modal('show');

            var $selectedCheckbox = $('#booksTable input.book-checkbox:checked');
            // var id = $selectedCheckbox.get(0).id;
            var id = $selectedCheckbox[0].id;

            var currObj = Library.cache[id];

            var $bookDlg = $('#bookDlg');

            Library.resetForm();

            $bookDlg.find('#bookId').val(currObj.id);
            $bookDlg.find('#name').val(currObj.name);
            $bookDlg.find('#author').val(currObj.author);
            $bookDlg.find('#publisher').val(currObj.publisher);
            $bookDlg.find('#price').val(currObj.price);
            $bookDlg.find('#p_date').val(currObj.p_date);
            $bookDlg.find('#classify').val(currObj.classify);
            $bookDlg.find('input[name=status][value='+currObj.status+']').trigger('click');
            $bookDlg.find('input[name=b_status][value='+currObj.b_status+']').trigger('click');

            // console.log(currObj);

            $('#bookDlg')
                .find('#myModalLabel').html('修改').end()
                .find('#saveBtn').html('确定修改').addClass('update').end()
                .modal('show').end();

            $('#updateBookBtn').attr('disabled', 'disabled');
            $('#delBookBtn').attr('disabled', 'disabled');
        },

        onDelBookBtnClick: function() {

            var $selectedCheckbox, ids = [];

            if (!confirm('确定要删除吗？')) {
                return;
            }

            Library.$loadingWp.show();

            $selectedCheckbox = $('#booksTable input.book-checkbox:checked');

            $selectedCheckbox.each(function() {
                ids.push(this.id);
            });

            $.get('api/books_del.php', {ids: ids.join(',')}, function(response) {
                if (response.success){
                    Library.initTable();
                } else {
                    alert('删除失败，请刷新重试！');
                }
            }, 'json');

        },

        onBookCheckBoxClick: function() {

            var len = $('#booksTable input.book-checkbox:checked').length;
            var $delBookBtn = $('#delBookBtn');
            var $updateBookBtn = $('#updateBookBtn');
            var $chkAll = $('#chkAll');

            if (len > 0) {
                $delBookBtn.removeAttr('disabled');
                if (len == 1) {
                    $updateBookBtn.removeAttr('disabled');
                } else {
                    $updateBookBtn.attr('disabled', 'disabled');
                }
            } else {
                $delBookBtn.attr('disabled', 'disabled');
            }

            if($('#booksTable input.book-checkbox').length == len) {
                $chkAll.prop('checked', true)
            } else {
                $chkAll.prop('checked', false)
            }

            if(len == 0) {
                $updateBookBtn.attr('disabled', 'disabled');
            }
        },

        initDatePicker: function() {
            /*$('#p_date').datetimepicker({
                todayBtn: true,
                format: 'yyyy-mm-dd',
                autoclose: true,
                minView: 2,
                language: 'zh-CN'
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

        },

        onNewBookBtnClick: function() {
            //$('#bookDlg').find('#myModalLabel').html('新增图书').end().modal('show');

            Library.resetForm();
            $('#bookDlg')
                /*.find('#myModalLabel').html('新增图书').end()
                .find('#saveBtn').html('保存并入库').removeClass('update').end()*/
                //.modal('show');
                .modal({backdrop:'static'});

        },

        onSaveBtnClick: function() {
            var $this = $(this), data, url;

           /* if($this.hasClass('submiting')) {
                return;
            }

            $this.addClass('submiting');*/

            /*data = {
                name: $('#name').val(),
                author: $('#author').val(),
                publisher: $('#publisher').val(),
                price: $('#price').val(),
                p_date: $('#p_date').val(),
                classify: $('#classify').val(),
                status: $('input[name=status]:checked').val(),
                borrow_status: $('input[name=b_status]:checked').val()
            };*/
            data = [
                {tableName:$('#tableName').val()},
                {fShopCode:$('#fShopCode').val(), num:$('#fShopCodeNum option:selected').text()},
                {fShopName:$('#fShopName').val(), num:$('#fShopNameNum option:selected').text(),showIt:$('input#fShopNameChk').prop('checked')?"Y":"N"},
                {fShopBrand:$('#fShopBrand').val(), num:$('#fShopBrandNum option:selected').text(),showIt:$('input#fShopBrandChk').prop('checked')?"Y":"N"},
                {fShopPhone:$('#fShopPhone').val(), num:$('#fShopPhoneNum option:selected').text(),showIt:$('input#fShopPhoneChk').prop('checked')?"Y":"N"},
                {fShopCurrency:$('#fShopCurrency').val(), num:$('#fShopCurrencyNum option:selected').text(),showIt:$('input#fShopCurrencyChk').prop('checked')?"Y":"N"},
                {fShopDanwei:$('#fShopDanwei').val(), num:$('#fShopDanweiNum option:selected').text(),showIt:$('input#fShopDanweiChk').prop('checked')?"Y":"N"},
                {fShopCompany:$('#fShopCompany').val(), num:$('#fShopCompanyNum option:selected').text(),showIt:$('input#fShopCompanyChk').prop('checked')?"Y":"N"},
                {tShop:$('#tShop').val(), num:$('#tShopNum option:selected').text(),showIt:$('input#tShopChk').prop('checked')?"Y":"N"},
                {tShopPhone:$('#tShopPhone').val(), num:$('#tShopPhoneNum option:selected').text(),showIt:$('input#tShopPhoneChk').prop('checked')?"Y":"N"},
                {tShopNumber:$('#tShopNumber').val(), num:$('#tShopNumberNum option:selected').text(),showIt:$('input#tShopNumberChk').prop('checked')?"Y":"N"},
                {tShopGroup:$('#tShopGroup').val(), num:$('#tShopGroupNum option:selected').text(),showIt:$('input#tShopGroupChk').prop('checked')?"Y":"N"},
                {tShopName:$('#tShopName').val(), num:$('#tShopNameNum option:selected').text(),showIt:$('input#tShopNameChk').prop('checked')?"Y":"N"},
                {showCheckSale:$('input#checkSaleChk').prop('checked')?"Y":"N",checkSaleQty:$('input#checkSaleQtyChk').prop('checked')?"Y":"N",checkSaleAmt:$('input#checkSaleAmtChk').prop('checked')?"Y":"N"},
                {showCheckPay:$('input#checkPayChk').prop('checked')?"Y":"N"},
                {showCheckTotal:$('input#checkTotalChk').prop('checked')?"Y":"N"},
                {remarks:$('#remarks').val()}
                /*{checkModel:}*/
            ];
                
            console.log(data);
            var ndata = data.filter(function(obj) {
                return obj.num;
            });
            var numSort = ndata.sort(Library.compare('num'));
            console.log(numSort)

            for(var i=0; i<numSort.length; i++) {
                if(numSort[i].num != "序列"){
                    if(numSort[i].num == numSort[i+1].num) {
                        alert("排序有重复，请检查！")
                        return
                    }
                }
            }
            
            /*if($.trim(data[0].tableName) == "") {
                alert("报表名不能为空！");
                $this.removeClass('submiting');
                return;
            }
            if($.trim(data[1].fShopCode) == "") {
                alert("店铺代码不能为空！");
                $this.removeClass('submiting');
                return;
            }*/
            console.log(data.tableName)

            location.href = "choose.html";

            /*if ($this.hasClass('update')) { // 修改
                data["id"] = $('#bookId').val();
                url = 'api/books_update.php';
            } else { // 新增
                url = 'api/books_add.php';
            }*/
            
            /*$.get(url, data, function(response) {
                
                if(response.success) {
                    Library.resetForm();
                } else {
                    alert("您的网络好像有问题，请刷新重试！");
                }

                $('#bookDlg').modal('hide');

                Library.initTable();

            },'json');*/
        },

        onShopListClick: function() {
            Library.initTable();
        },

        resetForm: function() {
            $('#booksForm').trigger('reset');
            $('#saveBtn').removeClass('submiting');
        },

        compare: function(num) {
            return function (a, b) {
                var value1 = a[num];
                var value2 = b[num];
                return value1 - value2;      
            }
        }

    };

    Library.init();

}(window, document, jQuery);