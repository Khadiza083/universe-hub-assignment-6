const loadAi = async (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json()
    displayAI(data.data.tools, dataLimit);
}

// loader
const toggleSpinner = (isLoading) => {
    const loader = document.getElementById('loader')
    if (isLoading) {
        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none');
    }
}
// function for display AI tools 
const displayAI = (tools, dataLimit) => {
    console.log(tools);
    const toolsSection = document.getElementById('tools-section');
    toolsSection.textContent = ''
    // tool slice
    const showAll = document.getElementById('show-all');

    if (dataLimit && tools.length > 6) {
        tools = tools.slice(0, 6)
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }

    tools.forEach(tool => {
        const divTool = document.createElement('div')
        divTool.classList.add('col')
        divTool.innerHTML = `
            <div class="card h-100 p-4">
            <img src="${tool.image}" class="card-img-top" alt="...">
            <div class="card-body px-0">
            <h5 class="card-title">Features</h5>
            <p class="card-text">
            <ol class="features-list">
                ${tool.features.map(feature => `<li>${feature}</li>`).join("")}
            </ol>
                
            </p>
            </div>
            <div class="card-footer ">
            <h5>${tool.name}</h5>
            <div class="d-flex justify-content-between">
            <div>
            <i class="fa-solid fa-calendar-days"></i> <span>${tool.published_in
            }</span>
            </div>

            <div class="bg-body-secondary rounded-circle">
            <button class="btn " data-bs-toggle="modal" data-bs-target="#exampleModal"> <i class="fa-solid fa-arrow-right text-danger"></i></button>
            </div>

            
            </div>
            </div>
            </div>
        `
        toolsSection.appendChild(divTool)
        toggleSpinner(false)
    })


    // display rest tools
    const restTools = () => {
        toggleSpinner(true);
        loadAi();
    }

    document.getElementById('btn-show-all').addEventListener('click', function () {
        restTools();

    })
}
loadAi(6);