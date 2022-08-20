export class Todotask {
   allTask = []

//    phương thức 
// thêm việc vào mảng allTask
addTask(ViecCanlam) {
    // spread operator
this.allTask = [...this.allTask,ViecCanlam]
}
// Xoá việc trong mảng allTask 
deleteTask (id) { //dùng hàm filter để trả về các task ko trùng id với id bị chọn xoá 
    this.allTask = this.allTask.filter(task => task.id != id )

}
//find task 
findTask (id) {
    return this.allTask.find(task => task.id === id)
}

sortTaskAZ() {
    return this.allTask.sort((a, b) => a.content.localeCompare(b.content));
}

sortTaskZA() {
    return this.allTask.sort((a, b) => b.content.localeCompare(a.content));
}

}