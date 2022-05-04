//--- Getting JSON from file website or external api
const getGoogle = document.getElementById('getFromGoogle')
getGoogle.addEventListener('click', getFromGoogle)

function getFromGoogle(){
    const url = "link to API"
    
    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
    })
    .catch(function(error){
        console.log(error)
    })
}