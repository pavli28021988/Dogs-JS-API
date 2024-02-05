

let timer;
let deleteFirstPhotoDelay;

async function start(){

    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await response.json();
    //console.log(data);
    //console.log(data.message);

    createBreedList(data.message);

}

start();


function createBreedList(breedList){
    document.getElementById('breed').innerHTML = `

    <select onchange="loadByBreed(this.value)" >

            <option value="">Choose a dog breed</option>
            ${Object.keys(breedList).map((breed)=>{

                return `<option>${breed}</option>`

            }) .join('') }

        </select>
    
    `
}

async function loadByBreed(breed){

   // alert(breed)

   if(breed !=  "Choose a dog breed"){

    let response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
   let data = await response.json();
    //console.log(data.message); 

    createSlideshow(data.message);

   }

}

function createSlideshow(images){

    //console.log(images);

    let currentPosition = 0;
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)

   

        document.getElementById('slideshow').innerHTML = `

        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide" style="background-image: url('${images[1]}')"></div>
        
        `

    

   

    currentPosition += 2;

    timer = setInterval(nextSlide, 3000);

    function nextSlide(){
        document.getElementById('slideshow').insertAdjacentHTML("beforeend",`<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`);


         deleteFirstPhotoDelay = setTimeout(function(){

            document.querySelector('.slide').remove()

        }, 1000)

        if(currentPosition + 1 >= images.length){

            currentPosition = 0;

        }else{

            currentPosition++  // currentPosition = currentPosition + 1;

        }
    }

}