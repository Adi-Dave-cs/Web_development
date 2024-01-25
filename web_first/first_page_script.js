console.log("Hi Adi this is the first time we are coding in javascript");


function myfun()
{
    if(document.getElementById('para').innerHTML == 'Hi this is an example of JS!')
    {
        document.getElementById('para').innerHTML = 'JS activated';
    }
    else
        document.getElementById('para').innerHTML = 'Hi this is an example of JS!';
}

function call_alert(){
    window.alert('this is an example of an alert!');
}


function callyt(){
    var urlToOpen = 'https://www.youtube.com/watch?v=_izCojOyiag';
    window.open(urlToOpen);
}

function myfun2()
{
    var urlToOpen = 'https://cp-algorithms.com/#new-articles';
    window.open(urlToOpen);
}