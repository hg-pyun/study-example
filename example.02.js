// currying
let printInfo = group => name => console.log(group + ', ' + name);

let momoGroup = printInfo('dev-momo');
momoGroup('haegul');    // dev-momo, haegul
momoGroup('jiwon');     // dev-momo, jiwon
momoGroup('sungcheon'); // dev-momo, sungcheon