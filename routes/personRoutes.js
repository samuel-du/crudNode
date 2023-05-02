const router = require("express").Router()

const Person = require('../models/Person')

router.post('/', async (req, res)=> {
    const {name, salary, approved} = req.body
   
    if(!name){
        res.status(422).json({error:"Nome é obrigatório"})
    }

    if(!salary){
        res.status(422).json({error:"Salário é obrigatório"})
    }

    if(!approved){
        res.status(422).json({error:"Aprovação é obrigatória"})
    }

    const person = {
        name,
        salary,
        approved
    }

    console.log(person)

try {
    await Person.create(person)
    res.status(201).json({message: "Pessoa inserida com sucesso."})
} catch(error){
    res.status(500).json({error:error})
}
})

router.get("/", async(req,res)=> {
    try {
        const People = await Person.find()
        res.status(201).json({People})
    }
    catch(error) {
        res.status(500).json({error:error})
    }
})

router.get("/:id", async(req,res)=> {

    const id = req.params.id

    try {
        const People = await Person.findOne({_id:id})
        if(!People){
            res.status(500).json({error:'Usuário não encontrado'})
            return
        }
        res.status(201).json({People})
    }
    catch(error) {
        res.status(500).json({error:error})
    }
})

router.patch("/:id", async(req,res)=> {

    const id = req.params.id

    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved
    }

    try {       
        const updatedPerson = await Person.updateOne({_id:id},person)
        if(updatedPerson.matchedCount===0){
            res.status(500).json({error:'Usuário não atualizado'})
            return
        }

        res.status(201).json({person})
    }
    catch(error) {
        res.status(500).json({error:error})
    }
})

router.delete("/:id", async(req,res)=> {

    const id = req.params.id

    try {       
        await Person.deleteOne({_id:id})

        res.status(201).json({message:'Usuário removido com sucesso'})
    }
    catch(error) {
        res.status(500).json({error:error})
    }
})



module.exports = router