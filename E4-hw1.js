function ownProp(obj){
    for (let key in obj){
        if (obj.hasOwnProperty(key)){
        console.log(`${key}: ${obj[key]}`);
        }
    }
}

const someObj = {
    a: 1,
    b: 2,
    c: 3
}

const inheritedObj = Object.create(someObj);
inheritedObj.ownObj = 4;

ownProp(inheritedObj);
// console.log(Object.getPrototypeOf(inheritedObj));