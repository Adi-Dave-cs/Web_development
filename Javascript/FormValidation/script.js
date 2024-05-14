const a = document.querySelectorAll('.card_section button');

a.forEach(element => {
    element.addEventListener('click',(e)=>{

        if(e.target.innerText == '+') e.target.innerText='-';
        else
        e.target.innerText='+';
        const ans = e.target.closest('.card_section');        
        const nodes = ans.childNodes;
        for(let i=0;i<nodes.length;i++)
        {
            if(nodes[i].id && nodes[i].id.toLowerCase() == 'answer')
            {
                if(!nodes[i].style.display || nodes[i].style.display==='none')
                {
                    nodes[i].style.display='block';
                    nodes[i].style.backgroundColor="aqua";
                }
                else
                {
                    nodes[i].style.display='none';
                }
            }
        }
    });
},{once:true});
