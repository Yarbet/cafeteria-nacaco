const request = require("supertest");
const server = require("../index");
const app = require('../index')

describe("Operaciones CRUD de cafes", () => {
    it("Obteniendo un 200", async () => {
        //Testea que la ruta GET /cafes 
        const response = await request(server).get("/cafes").send();
        //devuelve un status code 200
        const status = response.statusCode;
        expect(status).toBe(200);
        //con por lo menos 1 objeto.
        expect(response.body.length).toBeGreaterThan(0);
        //el tipo de dato recibido es un arreglo 
        expect(response.body[0]).toBeInstanceOf(Object)
        });

       //al intentar eliminar un café con un id que no existe
        it("Devolver 404 al intentar eliminar un café con un id que no existe", async () => {
            const jwt = "token";  // Simulación de un token
            const idCafeInexistente = 5; //id que no existe

            const response = await request(server)
            .delete(`/cafes/${idCafeInexistente}`)
            .set("Authorization", jwt)
            .send();
                     
            // se obtiene un código 404
            expect(response.status).toBe(404);
        });
   
        

});


//Prueba que la ruta POST /cafes a
describe("POST/cafes", () => {

    it("Agregar un nuevo café y devolver un código 201", async () => {
        // Definir los datos del nuevo café
        const nuevoCafe = {
            id: 6,  
            nombre: "Café Expreso"
        };

        // Solicitud POST
        const response = await request(app)
            .post("/cafes")
            .send(nuevoCafe); 

        // Verifica que se reciba el código de estado 201
        expect(response.statusCode).toBe(201);

        expect(response.body).toBeInstanceOf(Array);  
        expect(response.body).toContainEqual(nuevoCafe);  // El café nuevo esté en la respuesta
    });
});
    
//Ruta PUT /cafes
describe("PUT /cafes", () => {
    it("debe devolver un código 400 si el id en los parámetros es diferente al id en el payload", async () => {
        const idCafe = 1; // Id del café para actualizar
        const cafeActualizado = {
            id: 2, // id diferente 
            nombre: "Café Americano"
        };
//send id de cafe con un id diferente 
        const response = await request(app)
            .put(`/cafes/${idCafe}`)
            .send(cafeActualizado);

        // Verifica que el código de estado sea 400
        expect(response.statusCode).toBe(400);
        
    });
});
