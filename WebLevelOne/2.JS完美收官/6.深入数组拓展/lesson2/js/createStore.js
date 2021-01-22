function createStore (initialState) {
    var state = initialState || {};
    var list = [];
    function getState (type) {
        return state[type];
    }
    function dispatch (action) {
        state[action.type] = action.value; 
        //调用之前订阅过的函数
        list.forEach(function (ele) {
            ele();
        })
    }
    function subscribe (func) {
        list.push(func)
    }
    return {
        getState: getState,
        dispatch: dispatch,
        subscribe: subscribe
    }
}

var store = createStore({text: '',sex: 'a'});



