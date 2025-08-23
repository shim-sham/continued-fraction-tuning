const pythag = document.querySelectorAll('[id="pythagorean"]');
const helm = document.getElementById("helmholtz");
const equal = document.getElementById("equal-temp");
const synth = new Tone.Synth().toDestination();

let currentTuning ="pythag"
pythag.forEach(element => {
    element.addEventListener('click',()=>{
        currentTuning="pythag"
        if (!element.classList.contains("on")){
            pythag.forEach(element => { element.classList.add("on")});
            if (helm.classList.contains("on")){
                helm.classList.remove("on");
            }
            if (equal.classList.contains("on")){
                equal.classList.remove("on");
            }
        }
        pythag.forEach(element=>{console.log(element.classList)})
        console.log(helm.classList)
        console.log(equal.classList)
    })
})
helm.addEventListener('click',()=>{
    currentTuning="helm"
    if (!helm.classList.contains("on")){
        helm.classList.add("on");
        //if (pythag.classList.contains("on")){ was getting too complicated
        pythag.forEach(element => { element.classList.remove("on")});

        //}
        if (equal.classList.contains("on")){
            equal.classList.remove("on");
        }
    }
    pythag.forEach(element=>{console.log(element.classList)})
    console.log(helm.classList)
    console.log(equal.classList)
})
equal.addEventListener('click',()=>{
    currentTuning="equal"
    if (!equal.classList.contains("on")){
        equal.classList.add("on");
       //if (pythag.classList.contains("on")){
        pythag.forEach(element => { element.classList.remove("on")});
        //}
        if (helm.classList.contains("on")){
            helm.classList.remove("on");
        }
    }
    pythag.forEach(element=>{console.log(element.classList)})
    console.log(helm.classList)
    console.log(equal.classList)
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
            calculatePythag(interval.fifthsNeeded)
        }
    })
})
const intervalInfo = [
    {
        name:"tonic",
        pythagorean:[1,1],
        fifthsNeeded:0
    },{
        name:"minor second",
        pythagorean: [256,243], //for checking if it's working!
        fifthsNeeded:-5
    },{
        name:"major second",
        pythagorean: [9,8],
        fifthsNeeded:2
    },{
        name:"minor third",
        pythagorean: [32,27],
        fifthsNeeded:-3
    },{
        name:"major third",
        pythagorean: [81,64],
        fifthsNeeded:4
    },{
        name:"perfect fourth",
        pythagorean: [4,3],
        fifthsNeeded:-1
    },{
        name:"augmented fourth",
        pythagorean: [729,512],
        fifthsNeeded:6
    }, {
        name:"perfect fifth",
        pythagorean: [3,2],
        fifthsNeeded:1
    },{
        name:"minor sixth",
        pythagorean: [128,21],
        fifthsNeeded:-4
    }, {
        name:"major sixth",
        pythagorean: [27,16],
        fifthsNeeded:3
    }, {
        name:"minor seventh",
        pythagorean: [16,9],
        fifthsNeeded:-2
    }, {
        name:"major seventh",
        pythagorean: [243,128],
        fifthsNeeded:5
    }, {
        name:"octave",
        pythagorean: [2,1],
        fifthsNeeded:12
    }, 
]

// i dont want to hardcode it - that's boringgg. let's try calculate these
function calculatePythag(fifthsNeeded){
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
        nume = nume*2
    }
    console.log(nume,denom);
    frequency = 261.63*nume/denom
    synth.triggerAttackRelease(frequency, "8n");
    return[nume,denom];
}

function calculateHelm(fifthsNeeded){

}