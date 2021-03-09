let number = 0;
export default class VNode {
    constructor(tag,//标签类型,DIV,SPAN,INPUT,#TEXT...
        elm,//对应的真实节点
        children,//当前虚拟节点的子节点
        text,//当前虚拟节点中的文本
        data,//VNodeData,暂时保留,预留字段
        parent,//父级VNode节点
        nodeType,//节点类型
        key,
    ) {
        this.tag = tag;
        this.elm = elm;
        this.children = children;
        this.text = text;
        this.data = data;
        this.parent = parent;
        this.nodeType = nodeType;
        this.key = key;
        this.env = {};//当前结点的环境变量,便于子节点继承
        this.instructions = null;//存放指令
        this.template = [];//当前节点涉及到的模板
        this.number = ++number;//看看是哪个节点,调试的时候用的
    }
}