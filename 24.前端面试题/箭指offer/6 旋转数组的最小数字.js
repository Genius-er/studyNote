function minNumberInRotateArray(rotateArray) {
    /*找出旋转位置*/
    let rotatePosition = 0
    for (var i = 1; i < rotateArray.length; i++) {
        console.log(rotateArray[i],rotateArray[i-1])
        if (rotateArray[i] < rotateArray[i-1]) {
            rotatePosition = i
        }
    }
    return rotateArray[rotatePosition]

}
module.exports = {
    minNumberInRotateArray : minNumberInRotateArray
};

console.log(minNumberInRotateArray([3,4,5,1,2]))
