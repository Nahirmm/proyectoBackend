const mongoose = require('mongoose')
const prodModel = require('../models/mongo').productsMongo


class classMongo {
    constructor(schema) {
        this.schema = schema
    }

    async getAll(){
        try{
            const list = await this.schema.find({})
            return list
        }catch(error){
            console.log("Error getAll " + error)
        }
    }

    async save(data){
        try{
            const saveEntity = await this.schema(data).save()
            return saveEntity
        }catch(error){
            console.log("Error save " + error)
        }
    }

    async getById(id){
        try {
            const getByIdEntity = await this.schema.findById(id)
            return getByIdEntity
        } catch(error){
            console.log("Error in getById " + error)
        }
    }

    async update(data, id){
        try {
            const updateEntity = await this.schema.findByIdAndUpdate(id, data)
            return updateEntity;
        } catch(error){
            console.log("Error in update " + error)
        }
    }
    
    async delete(id){
        try {
            const deleteEntity = await this.schema.findByIdAndDelete(id)
            return deleteEntity
        }catch (error) {
            console.log("Error in delete " + error)
        }
    }
}

module.exports = classMongo