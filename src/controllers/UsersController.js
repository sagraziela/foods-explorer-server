const knex = require("../database/knex/");
const AppError = require("../utils/AppError");
const { hash, compare } = require("bcrypt");

class UsersController {
    async create (request, response) {
        const { name, email, password } = request.body;

        if(!name) {
            throw new AppError("O nome é obrigatório");
        };

        const emailExists = await knex("users").where({ email }).first();

        if(emailExists) {
            throw new AppError("Esse e-mail já está cadastrado em nosso banco de dados. Por favor, informe outro e-mail para continuar o seu cadastro.");
        };

        const hashedPassword = await hash(password, 8);

        const user = await knex("users").insert({
            name,
            email,
            password: hashedPassword
        })
    
        return response.status(201).json({ name, email, password });
    }

    async update (request, response) {
        const { 
            name, 
            email, 
            address, 
            phone_number, 
            password, 
            old_password
        } = request.body;

        const { id } = request.params;
      
        const user = await knex("users").where({ id });
        console.log(user)

        if(!user) {
            throw new AppError("Usuário não encontrado");
        };

        if(password && !old_password) {
            throw new AppError("É necessário informar sua senha antiga para salvar uma nova.");
        };
        console.log(user.password)
        if(password && old_password) {
            const passwordMatches = await compare(old_password, user[0].password);

            if(passwordMatches === false) {
                throw new AppError("A senha antiga não confere.");
            }

            user.password = await hash(password, 8);
        };

        user.name = name ?? user.name;
        user.email = email ?? user.email;
        user.address = address ?? user.address;
        user.phone_number = phone_number ?? user.phone_number;

        await knex("users").update({
            name: user.name,
            email: user.email,
            address: user.address,
            phone_number: user.phone_number,
            password: user.password
        }).where({ id })

        return response.json();
    }
}

module.exports = UsersController;