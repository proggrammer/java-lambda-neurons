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
    console.log(keys);
    var oneDone = false;
    for(var i=0; i<keys.length; i++)    {
        let divContainer = document.createElement("div");
        divContainer.className = "probContainer";

        const probData = data.problems[keys[i]];
        let div = document.createElement("div");
        if(!oneDone) {
            div.className = "problemDef collapsible active";
        }
        else
            div.className = "problemDef collapsible";
        div.appendChild(document.createTextNode(keys[i]+". "+probData.problem))
        divContainer.appendChild(div);
        // divContainer.click()

        let divContent = document.createElement("div");
        divContent.className = "content";

        if(!oneDone) {
            divContent.style.display = "block";
            // divContent.classList.toggle("active");
            oneDone = true;
        }
        else
            divContent.style.display = "none";

        let divCode = document.createElement("div");
        const pElCode = document.createElement("pre")
        pElCode.className="prettyprint";
        const codeElCode = document.createElement("code")
        // codeElCode.className = "language-java";
        codeElCode.appendChild(document.createTextNode(probData.code));
        pElCode.appendChild(codeElCode);
        divCode.className = "code";
        divCode.appendChild(pElCode);
        divContent.appendChild(divCode);

        let divOp = document.createElement("div");
        const pElOp = document.createElement("pre")
        pElOp.className="prettyprint";
        const codeElOp = document.createElement("code")
        codeElOp.appendChild(document.createTextNode(probData.output));
        pElOp.appendChild(codeElOp);
        divOp.className = "output";
        divOp.appendChild(pElOp);
        divContent.appendChild(divOp);

        let divExp = document.createElement("div");
        const pElExp = document.createElement("pre")
        const codeElExp = document.createElement("code")
        codeElExp.appendChild(document.createTextNode(probData.explanation));
        pElExp.appendChild(codeElExp);
        divExp.className = "explanation";
        divExp.appendChild(pElExp);
        divContent.appendChild(divExp);
        divContainer.appendChild(divContent);

        document.getElementById("canvas").appendChild(divContainer);
    }
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
}