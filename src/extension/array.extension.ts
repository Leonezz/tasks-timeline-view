
function unique<T>(value: T, index: number, self: Array<T>) {
    return self.indexOf(value) === index;
}

Array.prototype.unique = function () {
    return this.filter(unique);
}

export default {};