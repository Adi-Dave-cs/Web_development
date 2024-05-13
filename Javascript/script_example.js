const apiEndPoint = `https://corporatebs-generator.sameerkumar.website/`;

async function xhr_call_make()
{
    const xhr = new XMLHttpRequest();
    xhr.open('GET',apiEndPoint);
    xhr.responseType='json';
    xhr.addEventListener('load',(res)=>{
        const data = xhr.response;
        document.querySelector('.response').innerText = ` Fetched Value : Xhr :  ` +  data.phrase;
    },{once:true});
    xhr.send();
}

async function call_fetch()
{
    const ans = await fetch(apiEndPoint).then(res => res.json()).then((data)=>{
        document.querySelector('.response').innerText = ` Fetched Value : Fetch APi :  ` +  data.phrase;
    });
    return ans;
}

async function xhr_call()
{
    xhr_call_make();
}

async function fetch_api()
{
    call_fetch();
    
}