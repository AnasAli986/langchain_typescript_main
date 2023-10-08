// Specifying the type of a variable 
let myNumber : number = 42 
let nothing : null = null 
let foo : undefined = undefined 

myNumber = 60

// Type inference 
let x = 27;
console.log(typeof(x))

// Type any 
let reallyN1 : any = 2 
reallyN1 = "What "

// Delayed init and implicit any 
let foundMovie; // Any type 
let anotherFoundMovie : string | undefined;

// Assign types to function parameters 

// Default parameters 
function Greet(num: number = 10) {
    console.log(num)
}
Greet();

// Return types 
function editString(name: string = "anas") : string {
    return name + " cool"
}

function returnList(n1: string = "anas1", n2: string = "anas2") : object {
    return {n1, n2}
}

console.log(returnList())

// void type 

// never 

function executing(val: number = 10): never {
    // function always throws and exception so it wouldnt return anything anyways or it
    // always continues in a loop
    throw(console.error("Error happening bro"))
}

// executing();


// Object types 
const printName = (name: {firstName: string, secondName: string}): string => {
    return name["firstName"] + name["secondName"]
}

console.log(printName({firstName: "anas", secondName: "ali"}))

let coordinate: {x: number, y: number} = {x: 34, y: 46}
console.log(coordinate) 

const printNum1 = (x1: number, x2: number): {x1: number, x2: number} => {
    return {x1, x2}
} 

console.log(printNum1(10, 20))

// Excess properties *

// Class private fields : #variable_name = 10

class Player {
    // readonly first: string // Unique to typescript? // Can still modify in constructor 
    // public last: string 
    // private score = 0

    // Default is public, private and public is unique to typescript 
    constructor(public first: string, 
        public last: string, 
        public score: number) {
        this.first = first 
        this.last = last 
    }
}


const player = new Player("Hey", "Man", 0);
// player.score // Not accessible 
console.log(player)