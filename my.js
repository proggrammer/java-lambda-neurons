// window.onload = PR.prettyPrint();
fetch('input.json')
    .then((response) => response.json())
    .then(data => {
        tableCreate(data);
        PR.prettyPrint();
    });
function tableCreate(data) {
    // window.input = data;
    const keys = Object.keys(data.problems);
    for(var i=0; i<keys.length; i++)    {
        let divContainer = document.createElement("div");
        divContainer.className = "probContainer";

        const probData = data.problems[keys[i]];
        let div = document.createElement("div");
        div.className = "problemDef";
        div.appendChild(document.createTextNode(keys[i]+". "+probData.problem))
        divContainer.appendChild(div);
        // divContainer.click()

        let divCode = document.createElement("div");
        const pElCode = document.createElement("pre")
        pElCode.className="prettyprint";
        const codeElCode = document.createElement("code")
        // codeElCode.className = "language-java";
        codeElCode.appendChild(document.createTextNode(probData.code));
        pElCode.appendChild(codeElCode);
        divCode.className = "code";
        divCode.appendChild(pElCode);
        divContainer.appendChild(divCode);


        // let divCodeFull = document.createElement("div");
        // const pElCodeFull = document.createElement("pre")
        // pElCodeFull.className="prettyprint";
        // const codeElCodeFull = document.createElement("code")
        // codeElCodeFull.appendChild(document.createTextNode(probData.fullCode));
        // pElCodeFull.appendChild(codeElCodeFull);
        // divCodeFull.className = "fullCode";
        // divCodeFull.appendChild(pElCodeFull);
        // divContainer.appendChild(divCodeFull);

        let divOp = document.createElement("div");
        const pElOp = document.createElement("pre")
        pElOp.className="prettyprint";
        const codeElOp = document.createElement("code")
        codeElOp.appendChild(document.createTextNode(probData.output));
        pElOp.appendChild(codeElOp);
        divOp.className = "output";
        divOp.appendChild(pElOp);
        divContainer.appendChild(divOp);

        let divExp = document.createElement("div");
        const pElExp = document.createElement("pre")
        const codeElExp = document.createElement("code")
        codeElExp.appendChild(document.createTextNode(probData.explanation));
        pElExp.appendChild(codeElExp);
        divExp.className = "explanation";
        divExp.appendChild(pElExp);
        divContainer.appendChild(divExp);

        document.getElementById("canvas").appendChild(divContainer);
    }
}