const API_KEY = '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';
const sumbit = document.querySelector('#submit');
const getinput = document.getElementById('input');
const output = document.getElementById('output');
const loading = document.getElementById('loading');
//const newchat = document.getElementById('newchat');

async function getMessage(){
    console.log('clicked');
    //console.log(getinput);
    const userinput = getinput.value; 
    const options = {
        method:'POST',
        // The Headers interface of the Fetch API allows you to perform various actions on HTTP request and response headers.
        // These actions include retrieving, setting, adding to, and removing headers from the list of the request's headers.
        headers:{
           'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({ 
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userinput}],
            max_tokens:100
        })
           
}
    try {

        //Options: It is an array of properties. It is an optional parameter.
        output.classList.add('hide');
        loading.classList.remove('hideload');
        const responce =  await fetch('https://api.openai.com/v1/chat/completions',options);
        loading.classList.add('hideload');
        const data = await responce.json();
        console.log(data);
        output.classList.remove('hide');//remove the hide class before start 
        let display = data.choices[0].message.content;
        output.innerText = display;

        

    } catch (error) {
        console.error(error);
        
    }
}

// ---------------------NEW CHAT------------------

function newchat(){
    if(getinput.value!=''){
    const ques = document.createElement('p');
    ques.innerHTML = getinput.value;
    document.getElementById('history').appendChild(ques);

    getinput.value = "";
    }

}

// ------------------------------------------------


getinput.addEventListener('keypress', (e)=> {
        
    if(getinput.value!='' && e.key === 'Enter'){
    
    getMessage();

    
    newchat();
    

    }
})

sumbit.addEventListener('click',getMessage);

