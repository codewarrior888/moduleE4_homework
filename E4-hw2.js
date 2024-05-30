const myObj = {
    a: 1,
    b: 3
};

const inheritedObj = Object.create(myObj);
inheritedObj.c = 4;

function hasProp(obj, propName){
    return obj.hasOwnProperty(propName);
}

function hasProp2(obj, propName){
    return propName in obj;
}

console.log(hasProp(inheritedObj, 'b'));
console.log(hasProp2(inheritedObj, 'b'));