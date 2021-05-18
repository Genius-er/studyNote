1、安装MongoDB
    -安装
    
    -配置环境变量
        bin目录路径
        
    -在c盘根目录（默认的数据库存放路径，可用命令更改）
        -创建一个data文件夹
        -在data文件夹中创建db文件夹
        
    -打开cmd窗口
        -输入mongod启动mongodb服务器
            -可以mongod --dbpath 数据库路径 --port 端口号
                这个可以用来改变路径和端口号
                    端口号尽量用四位以上的（不要使用别人占用的端口号），最大不要超过65535
        
    -打开另一个cmd
        -输入 mongo 连接mongodb，出现 >
        
        
    -数据库（database）
        -数据库的服务器
            -服务器用来保存数据
            -mongod用来启动服务器
        -数据库的客户端
            -客户端用来操作服务器，对数据进行增删改查的操作
            -mongo 启动客户端
            
    - 基本概念
    		数据库（database）
    		集合（collection）
    		文档（document）
    			- 在MongoDB中，数据库和集合都不需要手动创建，
    				当我们创建文档时，如果文档所在的集合或数据库不存在会自动创建数据库和集合
    
    - 基本指令
    		show dbs
    		show databases
    			- 显示当前的所有数据库
    		use 数据库名
    			- 进入到指定的数据库中
    		db
    			- db表示的是当前所处的数据库
    		show collections
    			- 显示数据库中所有的集合
    			
    - 数据库的CRUD（增删改查）的操作
    		- 向数据库中插入文档
    			db.<collection>.insert(doc)
    				- 向集合中插入一个文档
    				- 例子：向test数据库中的，stus集合中插入一个新的学生对象
    					{name:"孙悟空",age:18,gender:"男"}
    					db.stus.insert({name:"孙悟空",age:18,gender:"男"})
    			
    			db.<collection>.find()
    				- 查询当前集合中的所有的文档
    				
2、MongoDB

    - MongoDB是一个NoSQL的数据库
    	- MongoDB是一款文档型数据库
    	- 数据库指的就是一个存储数据的仓库
    		数据库可以使我们完成对数据的持久化的操作
    	- MongoDB数据库中存储的数据的基本单位就是文档，
    		MongoDB中存储的就是文档，所谓文档其实就是一个“JSON”
    	- MongoDB中的“JSON”我们称为BSON，比普通的JSON的功能要更加的强大
    	- MongoDB数据库使用的是JavaScript进行操作的，在MongoDB含有一个对ES标准实现的引擎，
    		在MongoDB中所有ES中的语法中都可以使用
    		
    	- MongoDB的基本的指令
    		- 启动服务器
    			mongod --dbpath 路径 --port 端口号
    			
    		- 启动客户端
    			mongo
    		
    	- MongoDB的CRUD的操作			
    		- 基本操作
    			use 数据库
    				- 进入指定的数据库
    			show dbs
    				- 显示所有的数据库
    			show collections
    				- 显示数据库中所有的集合
    			db
    				- 显示当前所在的数据库
    				
            -生成id
                ObjectId()
                    生成唯一id
                    
                自己可以在插入时指定id
                    用法：在文档中使用_id
                        如果自己指定也必须确保唯一
    	
    		- 向数据库中插入文档
    			- db.collection.insert()
    				- insert()可以向集合中插入一个或多个文档
    			- db.collection.insertOne()
    				- 向集合中插入一个文档
    			- db.collection.insertMany()
    				- 向集合中插入多个文档
    				
    		- 查询数据库中的文档
    			- db.collection.find()
    				- 可以根据指定条件从集合中查询所有符合条件的文档
    				- 可以接受一个对象作为条件参数
    				- 返回的是一个数组
    			- db.collection.findOne()
    				- 查询第一个符合条件的文档
    				- 返回的是一个对象
    			- db.collection.find().count()
    				- 查询符合条件的文档的数量
    				
    		- 修改数据库中的文档
    			- db.collection.update()
    				- 可以修改、替换集合中的一个或多个文档
    			- db.collection.updateOne()
    				- 修改集合中的一个文档
    			- db.collection.updateMany()
    				- 修改集合中的多个文档
    			- db.collection.replaceOne()
    				- 替换集合中的一个文档
    				
    		- 删除集合中的文档
    			- db.collection.remove()
    				- 删除集合中的一个或多个文档（默认删除多个）
    			- db.collection.deleteOne()
    				- 删除集合中的一个文档
    			- db.collection.deleteMany()
    				- 删除集合中的多个文档
    			- 清空一个集合
    				db.collection.remove({})
    			- 删除一个集合
    				db.collection.drop()
    			- 删除一个数据库
    				db.dropDatabase()