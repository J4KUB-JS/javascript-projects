const btn = document.getElementById('btn')
const btnS = document.getElementById('btnS')
const outPut = document.getElementById('output-section')
const inPutValues = document.getElementById('input-values')
const pathToTake = document.getElementById('path-to-take')

outPut.style.visibility = 'hidden'
inPutValues.style.visibility = 'hidden'
pathToTake.style.visibility = 'hidden'

let array = []
let patch = []
let temp = 0

btn.addEventListener('click', (e) =>{
    //Basic setup
    e.preventDefault()
    inPutValues.style.visibility = 'visible'

    //Adding to array
    const pointX = document.getElementById('pointOne').value
    const pointY = document.getElementById('pointTwo').value
    array.push([pointX, pointY])

    //adding to browser view
    let inputValues = document.querySelector('#input-values')
    let heading5 = document.createElement('h5')
    heading5.appendChild(document.createTextNode("["+ pointX +", "+ pointY +"]"))
    inputValues.appendChild(heading5)

    document.getElementById('pointOne').value = ''
    document.getElementById('pointTwo').value = ''
})

btnS.addEventListener('click', (e)=>{
    //Basic setup
    e.preventDefault()
    outPut.style.visibility = 'visible'

    //Setting up length of array so loop would not change
    //after deleting elements for it
    let arrayIter = array.length-1

    //Loop to go thro all iterations for array
    for(let i=0; i < arrayIter; i++){
    //Displaying sections for iterations
    drawSection(i)

    //Calculation and Displaying all calculations for current iteration
    calcPoint()
    //Setting new starting point for next iteration
    setNext()
    }

    //Displaying path that algorithm to take for points in array
    drawPath()
})

//Function to display iteration section
function drawSection(iter){
    const section = document.createElement('div')
    section.className = 'output'

    const iteration = document.createElement('h3')
    iter++
    iteration.appendChild(document.createTextNode('Iteration: '+ iter))

    section.appendChild(iteration)

    outPut.appendChild(section)
}

//Function to display all calculations for current iteration (Use in calcPoint)
function drawPointsCalc(pointNum, smallest){
    const sectionToAdd = document.getElementsByClassName('output')
    const pointHeading = document.createElement('h5')
    
    const sPoint = '['+ patch[patch.length-1][0] +', '+ patch[patch.length-1][1] +']'
    let costToGo = (array[pointNum][2]).toFixed(2)
    const nPoint = '['+ array[pointNum][0] +', '+ array[pointNum][1] +']'

    pointHeading.appendChild(document.createTextNode(sPoint +'->'+ nPoint +' = '+ costToGo))

    sectionToAdd[sectionToAdd.length-1].appendChild(pointHeading)
    costToGo = 0
}

//Function to display path that algorithm calculated to take based on points in array
function drawPath(){
    pathToTake.style.visibility = 'visible'

    const pathP = document.createElement('h5')

    let pathCombine = ''
    let finalCost = 0
    console.log(finalCost)
    for(let i = 1; i < patch.length; i++){

        finalCost = finalCost + patch[i][2]
        let pathNum = '['+ patch[i][0] +', '+ patch[i][1] +'] ->' 
        pathCombine = pathCombine + pathNum
    }
    pathCombine = pathCombine + '['+ patch[0][0] +', '+ patch[0][1] +']'
    pathCombine = pathCombine +' = '+ finalCost.toFixed(2)
    pathP.appendChild(document.createTextNode(pathCombine))
    pathToTake.appendChild(pathP)
}

//Function to calculate points and chose smallest one
function calcPoint(){

    //Function to set first starting point
    setFirst()

    temp = 0

    for(let i=0; i < array.length; i++){
        let a = Math.pow((array[i][0]-patch[patch.length-1][0]), 2)
        let b = Math.pow((array[i][1]-patch[patch.length-1][1]), 2)
        let cost = (Math.sqrt(a+b))

        pointS = [patch[patch.length-1][0],patch[patch.length-1][1]]
        pointToGo = [array[i][0],array[i][1]]
        array[i][2] = cost
        
        if(temp == 0){
            temp = cost
        }else if(temp > cost){
            temp = cost
        }
    }

    //Displaying calculation
    for(let j=0; j < array.length; j++){
        drawPointsCalc(j, temp)
    }
}

//Function to set next starting point after calculating smallest one
function setNext(){

    let toDel = 0;

    for(let i=0; i < array.length; i++){
        if(array[i][2] == temp){
            patch.push(array[i])
            toDel = i
        }
    }
    array.splice(toDel, 1)
}

//Function to set first point
function setFirst(){
    if(patch.length == 0){
        patch[0] = array[0]
        array.splice(0, 1)
    }
}