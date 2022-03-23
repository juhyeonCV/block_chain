var name = "john";
console.log("name type : ", typeof(name));
var name1 = new String("john");
console.log("name type : ", typeof(name1));

// '==' value 비교, '' 
if (name == name1){
    console.log("value is ", name)
}

if(name === name1){
    console.log("type is ", typeof(name))
}

var num1 = 1;
var num2 = 2;
var result = 3;

const string2 = `${num1} add  ${num2} = '${result}'`
console.log(string2)