const bcrypt = require('bcrypt-nodejs')

module.exports = app =>{

    const {existsOrError, notExistsOrError,equalsOrError} = app.api.validation

    const encryptPassword = password =>{
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req,res) =>{
        const user = {...req.body}
        if(req.params.id) user.id = req.params.id

        if(!req.originalUrl.startsWith('/users')) user.admin = false
        if(!req.user || !req.user.admin) user.admin = false

        try{

            existsOrError(user.name,'Nome não informado')
            existsOrError(user.email,'E-mail não informado')
            existsOrError(user.password,'Senha não informada')
            existsOrError(user.confirmPassword,'Confirmação de senha inválida')
            equalsOrError(user.password,user.confirmPassword,'Senhas não conferem')

            const userFromDB = await app.db('users').where({ email: user.email}).first()
            if(!user.id){
                notExistsOrError(userFromDB,'Usuário já cadastrado')
            }

        }catch(msg){
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if(user.id){
            app.db('users')
                .update(user)
                .whereNull('deletedAt')
                .where({id:user.id})
                .then(_ =>res.status(204).send())
                .catch(err => res.status(500).send(err))
        }else{
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
        
    }

    let limit = 5
    const get = async (req,res) =>{
        const hasPage = !!req.query.page
        const page = hasPage ? req.query.page : 1

        const result = await app.db('users')
                                .count('id')
                                .whereNull('deletedAt')
                                .first()

        const count = parseInt(result.count)

        if(!hasPage){
            limit = count
        }else{
            limit = 5
        }

        app.db('users')
            .select('id','name','email','admin')
            .whereNull('deletedAt')
            .limit(limit).offset(page * limit - limit)
            .then(users => res.json({data: users, count, limit}))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req,res) =>{
        try{
            const articles = await app.db('articles')
                .where({userId: req.params.id})
            notExistsOrError(articles, "O usuário possui artigos.")

            const rowsUpdated = await app.db('users')
                .update({deletedAt: new Date()})
                .where({id:req.params.id})
            existsOrError(rowsUpdated, "Usuário não encontrado.")

            res.status(204).send()
        }catch(msg){
            res.status(400).send(msg)
        }
    }

    const getById = (req,res) =>{
        app.db('users')
            .select('id','name','email','admin')
            .where({id:req.params.id})
            .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }



    return {save, get, getById, remove}
}