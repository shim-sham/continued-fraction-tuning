const pythag = document.querySelectorAll('[id="pythagorean"]');
const helm = document.querySelectorAll('[id="helmholtz"]');
const equal = document.querySelectorAll('[id="equal-temp"]');
const synth = new Tone.Synth().toDestination();
const freqIndicator = document.getElementById("freq-ind")
let currentTuning ="pythag"

pythag.forEach(element => {
    element.addEventListener('click',()=>{
        currentTuning="pythag"
        if (!element.classList.contains("on")){
            pythag.forEach(element => { element.classList.add("on")});
            helm.forEach(element => { element.classList.remove("on")});
            equal.forEach(element => { element.classList.remove("on")});

        }
        pythag.forEach(element=>{console.log(element.classList)})
        helm.forEach(element=>{console.log(element.classList)})
        equal.forEach(element=>{console.log(element.classList)})
    })
})
helm.forEach(element => {
    element.addEventListener('click',()=>{
        currentTuning="helm"
        if (!element.classList.contains("on")){
            helm.forEach(element => { element.classList.add("on")});

            //if (pythag.classList.contains("on")){ was getting too complicated
            pythag.forEach(element => { element.classList.remove("on")});

            //}
            equal.forEach(element => { element.classList.remove("on")});
        
        }
        pythag.forEach(element=>{console.log(element.classList)})
        helm.forEach(element=>{console.log(element.classList)})
        equal.forEach(element=>{console.log(element.classList)})
    })
})
equal.forEach(element => {
    element.addEventListener('click',()=>{
        currentTuning="equal"
        if (!element.classList.contains("on")){
            equal.forEach(element => { element.classList.add("on")});
        //if (pythag.classList.contains("on")){
            pythag.forEach(element => { element.classList.remove("on")});
            //}
            //if (helm.classList.contains("on")){
            helm.forEach(element => { element.classList.remove("on")});
            //}
        }
        pythag.forEach(element=>{console.log(element.classList)})
        helm.forEach(element=>{console.log(element.classList)})
        equal.forEach(element=>{console.log(element.classList)})
    })
})
const map = {
    'ton': 'tonic',
    'mi2': 'minor second',
    'ma2': 'major second',
    'mi3': 'minor third',
    'ma3': 'major third',
    'p4': 'perfect fourth',
    'au4': 'augmented fourth',
    'p5': 'perfect fifth',
    'mi6': 'minor sixth',
    'ma6': 'major sixth',
    'mi7': 'minor seventh',
    'ma7': 'major seventh',
    'oct': 'octave'
};
Object.entries(map).forEach(([buttonId, intName]) => {
    const button = document.getElementById(buttonId);        
    button.addEventListener('click', () => {
        interval = intervalInfo.find(x => x.name === intName)
        if (currentTuning=="pythag"){
            freqIndicator.innerText = "frequency last played (1 d.p.): "+ calcPythag(interval.fifthsNeeded)
        }else if (currentTuning=="helm"){
            freqIndicator.innerText = "frequency last played (1 d.p.): "+ soundHelm(interval)
        }else if (currentTuning="equal"){
            freqIndicator.innerText = "frequency last played (1 d.p.): "+ calcEqual(interval)
        }
    })
})
const intervalInfo = [
    {
        name:"tonic",
        pythagorean:[1,1],
        helmholtz:[1,1],
        fifthsNeeded:0
    },{
        name:"minor second",
        pythagorean: [256,243], //for checking if it's working!
        helmholtz:[16,15],
        fifthsNeeded:-5
    },{
        name:"major second",
        pythagorean: [9,8], 
        helmholtz: [9,8],// p5 + p5, same as pythag
        fifthsNeeded:2
    },{
        name:"minor third",
        pythagorean: [32,27],
        helmholtz:[6,5],
        fifthsNeeded:-3
    },{
        name:"major third",
        pythagorean: [81,64],
        helmholtz:[5,4],
        fifthsNeeded:4
    },{
        name:"perfect fourth",
        pythagorean: [4,3],
        helmholtz:[4,3],
        fifthsNeeded:-1
    },{
        name:"augmented fourth",
        pythagorean: [729,512],
        helmholtz:[45,32],
        fifthsNeeded:6
    }, {
        name:"perfect fifth",
        pythagorean: [3,2],
        helmholtz:[3,2],
        fifthsNeeded:1
    },{
        name:"minor sixth",
        pythagorean: [128,21],
        helmholtz:[8,5], //perf4 + mi3 = 4:3 * 6:5= 24:15
        fifthsNeeded:-4
    }, {
        name:"major sixth",
        pythagorean: [27,16],
        helmholtz:[5,3], //same as mi6 but w ma3 instead of mi3
        fifthsNeeded:3
    }, {
        name:"minor seventh",
        pythagorean: [16,9], // perf5 + mi3 = 3/2 * 6/5
        helmholtz: [9,5],
        fifthsNeeded:-2
    }, {
        name:"major seventh",
        pythagorean: [243,128],
        helmholtz:[15,8],
        fifthsNeeded:5
    }, {
        name:"octave",
        pythagorean: [2,1],
        helmholtz:[2,1],
        fifthsNeeded:12
    }, 
]

// i dont want to hardcode it - that's boringgg. let's try calculate these
function calcPythag(fifthsNeeded){
    let nume,denom
    if (fifthsNeeded>=0){
        nume = Math.pow(3,fifthsNeeded);
        denom = Math.pow(2,fifthsNeeded);  
    }else{
        denom = Math.pow(3,Math.abs(fifthsNeeded));
        nume = Math.pow(2,Math.abs(fifthsNeeded));  
    }
    let tempRatio =  nume/denom;
    while (tempRatio >= 2) {
        tempRatio /= 2;
        denom = denom*2
    }
    while(tempRatio<1){
        tempRatio*=2;
        nume = nume*2;
    }
    console.log(nume,denom);
    frequency = 261.63*nume/denom;
    synth.triggerAttackRelease(frequency, "8n");
    return frequency.toFixed(1);
}

function soundHelm(interval){
    let nume,denom;
    [nume,denom] = interval.helmholtz;
    frequency = 261.63*nume/denom;
    synth.triggerAttackRelease(frequency, "8n");
    return frequency.toFixed(1);
}

function calcEqual(interval){
    n = intervalInfo.indexOf(interval)
    frequency = 261.63 * Math.pow(2, n/12)
    synth.triggerAttackRelease(frequency,"8n")
    return frequency.toFixed(1);
}
document.getElementById("next").addEventListener('click',()=>{
    window.scrollTo({
        top:window.innerHeight,
        behavior:'smooth'
    })
})
document.getElementById("next2").addEventListener('click',()=>{
    window.scrollTo({
        top:2*window.innerHeight,
        behavior:'smooth'
    })
})