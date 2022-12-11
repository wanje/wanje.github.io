function Node(data, left, right) {
   this.data = data;
   this.left = left;
   this.right = right;
   this.val = val;
}

function val() {
   return this.data;
}

function Tree() {
   this.root = null;
   this.insert = insert;
   this.preOrder = preOrder;
   this.find = find;
}

function insert(data) {
	// TODO - Add the insert logic
   var createNode=new Node(data,null,null);
   if(this.root==null){
      this.root=createNode;
   }else{
      var curNode=this.root;
      for(;true;){
         var upNode=curNode;
         if(data<curNode.data){
             curNode=curNode.left;
             if(curNode==null){
                 upNode.left=createNode;break;
             }
         }else if(data>curNode.data){
             curNode=curNode.right;
             if(curNode==null){
                 upNode.right=createNode;break;
             }
         }else{
             alert("此二叉树中已存在"+data+"，不能再插入相同值！");break;
         }
      }
   }
}

function preOrder(node) {
	// TODO - Add the preOrder traversal logic
    if(node!=null){
        console.log(node.val());
        preOrder(node.left);
        preOrder(node.right);
    }
}

function find(data) {
	// TODO - Add the search logic
    var curNode=this.root;
    for(;true;){
        var upNode=curNode;
        if(curNode!=null) console.log(curNode.val());
        if(curNode==null){
            return null;
        }else if(data==curNode.data){
            return true;
        }else if(data<curNode.data){
            curNode=curNode.left;continue;
        }else if(data>curNode.data){
            curNode=curNode.right;continue;
        }
    }
}

var nums = new Tree();
nums.insert(23);
nums.insert(45);
nums.insert(16);
nums.insert(37);
nums.insert(3);
nums.insert(99);
nums.insert(22);

//print("Preorder traversal: ");
console.log("Preorder traversal: ");
preOrder(nums.root);
//print("\n");
console.log("\n");

//putstr("Enter the value to search for: ");
console.log("Enter the value to search for: ");
//var value = parseInt(readline());
var value = parseInt(Math.random()*100);
var found = nums.find(value);
//print("\n");
console.log("\n");

if (found != null) {
   //print("Found the value: " + value + " in the Tree.");
    console.log("Found the value: " + value + " in the Tree.");
}
else {
   //print("The value: " + value + " was not found in Tree.");
    console.log("The value: " + value + " was not found in Tree.");
}
