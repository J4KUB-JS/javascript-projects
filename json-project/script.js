//--- Understanding Basics ---
let tString = 'String'
let tString2 = "String"
let tNumber = 2
let tBoolean = true
let tNull = null
let tUndefined = undefined
let tArray = ['test',30,[20,'test2',true]]
let tObjects = {'first': 'Laurence'}
let tObjects2 = {first: 'Laurence'}
let tObjects3 = {
    first: 'Laurence',
    last: 'Jonson'
}
let tObjects4 = {}
tObjects4.first = 'Laurence' // adding property
tObjects4['last'] = 'Jonson' // adding property

let tObjects5 = {'myArray': tArray}
tObjects5.objectInside = tObjects4 //Object inside object

let myJSON = {
    "name":"Laurence",
    "age":64
}
let age = myJSON['age']

//Making object into string type to save it into local storage
let myJSONstringify = JSON.stringify(myJSON)

//Making stringified object into object
let myJSONparsed = JSON.parse(myJSONstringify)

//you can only work on parsed version of and object 
myJSONparsed.name = 'John'
//Changing one of property in object


//--- Working with json in local storage ---
//Passing names to storage/object
const addButton = document.getElementById('addButton')
const seeButton = document.getElementById('seeButton')
addButton.addEventListener('click', addToStorage)
seeButton.addEventListener('click', seeStorage)

let people = JSON.parse(localStorage.getItem('tester1')) || {"name":"none", "last":"none"}

function addToStorage(){
    let firsName = document.getElementById('firsName').value
    let lastName = document.getElementById('lastName').value
    //Adding data to object
    let myObject = {"first": firsName, "last":lastName}
    //Making stringify object to add to storage under key value "tester1"
    localStorage.setItem('tester1', JSON.stringify(myObject))
}
function seeStorage(){
    //Getting stringify object from storage under key value "tester" and parse it into object
    let tempHolder = JSON.parse(localStorage.getItem("tester1"))
    //Parsing that stringify object into object
    console.log(tempHolder)
}

//--- Getting JSON from file website or external api

const getJSON = document.getElementById('getJSON')
const outPut = document.getElementById('out-put')
const mapButton = document.getElementById('mapButton')
mapButton.addEventListener('click', testMap)
getJSON.addEventListener('click', addJSON)

//Creating own string function and so we can user it as standard string function
String.prototype.capitalize = function(){
    return this.charAt(0).toUpperCase() + this.slice(1)
}

function addJSON(){
    //getting data from internet by url with fetch (AJAX requests)
    const url = "https://randomuser.me/api/?results=10"
    //U can get data from file on computer by putting filepath into fetch
    //const url = "people.json"
    fetch(url)
    .then(function(response){
        //console.log(response.status)//checking status of request
        //getting stringify version of data
        //return response.text()
        //But we can use .json and get parse format
        return response.json()
    })
    .then(function(data){
        //getting data and parse it 
        //console.log(data)
        let people = data.results
        console.log(people)
        outPut.innerHTML = ''
        
        return people.map(function(person){
            let firstName = person.name.first.capitalize()
            let lastName = person.name.last.capitalize()

            let div = document.createElement('div')
            let img = document.createElement('img')
            let span = document.createElement('span')
            span = 
            img.src = person.picture.thumbnail

            div.innerHTML = `Person name: ${firstName} ${lastName}`
            div.appendChild(img)

            outPut.appendChild(div)
            
        })
        //outPut.innerHTML = `Firs name: ${people[0].name.first}<br> Last name: ${people[0].name.last}`
        //console.log(JSON.parse(data))
    })
    .catch(function(error){//to see if there are any errors and if so what is it
        console.log(error)
    })
}

function testMap(){
    let tempArray = [1, 2, 34, 5, 6]
    const tempArray2 = tempArray.map(function(val){
        return `<li>${val}</li>`
    })
    //because it is an array of li elements we have to join them into string
    outPut.innerHTML = tempArray2.join('')
}