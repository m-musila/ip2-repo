function showCharts() {
    var v = document.getElementById("countries").value;
    if(v == "Rwanda") {
        document.getElementById("Rwanda").style.display='block';
        document.getElementById("Kenya").style.display='none';
        document.getElementById("Nigeria").style.display='none';
        document.getElementById("Zimbabwe").style.display='none';
    }
    if(v == "Kenya") {
        document.getElementById("Kenya").style.display='block';
        document.getElementById("Rwanda").style.display='none';
        document.getElementById("Nigeria").style.display='none';
        document.getElementById("Zimbabwe").style.display='none';
    }
    if(v == "Nigeria") {
        document.getElementById("Nigeria").style.display='block';
        document.getElementById("Kenya").style.display='none';
        document.getElementById("Rwanda").style.display='none';
        document.getElementById("Zimbabwe").style.display='none';
    }
    if(v == "Zimbabwe") {
        document.getElementById("Zimbabwe").style.display='block';
        document.getElementById("Kenya").style.display='none';
        document.getElementById("Rwanda").style.display='none';
        document.getElementById("Nigeria").style.display='none';
    }
}