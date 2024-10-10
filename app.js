import Food from "./foods.js";

export default class App {
  /* Modificar el DOM / escuchar eventos*/
  constructor() {
    let item = document.getElementById("food-form");
    item.addEventListener("submit", this.#onSubmit);

    item = document.getElementById('food-id');
    item.addEventListener("change",this.#onIdChange);

    item = document.getElementById("send-food");
    item.addEventListener("submit", this.#onSendFood);
  }

  #onIdChange = (ev)=>{
    const item = document.getElementById('food-id');
    const inputValue = ev.currentTarget.value;
    console.log("cambió el valor",inputValue);
    if(inputValue < 0){
        item.className = 'error';
    }else if(inputValue == 0){
        item.className = 'neutral';
    }else{
        item.className = 'ok';
    }    
  }

  #onSubmit = async (ev) => {
    ev.preventDefault();
    const item = document.getElementById('food-id');
    const inputValue = item.value;
    let data;
    if(inputValue < 0){
        data = 'No se pueden traer comidas con id negativo';
    }else if(inputValue == 0){
        // console.log("Vamos a consultar las comidas");
        data = JSON.stringify(await Food.getAll());
    }else{
        data = await Food.getOne(inputValue);
        console.log(data);
        document.querySelector('#food-id2').value = data.id;
        document.querySelector('#food-name2').value = data.name;
        document.querySelector('#food-description2').value = data.description;
        document.querySelector('#food-image2').value = data.image;
        document.querySelector('#food-ingredients2').value = data.ingredients;
        

        data = JSON.stringify(data);
    }
    this.#printResult(data);
  };

  #onSendFood = async (ev) => {
    ev.preventDefault();
    const data = {};
    data.id = document.querySelector('#food-id2').value;
    data.name = document.querySelector('#food-name2').value;
    data.description = document.querySelector('#food-description2').value;
    data.image = document.querySelector('#food-image2').value;
    data.ingredients = document.querySelector('#food-ingredients2').value;
   
    const respData = await Food.saveOne(data);
    console.log(respData);
  }

  #printResult = (data) => {
    console.log(data);
    const result = document.querySelector("#result")
    result.textContent = data;
  };
}