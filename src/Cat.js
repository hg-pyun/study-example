// Cat.js
export default class {
    constructor(name){  // 생성자
        this.name = name;
    }

    // 함수
    getName(){
        return `Name is ${this.name}`;  // ECMA2015 templates
    }

    bawl(){
        return "야옹~~~~~~";
    }
}