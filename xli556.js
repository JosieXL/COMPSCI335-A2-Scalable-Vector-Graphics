const showJsonInfo = (data) => {
    let ourData = document.getElementById("jsonDiv");
    let content = JSON.stringify(data,undefined, 4);
    ourData.innerHTML = content;
}

const showGraph = (data) => {
    let ourGraph = document.getElementById("graphDiv");
    let svgContent = "";
    let distance = 45;
    let cxInitValue = 20;
    let nodeArr = [];
    
    for (let i=0; i<data.length; i++){
        svgContent += "" + "<circle cx=" + cxInitValue + " cy=50"+ " r=15" + "></circle>" + "<text x=" + (cxInitValue - 5) + " y=55" + " fill=white>" + i + "</text>";
        nodeArr.push(cxInitValue);
        cxInitValue = cxInitValue + distance;
    }
    
    
    let num = 1;
    let heightY = 75;
    for (let j=0; j<data.length; j++) {
        for (let k=0; k<data[j].length; k++) {
            if (j > k) { 
                if ((data[j][k] == 1) && (data[k][j] == 1)){
                        svgContent += "<path d='M " + Number(nodeArr[j]) + " 65" + " S " + 0.5*(Number(nodeArr[k]) + Number(nodeArr[j])) + " " + heightY  + " " + Number(nodeArr[k]) + " 65" + "' stroke=black stroke-width=2 fill=none stroke-linecap=round fill-rule=evenodd>" + "</path>";
                        heightY += num*10;
                        num += 1;
                }
            }
        }
    }
    
    ourGraph.innerHTML = svgContent;
    
}

const getNewsInfo = () => {
    const fetchPromise = fetch('http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/g', {
        headers: {
            "Accept": "application/json",
        },
    });
    
    const streamPromise = fetchPromise.then((response) => response.json());
    streamPromise.then( (data) => {
        showJsonInfo(data);
        showGraph(data); });
}

getNewsInfo();
