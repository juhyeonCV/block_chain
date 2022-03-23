let person = { fname : "John", lname:"Doe", age :25}

var result = ""

for(const key in person){
    result  = result + person[key]
    console.log("key: ", key)
}

console.log(result)