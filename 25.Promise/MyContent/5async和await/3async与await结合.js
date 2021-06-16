/*读取resource文件夹里三个文件*/


const fs = require('fs');
const util = require('util')
const mainReadFile = util.promisify(fs.readFile) // 将回调函数中错误优先的方法promise格式化

// 纯回调函数
/*fs.readFile('./resource/1.html', (err, data) => {
    if(err) throw err
    fs.readFile('./resource/2.html', (err, data2) => {
        if(err) throw err;
        fs.readFile('./resource/3.html', (err, data3) => {
            if(err) throw err;
            console.log(data + data2 + data3);
        });
    });
});*/

// async与await的实现
async function main() {
    try {
        // 读取文件的内容,如果三个有错则用try catch
        let data1 = await mainReadFile('./resource/1.html')
        let data2 = await mainReadFile('./resource/5.html')
        let data3 = await mainReadFile('./resource/3.html')
        console.log(data1 + data2 + data3);
    }catch (e) {
        console.log(e)
    }
}
main()
