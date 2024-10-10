export default class Food{
    constructor(id, name, description, image, ingredients ){
        this.id = id;
        this.name = name;
        this.description = description;
        this.image= image;
        this.ingredients = ingredients;
    }

 /* Llamados a la API */
    static async getAll(){
        let list = [];
        const resp = await fetch('http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/foods');
        if(resp.status !== 200){
            throw new Error('Hubo error trayendo las comidas');
        }
        const data = (await resp.json());
        // console.log(data);
        data.forEach(element => {
            list.push(new Food(element.id, element.name, element.description, element.image, element.ingredients));
        });
        return list;
    }   

    static async getOne(foodId){
        try {
            const resp = await fetch(`http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/foods/${foodId}`);   
            const data = await resp.json();
            console.log('getOne',data);
            return new Food(data.id, data.name, data.description, data.image, data.ingredients);
        } catch (error) {
            console.log('hubo error al traer una sola comida');
        }
    }

    static async saveOne(data){
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const resp = await fetch('http://ec2-3-138-183-128.us-east-2.compute.amazonaws.com:4010/foods', options);
        console.log(resp);
        console.log('Respuesta de la API: ', data);
        alert('Formulario enviado exitosamente');
        return await resp.json();
    }

}