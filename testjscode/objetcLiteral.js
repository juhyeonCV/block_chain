let department = "CS"

let obj = {
    name:"jhyeon",
    job:"student",
    anotehrObj:{
        first_name: "Sungchul"
    },
    etc:function(){
        return this.name + " Department: " + department
    }
};

obj.anotehrObj.last_name = "Lee"
console.log(obj)
console.log(obj["job"])
console.log(obj.etc())


function User_deifned_obj(){
    this.name = "juheyon"
    this.job = "student"
    this.anotherOjb = new function(){
        this.first_name = "oh"
    }
    this.etc = function(){
        return this.name + " Department" + department
    }
}

let user_defined_obj = new User_deifned_obj()

