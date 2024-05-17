let old_records = [];

const mutationObserver = new MutationObserver((entries)=>
{
    // console.log(entries);
    for(let entry of entries)
    {
        old_records.push(entry.oldValue);
    }
});

const div_text = document.querySelector('#parent');
mutationObserver.observe(div_text,{childList:true,subtree:true,characterData:true,characterDataOldValue:true});


document.querySelector('#undo_btn').addEventListener('click',()=>{

    if(old_records.length){
        for(let logs in old_records)
            console.log(old_records[logs]);
    }
    else
    {
        alert('No changes yet');
    }
});

document.querySelector('#redo_btn').addEventListener('click',()=>{
    if(old_records.length){
        for(let logs in old_records)
            console.log(old_records[logs]);
    }
    else
    {
        alert('No changes yet');
    }
});