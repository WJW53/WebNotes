function Node(value) {
    this.value = value;
    this.next = null;
}

let node1 = new Node(1);
let node2 = new Node(2);
let node3 = new Node(3);
let node4 = new Node(4);
let node5 = new Node(5);

node1.next = node2;
// node2.next = node3;
// node3.next = node4;
// node4.next = node5;
//1 2 3 4 5 

// //法0. 这个是完全正确的
// //将当前节点的指针指向上一个节点
// //然后更新当前节点和下一个节点<-->瞬移
// var reverseList = function (head) {
//     let prev = null;
//     let curr = head;
//     while (curr != null) {
//         let next = curr.next;
//         curr.next = prev;
//         prev = curr;
//         curr = next;
//     }
//     return prev;
// };


// //原理就是利用最后一个节点的指针为空,把它利用起来

// //法1. 递归版,这tm有bug,两个节点的时候就错了！改天再改，今天太晚了
// //从后向前依次改变指针指向
function inverse(root) {
    if (root === null) {//只有加上这句才是完美的递归版链表逆置
        return root;
    }
    // if(root.next === null){
    //     let temp = root.next;
    //     root.next = root;
    //     root = temp; 
    // }

    if (root.next.next === null) {//在倒数第二个节点整操作
        root.next.next = root;//
        return root.next;//出口就是返回最后的节点
    } else {
        var result = inverse(root.next);//这里会在最深层的递归里先拿到最后的节点
        root.next.next = root;//让下个节点的next指向自己
        root.next = null;//让自己的next指向空
        return result;
    }
}


//法2. 循环迭代版
var reverseList = function (head) {
    var list = head;
    var p = list;//当前节点
    var q = null;//多造出来的null节点,使得最后逆序的尾部是null

    if (p == null)	//
        return null;

    // 每次都先保存当前节点next指向的节点，然后让当前节点的next指向保存下来的节点的下个节点
    //(为了交换位置的顺序正确,就得这么操作), 然后让保存下来的节点的next指向了头部
    //即每次q都会成为头部,最后再让list重新指向头部,因为它得永远指向头部
    while (p.next !== null) {//画图,要不理解不了,也是产生了瞬移,类似上面的迭代
        q = p.next;
        p.next = q.next;
        q.next = list;
        list = q;
    }
    return list;
};

//测试

// let newRoot = inverse(new Node(77));
let newRoot = inverse();//这是只有两个节点的时候
// let newRoot = inverse(null);
// let newRoot = inverse(node1);

// let newRoot = reverseList(new Node(77));
// let newRoot = reverseList(node1);//这是只有两个节点的时候
// let newRoot = reverseList(null);
// let newRoot = reverseList(node1);

function traverse(root) {
    if (root === null) {
        return;
    }
    console.log(root.value);
    traverse(root.next);
}

traverse(newRoot);//5 4 3 2 1