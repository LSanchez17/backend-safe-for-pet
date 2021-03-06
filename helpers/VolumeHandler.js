/*
* Its a queueueueueueueueue
* First request is first out, limit on how many can come in
*/

class Node {
    //stores search value and ip address sending request
    constructor(val, ip = 0){
        this.val = val;
        this.ip = ip;
        this.next = null;
    }
}

class VolumeHandler {
    constructor(){
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    enqueue(val, ip){
        //empty? return first item as last item
        if(this.size === 0){
            let newNode = new Node(val);
            this.first = newNode;
            this.last = newNode;
            this.size++;

            return;
        }

        //Not empty, add to the end
        let newNode = new Node(val, ip);
        let lastNode = this.last;

        this.last = newNode;
        lastNode.next = this.last;

        this.size++;
        return;
    }

    dequeue(){
        if(this.size === 0){
            throw new Error;
        }
        if(this.size === 1){
            let returnedValue = this.first;
            this.first = null;
            this.last = null;
            this.size--;

            return returnedValue;
        }

        let currentNode = this.first;

        this.first = currentNode.next;
        this.size--;

        return currentNode.val;
    }

    leaveQueue(){
        //kick out the last item to enter the queue
        if(this.size === 0){
            throw new Error;
        }
        if(this.size === 1){
            this.first = null;
            this.last = null;
            this.size = 0;
        }

        let currNode = this.first;
        let idx = 0;

        while(idx < this.size){
            currNode = currNode.next;
            if(currNode.next === this.last){
                this.last = currNode;
                return;
            }
            idx++;
        }
    }

    peekFirstNode(){
        return this.first.val;
    }

    isEmpty(){
        if(this.size === 0 && this.first === null){
            return true;
        }
        return false;
    }

    peekSize(){
        return this.size;
    }

    checkRequestIn(ip){
        if(this.size === 0 && this.first === null){
            return false;
        }

        let currentNode = this.first;

        while(currentNode){
            if(currentNode.ip === ip){
                return true;
            }
            currentNode = currentNode.next
        }
        return false;
    }

}

module.exports = VolumeHandler; 