var StackClass = {    
    
    x: [],    
    
    push: function(element) {        
        this.x.push(element);}, 

    pop: function() {        return this.x.pop();    }, 
       
    peek: function() {        
        return this.x[this.x.length - 1];    
    }
}
    
function StackClassConstructor() {    
    var o = Object.create(StackClass);        
    return o;
}

var sc = StackClassConstructor();
sc.push(1);
sc.push(2);
sc.push(3);
sc.push(4);
sc.pop();
console.log(sc.peek());

//exports.StackClass = StackClass;
//exports.StackClassConstructor = StackClassConstructor;

/*
function Foo() {    
    this.x = 9;
}

Foo.prototype = {    
    foo: function () {},    
    bar: function () {}
};
    
var f = new Foo();
f.x 
f.foo();
f.bar();
*/

// 9f.foo();
