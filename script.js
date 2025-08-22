const pythag = document.getElementById("pythagorean");
const inton = document.getElementById("just-intonation");
pythag.addEventListener('click',()=>{
    if (!pythag.classList.contains("on")){
        pythag.classList.add("on");
        inton.classList.remove("on");
    }
})
inton.addEventListener('click',()=>{
    if (!inton.classList.contains("on")){
        inton.classList.add("on");
        pythag.classList.remove("on");
    }
})
const map = {
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
        calculatePythagRatio(interval.fifthsNeeded)
    })
})
const intervalInfo = [
    {
        name:"minor second",
        pythagorean: [256,243],
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
        fifthsNeeded:0
    }, 
]

// i dont want to hardcode it - that's boringgg. let's try calculate these
function calculatePythagRatio(fifthsNeeded){
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
    return[nume,denom];
}
