class BinaryTree{
    constructor(){
        this.root=null;
    }
    insert(value){
        let n=new Node(value);
        if(this.root==null){
            this.root=n;
        }else{
            insertNewNode(this.root,n);
        }
    }
    insertNewNode(node,newNode){
        if(node.data<newNode.data){
            let oldNode=node;
            node=newNode;
            newNode = oldNode;
            insertNewNode(node,newNode);
        }else{
            if(node.left){
                if(node.left.data<newNode.data){
                    if(node.right){
                        if(node.right.data<newNode.data){
                            node=node.right;
                            insertNewNode(node,newNode);
                        }else{
                            let oldNode=node.right;
                            node.right=newNode;
                            newNode=oldNode;
                            insertNewNode(node,newNode);
                        }
                    }else{
                        node.right=newNode;
                    }
                }else{
                    let oldNode=node.left;
                    node.left=newNode;
                    newNode=oldNode;
                    insertNewNode(node,newNode);
                }
            }else{
                node.left=newNode;
            }
        }
    }
}
class Node{
    constructor(){
        this.data=data;
        this.left=null;
        this.right=null;
    }
}