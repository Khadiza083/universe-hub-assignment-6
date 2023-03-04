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
            <button onclick=loadDetails('${tool.id}') class="btn " data-bs-toggle="modal" data-bs-target="#exampleModal"> <i class="fa-solid fa-arrow-right text-danger"></i></button>
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


// Modal section

const loadDetails = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayLoadDetails(data.data);
}

const displayLoadDetails = (data) =>{
    console.log(data);
    // console.log(data.input_output_examples[0].input)

    // modal left side
    const modalLeftDiv = document.getElementById('modal-left-side')
    const featureDetail = featuresDetails(data.features);
    // console.log(featureDetail)
    modalLeftDiv.innerHTML = `
    <div class="card p-3 h-100 bg-warning-subtle mx-2">
        <div class="">
            <h6 class=""><b>${data.description}</b></h6>
            <div id="pricing" class="d-flex gap-2 row" >
                <div class="bg-light-subtle rounded-4 w-25 col">
                    <div class="py-4 px-1" >
                    <h6 class="text-center text-success">${data.pricing[0].price} ${data.pricing[0].plan}</h6>
                    </div>
                </div>
                <div class="bg-light-subtle rounded-4 w-25 col">
                    <div class="py-4 px-1">
                    <h6 class="text-center text-warning">${data.pricing[1].price} ${data.pricing[1].plan}</h6>

                    </div>
                </div>
                <div class="bg-light-subtle rounded-4 w-26 col">
                    <div class="py-2 px-2">
                    <h6 class="text-center text-danger" >${data.pricing[2].price} ${data.pricing[2].plan}</h6>
                    </div>
                </div>
            <div class="row">
                <div class="col" id="features-details">
                    <h5 class="card-title">Features</h5>
                    <p class="card-text">
                    <ul>
                    ${featureDetail.map(feature => `<li>${feature}</li>`).join("")}
                </ul>
                    </p>
                </div>
                <div class="col">
                    <h5>Integrations</h5>
                    <p class="card-text">
                        <ul>
                            ${data.integrations.map(integration => `<li>${integration}</li>`).join("")}
                        </ul>

                    </p>
                </div>
                   
            </div>


        </div>
    </div>
    `


    // modal right side
    const modalRightDiv = document.getElementById('modal-right-side')
    modalRightDiv.innerHTML = `
    <div class="card  p-4">
    <img src="${data.image_link[0]
    }" class="card-img-top" alt="...">
    <div class="card-body text-center">
      <h5 class="card-title">${data.input_output_examples[0].input? data.input_output_examples[0].input: 'Can you give any example?'}</h5>
      <p class="card-text">${data.input_output_examples[0].output?data.input_output_examples[0].output: 'NO! Not yet! Take a break'}</p>
    </div>
  </div>
    `
}
const featuresDetails = (features) =>{
    let featureArr = []
    for(const key in features){
      
        featureArr[key] = features[key].feature_name;
    }
    return (featureArr);
}
loadDetails()
loadAi(6);