function includeHTML() {
  var elmnt, file, xhttp;
  elmnt = document.getElementById("csstutor");
  file = elmnt.getAttribute("data-href");

  const height = elmnt.getAttribute("data-height") || 400;

  const isLocalhost = window.location.hostname.indexOf("localhost") > -1;
  const protocol = isLocalhost ? "http" : "https";
  const path = isLocalhost ? "" : "learn";
  
  file = protocol + "://" + window.location.hostname + "/" + path + "?t=" + file;

  if (file) {
    /*make an HTTP request using the attribute value as the file name:*/
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          const iframe = document.createElement("iframe");
          iframe.src = file;
          iframe.style.width = "100%";
          iframe.style.border = "none";
          iframe.style.height = height + "px";

          elmnt.appendChild(iframe);
        }
        if (this.status == 404) {
          elmnt.innerHTML = "Page not found.";
        }
        /*remove the attribute, and call this function once more:*/
        elmnt.removeAttribute("w3-include-html");
      }
    };
    xhttp.open("GET", file, true);
    xhttp.send();
    /*exit the function:*/
    return;
  }
  //}
}
includeHTML();
