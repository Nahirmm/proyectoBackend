const admin = require("firebase-admin");
const serviceAccount = require("../../db/configFB/proyectofinalbackend-cd384-firebase-adminsdk-btk44-f774f52f00.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://proyectofinalbackend-cd384.firebaseio.com"
});

console.log("Conectado a Firebase")

const db = admin.firestore()

class classFirebase {
    constructor(coleccion) {
        this.coleccion = coleccion
        this.entity = []
        this.id = 1
    }

    async getAll(){
        try{
            const list = await db.collection(this.coleccion).get()
            return list
        }catch(error){
            console.log("Error getAll " + error)
        }
    }

    async save(data){
        try{
            const loadedEntity = await db.collection(this.coleccion).add(data)
            return loadedEntity
   
        }catch(error){
            console.log("Error save " + error)
        }
    }

    async getById(id){
        try {
            const loadedEntityById = await db.collection(this.coleccion).doc(id).get()
            return loadedEntityById
        } catch(error){
            console.log("Error in getById " + error)
        }
    }

    async update(data, id){
        try {
            const updateEntity = await db.collection(this.coleccion).doc(id).update(data)
            return updateEntity
        } catch(error){
            console.log("Error in update " + error)
        }
    }
    
    async delete(id){
        try {
            const deleteEntity = await db.collection(this.coleccion).doc(id).delete()
            return deleteEntity
        }catch (error) {
            console.log("Error in delete " + error)
        }
    }
}

module.exports = classFirebase