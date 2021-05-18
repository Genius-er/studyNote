angular.module('myApp',[])
    .controller('MyCtrl',['$scope',function ($scope) {
        $scope.todos = [
            {name:'吃饭',isChecked:false},
            {name:'睡觉',isChecked:false},
            {name:'打豆豆',isChecked:false},
        ]

        // 定义添加的方法
        $scope.add = function () {
            if($scope.newTodo){
                // 添加到后面
                // $scope.todos.push({name: $scope.newTodo, isChecked: false});
                // 收集 整理数据 添加到前面
                let obj = {
                    name: $scope.newTodo,
                    isChecked: false
                };
                $scope.todos.unshift(obj);
                $scope.newTodo = '';
            }
            else {
                alert('输入的内容不能为空')
                return
            }
        }

        // 定义删除的方法
        // 1、用递归解决遍历数组并删除元素问题
        // $scope.del = function () {
        //     $scope.todos.forEach(function (item,index) {
        //         if(item.isChecked){
        //             $scope.todos.splice(index,1);
        //             $scope.del();
        //         }
        //     })
        // }

        // 用逆向思维解决
        $scope.del = function () {
            let oldTodo = $scope.todos;
            $scope.todos = [];
            oldTodo.forEach(function (item,index) {
                if (!item.isChecked){
                    $scope.todos.push(item);
                }
            })
            
        }


        
    }])