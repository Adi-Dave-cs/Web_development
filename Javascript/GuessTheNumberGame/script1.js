var cnt = 0;
var score = 0;
var maxNumber=5, maxTries=3;
var tries = maxTries;
var generatedNum = Math.ceil(Math.random()*maxNumber);
var incr = 10, decr = 2;

function loadGame()
{
    const baseEl = document.querySelector('.difficultyChooser');
    baseEl.style.transformOrigin="center";
    baseEl.style.scale='0';
    const elToBeLoaded =  document.querySelector('.container');
    elToBeLoaded.style.transition="all 1s linear";
    elToBeLoaded.style.transformOrigin="center";
    elToBeLoaded.style.scale='1';
    document.querySelector('.game_area').style.scale = '1';
    document.querySelector('.stats').style.scale='1';
    const sc = document.querySelector('#score p');
    sc.innerText = 0;
    const tr = document.querySelector('#tries p');
    tr.innerText = tries;
    const ht = document.querySelector('#hint p');
    ht.innerText = '$$';
    score = 0;
    if(document.querySelector('.result'))
    {
        document.querySelector('.result').style.display = 'none';
    }
    if(document.querySelector('#maxVal').style.scale=='0')
    {
        document.querySelector('#maxVal').style.scale='1';
    }
    document.querySelector('#maxVal').innerText = `Choose from 1 to ${maxNumber}`;
}

function resetGame()
{
    const baseEl = document.querySelector('.begin');
    baseEl.style.transformOrigin="center";
    baseEl.style.scale='1';
    const elToBeLoaded =  document.querySelector('.container');
    elToBeLoaded.style.transition="all 0s linear";
    elToBeLoaded.style.transformOrigin="center";
    elToBeLoaded.style.scale='0';
    maxNumber=5;
    maxTries=3;
    tries = maxTries;
    score = 0;
    incr = 10;
    decr = 2;
    generatedNum = Math.ceil(Math.random()*maxNumber);
    document.querySelector('.game_area input').value = '';
    Array.from(document.querySelectorAll("[type='radio']")).forEach((el)=>{el.checked = false;});
    setDifficulty(1);
}

function chooseDifficulty(){
    const baseEl = document.querySelector('.begin');
    baseEl.style.transformOrigin="center";
    baseEl.style.scale='0';
    const elToBeLoaded =  document.querySelector('.difficultyChooser');
    elToBeLoaded.style.transition="all 1s linear";
    elToBeLoaded.style.transformOrigin="center";
    elToBeLoaded.style.scale='1';
    setDifficulty(1);
}

function toggle()
{
    cnt+=1;
    if((cnt%3 )== 1)
    {
        const elem = document.querySelector('.toggle > p');
        const btn = document.querySelector('.toggle > button');
        elem.innerText = '';
        btn.innerHTML = `&#8594;`;
        btn.style.cssText=`
        position : relative;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);`;
        chooseDifficulty();
    }
    else if((cnt%3) == 2)
    {
        const elem = document.querySelector('.toggle > p');
        const btn = document.querySelector('.toggle > button');
        elem.innerText = 'GO HOME';
        btn.innerHTML = `&#8592;`;
        btn.style.cssText=`
        position : relative;
        tranform : rotate(90deg);
        left:90%;
        top:50%;
        transform: translate(-50%,-50%);`;
        loadGame();
    }
    else{
        const elem = document.querySelector('.toggle > p');
        const btn = document.querySelector('.toggle > button');
        elem.innerText = 'GAME ON';
        btn.innerHTML = `&#8594;`;
        btn.style.cssText=`
        position : relative;
        left:10%;
        top:50%;
        transform: translate(-50%,-50%);`;
        resetGame();
    }
    return;
}

function setDifficulty(num)
{
    if(num==1){
        maxNumber=5;
        maxTries=3;
        incr = 10;
        decr = 2;
        const pr = document.querySelector('.difficultyChooser p');
        pr.style.color = 'white';
        pr.innerText = `EASY => Gains on success : ${incr} , Loss on each try : ${decr} `;
    }
    else if(num==2)
    {
        maxNumber=10;
        maxTries=5;
        incr = 15;
        decr = 4;
        const pr = document.querySelector('.difficultyChooser p');
        pr.style.color = 'cyan';
        pr.innerText = `MEDIUM => Gains on success : ${incr} , Loss on each try : ${decr} `;
    }
    else if(num==3)
    {
        maxNumber=20;
        maxTries = 10;
        incr = 55;
        decr = 6;
        const pr = document.querySelector('.difficultyChooser p');
        pr.style.color = 'yellow';
        pr.innerText = `HARD => Gains on success : ${incr} , Loss on each try : ${decr} `;
    }
    else{
        maxNumber=40;
        maxTries=15;
        incr = 130;
        decr = 9;
        const pr = document.querySelector('.difficultyChooser p');
        pr.style.color = 'BLACK';
        pr.innerText = `EXPERT => Gains on success : ${incr} , Loss on each try : ${decr} `;
    }
    tries = maxTries;
    generatedNum = Math.ceil(Math.random()*maxNumber);
}

function checkEquality()
{
    const p = document.querySelector('.game_area input');
    
    if(p.value == '' || parseInt(p.value) > maxNumber || isNaN(parseInt(p.value)))
    {
        p.value = '';
        alert(`Enter a number between 1 and ${maxNumber}`);
        return;
    }
    tries-=1;
    if(p && parseInt(p.value) == generatedNum)
    {
        score+=incr;
        document.querySelector('.game_area').style.scale = '0';
        document.querySelector('.stats').style.scale='0';
        document.querySelector('#maxVal').style.scale='0';
        if(!document.querySelector('.result'))
        {
        const q = document.createElement('div');
        q.classList.add('result');
        q.innerText = `Won !!! your score : ${score} after ${maxTries - tries} guesses`;
        document.querySelector('.container').appendChild(q);
        }
        else
        {
            document.querySelector('.result').style.display = 'flex';
            document.querySelector('.result').innerText = `Won !!! your score : ${score} after ${maxTries - tries} guesses`;
        }
        tries = maxTries;
    }
    else if (p)
    {
        score-=decr;
        if(tries==0)
        {
            document.querySelector('.game_area').style.scale = '0';
            document.querySelector('.stats').style.scale='0';
            document.querySelector('#maxVal').style.scale='0';
            if(!document.querySelector('.result'))
            {
            const q = document.createElement('div');
            q.classList.add('result');
            q.innerText = `Lost !!! your score : ${score} after ${maxTries} tries `;
            document.querySelector('.container').appendChild(q);
            }
            else
            {
                document.querySelector('.result').style.display = 'flex';
                document.querySelector('.result').innerText = `Lost !!! your score : ${score} after ${maxTries} tries `;
            }
            tries=maxTries;
        }
    }
    const ht = document.querySelector('#hint p');
    if(parseInt(p.value) > generatedNum){
        ht.innerText = "Lower your guess!";
    }
    else{
        ht.innerText = "Raise your guess!";
    }
    const sc = document.querySelector('#score p');
    sc.innerText = score;
    const tr = document.querySelector('#tries p');
    tr.innerText = tries;
    p.value = '';
}