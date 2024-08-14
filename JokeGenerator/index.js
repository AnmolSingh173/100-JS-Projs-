//here we are acessing the elements from the html , which we will either modify or put event listeners to 

const btnEl = document.getElementById("btn")
const jokeElement = document.getElementById("joke")

//stored my api key here 
const ApiKey= "PoW/prTRVnmT+xi4/67Utw==UyvX4rxfaHeV5axf";

// using the api key to get the json 
const options ={
    method : "GET",
    headers: { 
        'X-Api-Key': ApiKey,
    },
};

//api url form where the api will make the call and get the contents from 
const apiUrl="https://api.api-ninjas.com/v1/dadjokes";

// this code here takes the joke and modifies the h2 tag and places the newly generated joke there
async function getJoke(){

    // now we want to be prepared for a situation where maybe the Api failed to get a response , it encountered an error or maybe the user went offline .. but as per our code the page will show joke loading endlessly and user will never know that there was an error , so we want to now show that was an error 
// we do it by the try-cath thing , inside try comes the thing we want to function normally, inside the catch , the thing if try fails 
    try {
        //since there is a dealy in the time the api takes to give response , we want to show Loading .... something like this 
    jokeElement.innerText = "Getting you a joke.."

    //while the joke is loading , we need the button to go away and appear when the joke is visible so that user doesnot click or spams while the api is still fetching the information , so we will disable the button for that amount oof time 
    btnEl.disabled = true;
    btnEl.innerText="Loading...";
    
    const response = await fetch(apiUrl,options);
    const data =  await response.json();
    jokeElement.innerText=data[0].joke;

    // now when the joke i sfetched we want the button to be active again and the user can now again click it to get a new joke 
    btnEl.disabled = false;
    btnEl.innerText="Tell me a joke";

        
    } catch (error) {
        jokeElement.innerText="An error has occured , try again later";
        btnEl.disabled = false;
        btnEl.innerText="Tell me a joke";
        console.log(error);
        
    }

}

//this is the event listener placed on the button , note button was acessed by document.getElementsById in the first line
btnEl.addEventListener("click",getJoke);

