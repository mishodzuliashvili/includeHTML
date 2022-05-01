function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("includeHtml");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("src");

        if (file) {
            elmnt.removeAttribute("src");

            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        var returnTxt = this.responseText;
                        var attrib = elmnt.attributes[0];
                        while (attrib != undefined) {
                            var aa = $(returnTxt).find(attrib.name)
                            for (let index = 0; index < aa.length; index++) {

                                const element = aa[index];
                                var uil = $(element).attr("pointer").split('/');
                                function recSpliterAdder(cmnds, index, res) {
                                    if (cmnds[index] != undefined && cmnds[index] != "") {
                                        return recSpliterAdder(cmnds, index + 1, res[uil[index]]);
                                    } else {
                                        return res;
                                    }
                                }
                                var obj = recSpliterAdder(uil, 0, JSON.parse(attrib.value))
                                returnTxt = returnTxt.replace($(element).prop('outerHTML'), obj);
                            }
                            elmnt.removeAttribute(attrib.name);
                            attrib = elmnt.attributes[0];
                        }
                        elmnt.innerHTML = returnTxt;
                    }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("onclick");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};

function jso(params) {
    return JSON.stringify(params);
}