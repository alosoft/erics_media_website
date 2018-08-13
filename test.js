// var n = [23,33,15,66,51,35,80];
var data = [
    {name: 'Alonso', age: new Date('Apr 2 1994')},
    {name: 'Jules', age: new Date('Dec 7 1992')},
    {name: 'Suzzy', age: new Date('Mar 15 1996')},
    {name: 'Gloria', age: new Date('Jan 20 1999')},
    {name: 'Abena', age: new Date('Jun 8 1999')}
];

function gloria(array) {
    let arr = [];
    for (var i = array.length - 1; i >= 0; --i) {
        arr.push(array[i]);
    }
    return arr;
}

console.log(gloria(data));

function testing(n) {
    let t = [];
    for (var i = 0; i < n.length; i++) {
        for (var j = i + 1; j < n.length; j++) {
            if (n[i].age.getTime() < n[j].age.getTime()) {
                // t = n[i];
                // n[i] = n[j];
                // n[j] = t;
                t.push(n[i]);
                console.log(n[i].name, ' is older than ', n[j].name);
            } else {
                // t = n[j];
                // n[j] = n[i];
                // n[i] = t;
                t.push(n[j]);
                console.log(n[j].name, ' is older than ', n[i].name);

                // console.log(n[j].age.getTime());
                //

            }
        }
    }
    // return t;
    console.log(t);
}

const test = testing(data);