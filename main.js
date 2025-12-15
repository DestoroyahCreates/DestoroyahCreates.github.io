const selectElement = document.getElementById('stream');
let stream = "MBPC";
let selectedValue = "both";
const phy = [];
const chem = [];
const math = [];
const bio = [];
const eng = [];
const cs = [];
const ai = [];
const button = document.getElementById("calculateBtn");
const checkbox = document.getElementById('pt3Check');
const pred = document.getElementById('prediction');
toAchieve = 33.3;
selectElement.addEventListener('change', (event) => {
    selectedValue = event.target.value;
    if (selectedValue === "bio") {
        document.getElementById("math").style.visibility = "hidden";
        document.getElementById("bio").style.visibility = "visible";
        document.getElementById("ip").style.visibility = "visible";
        stream = "BPC";
    } else if (selectedValue === "math") {
        document.getElementById("math").style.visibility = "visible";
        document.getElementById("bio").style.visibility = "hidden";
        document.getElementById("ip").style.visibility = "visible";
        stream = "MPC";
    } else if (selectedValue === "both") {
        document.getElementById("math").style.visibility = "visible";
        document.getElementById("bio").style.visibility = "visible";
        document.getElementById("ip").style.visibility = "hidden";
        stream = "MBPC";
    }
});

button.addEventListener("click", function() {
    console.log("Button clicked!");
    toAchieve = document.getElementById("requiredPerc").value;

    // Clear arrays so repeated clicks don't accumulate values
    phy.length = chem.length = math.length = bio.length = eng.length = cs.length = ai.length = 0;

    const v = id => Number(document.getElementById(id).value) || 0;

    phy.push(Math.round(v("phy1") / 35 * 10));
    phy.push(Math.round(v("phy2") / 70 * 30));
    phy.push(Math.round(v("phy3") / 35 * 10));

    chem.push(Math.round(v("che1") / 35 * 10));
    chem.push(Math.round(v("che2") / 70 * 30));
    chem.push(Math.round(v("che3") / 35 * 10));

    math.push(Math.round(v("mat1") / 40 * 10));
    math.push(Math.round(v("mat2") / 80 * 30));
    math.push(Math.round(v("mat3") / 40 * 10));

    bio.push(Math.round(v("bio1") / 35 * 10));
    bio.push(Math.round(v("bio2") / 70 * 30));
    bio.push(Math.round(v("bio3") / 35 * 10));

    eng.push(Math.round(v("eng1") / 40 * 10));
    eng.push(Math.round(v("eng2") / 80 * 30));
    eng.push(Math.round(v("eng3") / 40 * 10));

    cs.push(Math.round(v("c1") / 35 * 10));
    cs.push(Math.round(v("c2") / 70 * 30));
    cs.push(Math.round(v("c3") / 35 * 10));

    ai.push(Math.round(v("a1") / 40 * 10));
    ai.push(Math.round(v("a2") / 50 * 30));
    ai.push(Math.round(v("a3") / 40 * 10));

    const wPhy = phy.reduce((s, n) => s + n, 0);
    const wChem = chem.reduce((s, n) => s + n, 0);
    const wMath = math.reduce((s, n) => s + n, 0);
    const wBio = bio.reduce((s, n) => s + n, 0);
    const wEng = eng.reduce((s, n) => s + n, 0);
    const wCs = cs.reduce((s, n) => s + n, 0);
    const wAi = ai.reduce((s, n) => s + n, 0);

    let totalWeightage = 0;
    if (stream === "MPC") {
        totalWeightage = wPhy + wChem + wMath + wEng + wCs + wAi;
    } else if (stream === "BPC") {
        totalWeightage = wPhy + wChem + wBio + wEng + wCs + wAi;
    } else if (stream === "MBPC") {
        totalWeightage = wPhy + wChem + wMath + wBio + wEng + wAi;
    }
    currentWeightage = Number((totalWeightage / 600 * 100).toFixed(2));
    
    document.getElementById("result2").innerText = "Your Weightage is: " + currentWeightage + "%";
    console.log(currentWeightage)
    console.log(checkbox.checked)
    if (checkbox.checked) {
        document.getElementById("result1").innerText = "Your Percentage so far is: " + (totalWeightage / 300 * 100).toFixed(2) + "%";
        if (currentWeightage + 50 < toAchieve) {
            console.log(currentWeightage)
            console.log(currentWeightage+50)
            pred.innerText = "You cannot achieve the required percentage even if you score full marks in finals.";
                document.getElementById("phyPred").innerText = "-";
                document.getElementById("chePred").innerText = "-";
                document.getElementById("matPred").innerText = "-";
                document.getElementById("engPred").innerText = "-";
                document.getElementById("bioPred").innerText = "-";
                document.getElementById("ipPred").innerText = "-";
                document.getElementById("aiPred").innerText = "-";
        } else {
            console.log(toAchieve, currentWeightage);
            const needed = Math.ceil(toAchieve - currentWeightage);
            console.log(needed);
            perSub=needed;
            pred.innerText = "Required marks in finals:";
            if (stream==="MBPC"){
                
                document.getElementById("phyPred").innerText = perSub*70/50;
                document.getElementById("chePred").innerText = perSub*70/50;
                document.getElementById("matPred").innerText = perSub*80/50;
                document.getElementById("engPred").innerText = perSub*80/50;
                document.getElementById("bioPred").innerText = perSub*70/50;
                document.getElementById("ipPred").innerText = "-";
                document.getElementById("aiPred").innerText = perSub;
            } else if (stream==="MPC"){
                document.getElementById("phyPred").innerText = perSub*70/50;
                document.getElementById("chePred").innerText = perSub*70/50;
                document.getElementById("matPred").innerText = perSub*80/50;
                document.getElementById("engPred").innerText = perSub*80/50;
                document.getElementById("bioPred").innerText = "-";
                document.getElementById("ipPred").innerText = perSub*70/50;
                document.getElementById("aiPred").innerText = perSub;
            } else if (stream==="BPC"){
                document.getElementById("phyPred").innerText = perSub*70/50;
                document.getElementById("chePred").innerText = perSub*70/50;
                document.getElementById("bioPred").innerText = perSub*70/50;
                document.getElementById("ipPred").innerText = perSub*70/50;
                document.getElementById("engPred").innerText = perSub*80/50;
                document.getElementById("matPred").innerText = "-";
                document.getElementById("aiPred").innerText = perSub;
            }
        }

    } else {
        document.getElementById("result1").innerText = "Your Percentage so far is: " + (totalWeightage / 240 * 100).toFixed(2) + "%";
    }



});
