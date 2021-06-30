/*本题使用【有限状态自动机】。根据字符类型和合法数值的特点，先定义状态，再画出状态转移图，最后编写代码即可。*/


var isNumber = function (s) {
  let states = [
    {' ': 0, 's': 1, 'd': 2, '.': 4}, // 0. start with 'blank'
    {'d': 2, '.': 4},                // 1. 'sign' before 'e'
    {'d': 2, '.': 3, 'e': 5, ' ': 8}, // 2. 'digit' before 'dot'
    {'d': 3, 'e': 5, ' ': 8},         // 3. 'digit' after 'dot'
    {'d': 3},                         // 4. 'digit' after 'dot' (‘blank’ before 'dot')
    {'s': 6, 'd': 7},                 // 5. 'e'
    {'d': 7},                         // 6. 'sign' after 'e'
    {'d': 7, ' ': 8},                 // 7. 'digit' after 'e'
    {' ': 8}                          // 8. end with 'blank'
  ]

  let p = 0  // start with state 0
  for (let c of s) {
    let t = ''
    if (/[0-9]/.test(c)) {
      t = 'd'
    } else if ('+-'.indexOf(c) !== -1) {
      t = 's'
    } else if ('Ee'.indexOf(c) !== -1) {
      t = 'e'
    } else if ('. '.indexOf(c) !== -1) {
      t = c
    } else {
      t = '?'
    }
    if (states[p][t] === undefined) return false
    p = states[p][t]
  }
  return [2, 3, 7, 8].indexOf(p) !== -1;
};

console.log(isNumber(" 0"))
