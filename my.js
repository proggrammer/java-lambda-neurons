fetch('input.json')
    .then((response) => response.json())
    .then(data => {
        tableCreate(data);
        PR.prettyPrint();
        window.allCollapsed = true;
    });
function tableCreate(data) {
    let i;
    const keys = Object.keys(data.problems);
    let oneDone = false;
    for(i = 0; i<keys.length; i++)    {
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

        let divContent = document.createElement("div");
        divContent.className = "content";

        if(!oneDone) {
            divContent.style.display = "block";
            oneDone = true;
        }
        else
            divContent.style.display = "none";

        if(probData.code.length != 0) {
            let divCode = document.createElement("div");
            const pElCode = document.createElement("pre")
            pElCode.className = "prettyprint";
            const codeElCode = document.createElement("code")
            codeElCode.appendChild(document.createTextNode(probData.code[0]));
            pElCode.appendChild(codeElCode);
            divCode.className = "code";
            divCode.appendChild(pElCode);

            let divCodeCode = document.createElement("div");
            divCodeCode.className = "titlecode";
            divCodeCode.appendChild(document.createTextNode("Code"))

            let divContentCode = document.createElement("div");
            divContentCode.className = "contentcode";

            divContentCode.appendChild(divCodeCode);
            divContentCode.appendChild(divCode);
            divContent.appendChild(divContentCode)
        }
        if(probData.output.length != 0) {
            let divOp = document.createElement("div");
            const pElOp = document.createElement("pre")
            pElOp.className = "prettyprint";
            const codeElOp = document.createElement("code")
            codeElOp.appendChild(document.createTextNode(probData.output[0]));
            pElOp.appendChild(codeElOp);
            divOp.className = "output";
            divOp.appendChild(pElOp);

            let divCodeCode = document.createElement("div");
            divCodeCode.className = "titlecode";
            divCodeCode.appendChild(document.createTextNode("Output"))
            divContent.appendChild(divCodeCode);

            divContent.appendChild(divOp);
        }

        let divExp = document.createElement("div");
        if(probData.explanation[0] != undefined && probData.explanation[0].trim() != "" ) {
            let ul = document.createElement("ul");
            let lines = probData.explanation[0].split("\n");
            lines.forEach(line => {
                let li = document.createElement("li");
                if(line.includes("https://")) {
                    let a = document.createElement("a");
                    a.innerHTML = "<a href="+line+">"+line+"</a>";
                    li.appendChild(a);
                }
                else
                    li.appendChild(document.createTextNode(line));
                ul.appendChild(li);
            })

            divExp.appendChild(ul);
            divExp.className = "explanation";
            divContent.appendChild(divExp);
        }
        divContainer.appendChild(divContent);

        document.getElementById("canvas").appendChild(divContainer);
    }
    const coll = document.getElementsByClassName("collapsible");

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            const content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
}
function toggleAll(){
    let content;
    let i;
    window.allCollapsed = !window.allCollapsed;
    const coll = document.getElementsByClassName("collapsible");
    const topEl = document.getElementsByClassName("topPanel");
    if(window.allCollapsed) {
        topEl[0].classList.remove("activ");
        for(i = 0; i<coll.length; i++) {
            coll[i].classList.remove("active");
            content = coll[i].nextElementSibling;
            content.style.display = "none";
        }
    }
    else{
        topEl[0].classList.add("activ");
        for(i = 0; i<coll.length; i++) {
            coll[i].classList.add("active");
            content = coll[i].nextElementSibling;
            content.style.display = "block";
        }
    }
}