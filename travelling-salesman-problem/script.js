const btn = document.getElementById('btn')
const btnS = document.getElementById('btnS')
const outPut = document.getElementById('output-section')
const inPutValues = document.getElementById('input-values')
const pathToTake = document.getElementById('path-to-take')

outPut.style.visibility = 'hidden'
inPutValues.style.visibility = 'hidden'
pathToTake.style.visibility = 'hidden'


let array = [
    [5, 8, 0],
    [1, 1, 0],
    [7, 12, 0],
    [2, 9, 0],
    [7, 2, 0],
    [1, 12, 0],
    [4, 2, 0]
]
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
    console.log('Iteration nr: '+ (i+1))

    drawSection(i)

    calcPoint()


    setNext()
    }

    drawPath()

    for(let j=0; j < patch.length; j++){
        let point = [patch[j][0],patch[j][1]]
        console.log((j+1)+': '+point)
        
    }
})


function drawSection(iter){
    const section = document.createElement('div')
    section.className = 'output'

    const iteration = document.createElement('h3')
    iter++
    iteration.appendChild(document.createTextNode('Iteration: '+ iter))

    section.appendChild(iteration)

    outPut.appendChild(section)
}

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

function drawPath(){
    pathToTake.style.visibility = 'visible'

    const pathP = document.createElement('h5')

    let pathCombine = ''

    for(let i = 0; i < patch.length; i++){

        let pathNum = '['+ patch[i][0] +', '+ patch[i][1] +'] ->' 
        pathCombine = pathCombine + pathNum
    }
    pathCombine = pathCombine + '['+ patch[0][0] +', '+ patch[0][1] +']'
    pathP.appendChild(document.createTextNode(pathCombine))

    pathToTake.appendChild(pathP)

}


function calcPoint(){

    setFirst()

    temp = 0

    for(let i=0; i < array.length; i++){
        let a = Math.pow((array[i][0]-patch[patch.length-1][0]), 2)
        let b = Math.pow((array[i][1]-patch[patch.length-1][1]), 2)
        let cost = (Math.sqrt(a+b))

        pointS = [patch[patch.length-1][0],patch[patch.length-1][1]]
        pointToGo = [array[i][0],array[i][1]]
        console.log(pointS +' and '+ pointToGo +' = '+ cost)
        array[i][2] = cost
        
        if(temp == 0){
            temp = cost
        }else if(temp > cost){
            temp = cost
        }
    }

    console.log('Smallest cost is: '+ temp)

    console.log('-Before Delete-')
    for(let j=0; j < array.length; j++){
        console.log((j+1)+ ': ' +array[j])
        drawPointsCalc(j, temp)
    }
}

function setNext(){

    let toDel = 0;

    for(let i=0; i < array.length; i++){
        if(array[i][2] == temp){
            patch.push(array[i])
            toDel = i
        }
    }
    array.splice(toDel, 1)

    console.log('-After Delete-')
    for(let j=0; j < array.length; j++){
        console.log((j+1)+ ': ' +array[j])
    }

}

function setFirst(){
    if(patch.length == 0){
        patch[0] = array[0]
        console.log('Point Start: '+patch[0])
        array.splice(0, 1)
    }else{
        console.log('Point Start: '+patch[patch.length-1])
    }
}