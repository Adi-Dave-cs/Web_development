const NOTE_DETAILS = [
    {note : 'C' , key : 'Z' , frequency :523.25, active : false },
    {note : 'Db' , key : 'S' , frequency :554.37, active : false},
    {note : 'D' , key : 'X' , frequency : 587.33, active : false},
    {note : 'Eb' , key : 'D' , frequency : 622.25, active : false},
    {note : 'E' , key : 'C' , frequency : 659.25, active : false},
    {note : 'Fb' , key : 'F' , frequency : 739.99, active : false},
    {note : 'F' , key : 'V' , frequency : 698.46, active : false},
    {note : 'G' , key : 'B' , frequency :783.99, active : false},
    {note : 'Ab' , key : 'H' , frequency : 830.61, active : false},
    {note : 'A' , key : 'N' , frequency : 440.00, active : false},
    {note : 'Bb' , key : 'J' , frequency : 466.16, active : false},
    {note : 'B' , key : 'M' , frequency : 493.88, active : false}
];

var oscillator;

document.addEventListener('keydown',e=>{
    const v = getNoteDetails(e.key.toUpperCase());
    // console.log(v);
    if(!v)
    {
        return;
    }

    v.active = true;
    document.querySelector(`[note=${v.note}]`).classList.add('active');
    playNote(v);
});

function playNote(v)
{
    var st;
    if(v.active)
    {
    // Create an AudioContext instance
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create an OscillatorNode
    oscillator= audioContext.createOscillator();

    // Create a GainNode to control the volume
    var gainNode = audioContext.createGain();

    var frequency = v.frequency;

    // Set the frequency of the oscillator
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    // Set the waveform type to "sine" for a piano-like sound
    oscillator.type = 'sawtooth';

    // Set the attack time (time it takes for the note to reach full volume)
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.05); // 0.05 seconds

    // Set the release time (time it takes for the note to fade out after releasing the key)
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5); // 0.5 seconds

    // Connect the oscillator to the gain node, and the gain node to the audio output (speakers)
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Start the oscillator to play the note
    st = oscillator.start();
    }
    else{
        if(st)
        {
            oscillator.stop();
        }
    }
}

document.addEventListener('keyup',e=>{
    const v = getNoteDetails(e.key.toUpperCase());
    if(!v)
    {
        return;
    }
    // console.log(v);
    document.querySelector(`[note=${v.note}]`).classList.remove('active');
    v.active = false;
    playNote(v);
});

function getNoteDetails(k)
{
    return NOTE_DETAILS.find(n=> k === n.key);
}