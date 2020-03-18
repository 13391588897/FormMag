!function(window,document,$,undefined) {

    var data = [{
        "riqi": "2020-1-1",
        "小计数量": "1",
        "小计金额": "",
        "mingxi": [
            {
                "cuxiao": "正价",
                "cuxiaomingxi": {
                    
                     "jine": "100.00"
                }
            },
            {
                "cuxiao": "促销1",
                "cuxiaomingxi": {
                    
                     "jine": "200.00"
                }
            },
            {
            "cuxiao": "促销2",
                "cuxiaomingxi": {
                   
                     "jine": "300.00"
                }
            },
           {
            "cuxiao": "正价",
            "cuxiaomingxi": {
                
                 "jine": "100.00"
                }
           },
           {
            "cuxiao": "促销1",
            "cuxiaomingxi": {
                 
                 "jine": "200.00"
                }
           },
           {
            "cuxiao": "促销2",
            "cuxiaomingxi": {
                
                 "jine": "300.00"
                }
           }
        ]
    },
    {
        "riqi": "2020-1-2",
        "小计数量": "1",
        "小计金额": "",
        "mingxi": [
            {
            "cuxiao": "正价",
            "cuxiaomingxi": {
                 "shuliang": "1",
                 "jine": "100.00"
                }
            },
            {
            "cuxiao": "促销1",
            "cuxiaomingxi": {
                 "shuliang": "2",
                 "jine": "100.00"
                }
            },
            {
            "cuxiao": "促销2",
                "cuxiaomingxi": {
                 "shuliang": "3",
                 "jine": "100.00"
                }
            }
        ]
    }];

    var dataBase = [
        {
            "num": "2",
            "key": "店铺代码",
            "value": "6318"
        },
        {
            "num": "1",
            "key": "店铺名称",
            "value": "上海正大JJ"
        },
        {
            "num": "4",
            "key": "店铺销售",
            "value": "6328"
        },
        {
            "num": "3",
            "key": "店铺地址",
            "value": "上海正大JJ"
        }
    ];
    dataBase = dataBase.sort(function(a,b) {
      return a.num - b.num;
    });

    var params = {};

	var init = function() {
		initEvent();
        initTable();
	};

	var initEvent = function() {
		$('#query').on('click',initTable);
        $('#configBtn').on('click',onConfigBtnClick);
        $('#conformThead').on('click','th',orderByData);
	};

    var initTable = function() {
        /*var $shopCode = $('#shopCode').val(),
        obj = JSON.parse(localStorage.getItem('key'));
        $('.header').html($shopCode + "商场确认函");*/
        getBaseInformation(dataBase);
        getTableList(data);
    };

    var getBaseInformation = function(dataBase) {
        var $formName = $('.formName');
        $formName.html(dataBase[1].key);

        var optsArr = [];
        /*for(var i=0; i<dataBase.length; i++) {
            optsArr.push('<div class="' + 'col-lg-4 col-sm-4 mb-10"'+ '>' + dataBase[i].key + ':&nbsp<input type="' + 'text"' + 'value="' + dataBase[i].value + '" /></div>')
        }*/
        for(var i=0; i<dataBase.length; i++) {
            optsArr.push('<div class="' + 'col-lg-4 col-sm-4 mb-10"'+ '>' + dataBase[i].key + ':&nbsp<span>' + dataBase[i].value + '</span></div>')
        }
        $('#getBaseInformation').html(optsArr.join(''));
    }

    var getTableList = function(data) {
        var trs = [];
        if (data.length == 0) {
          alert('暂无查询结果，请更换店铺重试！');
          return;
        }

        //获取表头
        var mingxi = data[0].mingxi;
        var ths = ['<tr>','<th ' + 'rowspan="2"' + '>日期</th>'];
        if(Object.keys(mingxi[0].cuxiaomingxi).length == 1) {
            for(var i=0; i<mingxi.length; i++) {
                ths.push(
                    '<th  ' +  'colspan="1"' + '>',
                        mingxi[i].cuxiao,
                    '</th>'
                )
            }
        }else{
            for(var i=0; i<mingxi.length; i++) {
                ths.push(
                    '<th  ' +  'colspan="2"' + '>',
                        mingxi[i].cuxiao,
                    '</th>'
                )
            }
        }
        
        ths.push('</tr>')
        for(var i=0; i<mingxi.length; i++) {
            for(var j=0; j<Object.keys(mingxi[0].cuxiaomingxi).length; j++) {
                ths.push(
                    '<th>',Object.keys(mingxi[0].cuxiaomingxi)[j],'</th>',
                )
            }
        }   
        conformThead.innerHTML= ths.join('');

        //获取内容
        if(Object.keys(mingxi[0].cuxiaomingxi).length == 1) {
            if(Object.keys(mingxi[0].cuxiaomingxi)[0] == "shuliang") {
                for(var i=0; i<data.length; i++) {
                    trs.push(
                        '<tr>',
                        '<td>',data[i].riqi,'</td>',
                    )
                    for(var k=0;k<mingxi.length; k++) {
                        trs.push(
                        '<td>',mingxi[k].cuxiaomingxi.shuliang,'</td>',
                        )
                    }
                    trs.push('</tr>')
                };
            }else{
                for(var i=0; i<data.length; i++) {
                    trs.push(
                        '<tr>',
                        '<td>',data[i].riqi,'</td>',
                    )
                    for(var k=0;k<mingxi.length; k++) {
                        trs.push(
                        '<td>',mingxi[k].cuxiaomingxi.jine,'</td>',
                        )
                    }
                    trs.push('</tr>')
                };
            }
        }else {
            for(var i=0; i<data.length; i++) {
                trs.push(
                    '<tr>',
                    '<td>',data[i].riqi,'</td>',
                )
                for(var k=0;k<mingxi.length; k++) {
                    trs.push(
                    '<td>',mingxi[k].cuxiaomingxi.shuliang,'</td>',
                    '<td>',mingxi[k].cuxiaomingxi.jine,'</td>'
                    )
                }
                trs.push('</tr>')
            }; 
        }

        //获取合计
        trs.push(
            '<tr>',
                '<td class="t_a" colspan="1">',"合计",'</td>',
                '<td colspan="',mingxi.length*2,'"></td>',
            '</tr>'
        );
        conformTbody.innerHTML= trs.join('');

        //获取说明事项
        $('#remarkstext').html("你好");
        //获取生成时间
        $('#timetext').html("2020-01-01");
    };

    //时间排序
    var orderByData = function() {
        var sort_ary;
        if ($(this).attr('sort') == 'desc') {
            //  逆序排序
            sort_ary = data.sort(compare($(this).attr('key'),-1));
            getTableList(sort_ary);
            $(this).attr('sort', 'asc'); 
        } else {
            //  正序排序
            sort_ary = data.sort(compare($(this).attr('key'),1));
            getTableList(sort_ary);
            $(this).attr('sort', 'desc');
        }
    };
    var compare = function(prop,type) {
        return function (obj1, obj2) {
            var val1 = obj1[prop];
            var val2 = obj2[prop];
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                val1 = Number(val1);
                val2 = Number(val2);
            }
            if (val1 < val2) {
                return 0-type;
            } else if (val1 > val2) {
                return type;
            } else {
                return 0;
            }            
        } 
    };

    //千位符
    var Number = {
        formatAmount:function(num) {
            if(!num){
                return 0;
            }
            var num_top  = "";   
            var num_tail = "";
            var result = "";
            var re = new RegExp("^(-?\\d+)(\\.\\d+)$"); //判断是否是浮点数 
            if (re.test(num)){
                strSum = new String(num);
                if(strSum.indexOf(".") > -1) {                 
                    num_tail = strSum.split(".")[1];  
                    num_top = strSum.split(".")[0];
                }
                while (num_top.length > 3) {
                    result = ',' + num_top.slice(-3) + result;
                    num_top = num_top.slice(0, num_top.length - 3);
                }
                if (num_top) { 
                    result = num_top + result +'.'+ num_tail; 
                }
            }else{
                num_top = new String(num);
                while (num_top.length > 3) {
                    result = ',' + num_top.slice(-3) + result;
                    num_top = num_top.slice(0, num_top.length - 3);
                }
                if (num_top) { 
                    result = num_top + result; 
                }
            }
            return result;
        }
    };

    var onConfigBtnClick = function() {
        var $configchecked = $('#wp input:checked');
        var params = [];
        for(var i=0; i<$configchecked.length; i++) {
          params.push($configchecked[i].value);
        };
        localStorage.setItem('key', JSON.stringify(params));
        location.href = "form.html";
    };

	init();
}(window,document,jQuery);
