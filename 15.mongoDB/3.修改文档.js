/*
    修改
     db.collection.update(查询条件,新对象)
        - update()默认情况下会使用新对象来替换旧的对象
        - 如果需要修改指定的属性，而不是替换需要使用“修改操作符”来完成修改
            $set 可以用来修改文档中的指定属性
            $unset 可以用来删除文档的指定属性
        - update()默认只会修改一个
            
        db.collection.updateMany()
        - 同时修改多个符合条件的文档
   
        db.collection.updateOne()
        - 修改一个符合条件的文档    
        
        db.collection.replaceOne()
        - 替换一个文档

        // 通用方法，有第三个配置参数
        db.collection.update(
           <query>,
           <update>,
           {
             upsert: <boolean>,
             multi: <boolean>,
             writeConcern: <document>,
             collation: <document>,
             arrayFilters: [ <filterdocument1>, ... ],
             hint:  <document|string>        // Available starting in MongoDB 4.2
           }

        //MongoDB的文档的属性值也可以是一个文档，当一个文档的属性值是一个文档时，我们称这个文档叫做 内嵌文档
        //MongoDB支持直接通过内嵌文档的属性进行查询，如果要查询内嵌文档则可以通过.的形式来匹配
        //如果要通过内嵌文档来对文档进行查询，此时属性名必须使用引号
        //如果数组中有一个值符合，就匹配

        //14.向tangseng中添加一个新的电影Interstellar
        //$push 用于向数组中添加一个新的元素
        //$addToSet 向数组中添加一个新元素 ， 如果数组中已经存在了该元素，则不会添加
        db.users.update({username:"tangseng"},{$push:{"hobby.movies":"Interstellar"}});
        db.users.update({username:"tangseng"},{$addToSet:{"hobby.movies":"Interstellar"}});
        db.users.find();
)
*/
db.stus.find({});

//替换
db.stus.update({name:"沙和尚"},{age:28});


// 这个才是修改
db.stus.update(
    {"_id" : ObjectId("59c219689410bc1dbecc0709")},
    {$set:{
        gender:"男",
        address:"流沙河"
    }}    
)

//删除文档的指定属性
db.stus.update(
    {"_id" : ObjectId("59c219689410bc1dbecc0709")},
    {$unset:{
        address:1
    }}    
)

db.stus.updateMany(
    {"name" : "猪八戒"},
    {
        $set:{
            address:"猪老庄"
        }
    }    
);
    
db.stus.update(
    {"name" : "猪八戒"},
    
    {
        $set:{
        address:"呵呵呵"
        }
    }  ,
    {
        multi:true
    }    
)

db.stus.find()
