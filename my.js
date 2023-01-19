// window.onload = PR.prettyPrint();
fetch('input.json')
    .then((response) => response.json())
    .then(data => {
        tableCreate(data);
        PR.prettyPrint();
        window.allCollapsed = true;
    });
function tableCreate(data) {
    // window.input = data;
    const keys = Object.keys(data.problems);
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

        if(probData.code.length != 0) {
            let divCode = document.createElement("div");
            const pElCode = document.createElement("pre")
            pElCode.className = "prettyprint";
            const codeElCode = document.createElement("code")
            // codeElCode.className = "language-java";
            codeElCode.appendChild(document.createTextNode(probData.code[0]));
            pElCode.appendChild(codeElCode);
            divCode.className = "code";
            divCode.appendChild(pElCode);
            divContent.appendChild(divCode);
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
            //divExp.appendChild(pElExp);
            divContent.appendChild(divExp);
        }
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
function toggleAll(){
    window.allCollapsed = !window.allCollapsed;
    var coll = document.getElementsByClassName("collapsible");
    var topEl = document.getElementsByClassName("topPanel");
    if(window.allCollapsed) {
        topEl[0].classList.remove("activ");
        for(var i=0; i<coll.length;i++) {
            coll[i].classList.remove("active");
            var content = coll[i].nextElementSibling;
            content.style.display = "none";
        }
    }
    else{
        topEl[0].classList.add("activ");
        for(var i=0; i<coll.length;i++) {
            coll[i].classList.add("active");
            var content = coll[i].nextElementSibling;
            content.style.display = "block";
        }
    }
}