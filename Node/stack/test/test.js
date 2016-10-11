var main = require('../stack');

var assert = require('assert');

describe('testing Stack', function () {  
    
    it('we can push to an empty stack', function () {        
        var st = main.StackClassConstructor();        
        st.push(3);        
        assert.equal(st.x[0], 3);   
     });


    it('we get undefined', function () {        
        var st = main.StackClassConstructor();   
        var actual = st.pop();     
        //st.pop();        
        assert.equal(actual, undefined);   
     });

});

