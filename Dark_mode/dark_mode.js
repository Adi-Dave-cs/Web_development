function switch_mode()
{

    // Retrieve the value from localStorage
    let storedColor = localStorage.getItem('--main-color');
    if(storedColor=='black')
    {
        document.documentElement.style.setProperty('--main-color', 'yellow');
        localStorage.setItem('--main-color','yellow');
        document.documentElement.style.setProperty('--shadow', 'black');
        localStorage.setItem('--shadow','black');

    }
    else
    {
        document.documentElement.style.setProperty('--main-color', 'black');
        localStorage.setItem('--main-color','black');
        document.documentElement.style.setProperty('--shadow', 'white');
        localStorage.setItem('--shadow','white');

    }
}