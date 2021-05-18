        // 提取拖拽元素的方法
        /* 
            参数：
                obj
         */
        function drag(obj){
            obj.setCapture && obj.setCapture();

            // 按下鼠标开始拖拽
            obj.onmousedown = function(event){
                event = event || window.event;
                // div的偏移量 鼠标.clentX - 元素.offsetLeft
                // div的偏移量 鼠标.clentY - 元素.offsetTop
                var ol = event.clientX - obj.offsetLeft;
                var ot = event.clientY - obj.offsetTop;

    
            // 为document绑定一个onmousemove事件
            document.onmousemove = function(event){     
                event = event || window.event;
                // 鼠标移动拖拽元素
                // 获取鼠标的坐标
                var left = event.clientX - ol;
                var top = event.clientY - ot;

                // 修改box1的位置
                obj.style.left = left + "px";
                obj.style.top = top + "px";

            };

    
            // 为document绑定一个onmouseup()
            document.onmouseup = function(){
                // 鼠标松开，元素固定在当前位置
                document.onmousemove = null;

                // 取消document.onmouseup()
                document.onmouseup = null;

                obj.releaseCapture && obj.releaseCapture();
            };

            /* 
                当拖拽一个网页中的内容时，浏览器会默认区搜索引擎中搜索内容
                    此时会导致拖拽功能的异常，这个时浏览器提供的默认行为
                    如果不希望发生这个行为，则可以通过return false来取消默认行为

                但是这招对IE8不起作用
                    用捕获解决setCapture()和releaseCapture()问题（这两个方法只有IE支持）
            */
            return false;
            
            };
        }

         // 定义一个函数，用来向一个元素添加指定的class属性值
        /* 
            参数：
                obj 要添加class属性的元素
                cn 要添加的class值
         */
        function addClass(obj,cn){
            if(!hasClass(obj,cn)){
                obj.className += cn;
            }
        }

        // 判断元素中是否有指定的class属性值
        // 如果有返回true
        function hasClass(obj,cn){
            var reg = new RegExp("/\\b"+cn+"\\b");

            return reg.test(obj.className);
            
        }

        // 删除obj指定class值
        function removeClass(obj,cn){
            var reg = new RegExp("/\\b"+cn+"\\b");

            obj.className = obj.className.replace(reg,"");
            
        }

        // 切换一个类
        /* 
            如果元素中有该类，则删除
            没有则添加
         */
        function toggleClass(obj,cn){
            var reg = new RegExp("/\\b"+cn+"\\b");

            obj.className = obj.className.replace(reg,"");
            if(hasClass(obj,cn)){
                removeClass(obj,cn);
            }else{
                addClass(obj.cn)
            }
            
        }