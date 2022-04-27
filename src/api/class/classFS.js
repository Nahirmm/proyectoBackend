const fs = require('fs').promises

class classFS {
    constructor(route) {
        this.route = route
        this.entity = []
        this.id = 1
    }

    async getAll(){
        try{
            const list = await fs.readFile(this.route)
            if(list.toString() != ''){
                this.entity = JSON.parse(list)
                if(this.entity.length > 0){
                    this.id = parseInt(this.entity[this.entity.length -1].id) +1
                }else {
                    this.id = 1
                }
            }
            return this.entity
        }catch(error){
            if( error.code == "ENOENT"){
                 fs.writeFile(this.route,'')
                 return []
            }
            console.log("Error getAll " + error)
        }
    }

    async save(data){
        try{
            const loadedEntity = await this.getAll()
            loadedEntity.push(data)
            await fs.writeFile(this.route, JSON.stringify(loadedEntity ,null, 2))
                
        }catch(error){
            console.log("Error save " + error)
        }
    }

    async getById(id){
        try {
            const loadedEntity = await this.getAll()
            return loadedEntity.find(prod => prod.id == parseInt(id))
        } catch(error){
            console.log("Error in getById " + error)
        }
    }

    async update(data, id){
        try {
            const loadedEntity = await this.getAll()
            const updateI = loadedEntity.findIndex((prod) => prod.id === parseInt(id))
            const updateEntity = data
            loadedEntity[updateI] = updateEntity
            await fs.writeFile(this.route, JSON.stringify(loadedEntity ,null, 2))
            return updateEntity;
        } catch(error){
            console.log("Error in update " + error)
        }
    }
    
    async delete(id){
        try {
            const loadedEntity = await this.getAll()
            const deleteI = loadedEntity.findIndex((prod) => prod.id === parseInt(id))
            if (deleteI != -1){
                const deleteData = loadedEntity.splice(deleteI,1)
                await fs.writeFile(this.route, JSON.stringify(loadedEntity ,null, 2))
                return deleteData
            }
        }catch (error) {
            console.log("Error in delete " + error)
        }
    }
}

module.exports = classFS