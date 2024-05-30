function createObj () {
    return Object.create(null);
}

const emptyObj = createObj();
console.log(emptyObj);
console.log(Object.getPrototypeOf(emptyObj));