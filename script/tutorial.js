var jaTeveTutorial = localStorage.getItem("jaTeveTutorial");

if(jaTeveTutorial == "true"){
    document.querySelector("#tutorial").classList.add("hidden");
    
}
else if(jaTeveTutorial == null){
    localStorage.setItem("jaTeveTutorial", true);
}

document.querySelector("#pular").addEventListener("click", ()=>{
    document.querySelector("#tutorial").classList.add("hidden");
})

document.querySelector("#ajuda").addEventListener("click", ()=>{
    document.querySelector("#tutorial").classList.remove("hidden");
})

document.querySelector("#iniciarTutorial").addEventListener("click", ()=>{
    document.querySelector("#tutorial").classList.add("hidden");
    document.querySelector("#primeiro").classList.remove("hidden");
})

document.querySelector("#proximo1").addEventListener("click", ()=>{
    document.querySelector("#primeiro").classList.add("hidden");
    document.querySelector("#segundo").classList.remove("hidden");
})

document.querySelector("#proximo2").addEventListener("click", ()=>{
    document.querySelector("#segundo").classList.add("hidden");
    document.querySelector("#terceiro").classList.remove("hidden");
})
document.querySelector("#finalizar").addEventListener("click", ()=>{
    document.querySelector("#terceiro").classList.add("hidden");
})