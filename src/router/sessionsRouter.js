import { Router } from 'express'
import { usuariosManager } from '../models/users.mongoose.js'

export const sesionesRouter = Router()

// login
sesionesRouter.get('/', (req,res) =>{
    return res.redirect('/login')
})

sesionesRouter.get('/login', function loginView(req, res) {
    res.render('login', {
        pageTitle: 'Login'
    })
})

sesionesRouter.post('/login', async (req, res) => {
    try {
        const { Email, Password } = req.body
        console.log(req.body)
        let datosUsuario

        if (Email === 'adminCoder@coder.com' && Password === 'adminCoderunodostres') {
            datosUsuario = {
                email: 'admin',
                nombre: 'admin',
                apellido: 'admin',
                rol: 'admin'
        }
    } else {
        const usuario = await usuariosManager.findOne({ Email }).lean()
        console.log(usuario);
        if (!usuario) {
            return res.redirect('/login')
        }

      // deberia encriptar la recibida y comparar con la guardada que ya esta encriptada
        if (Password !== usuario.Password) {
            return res.redirect('/login')
        }

        datosUsuario = {
            email: usuario.Email,
            nombre: usuario.Nombre,
            apellido: usuario.Apellido,
            rol: 'usuario'
        }
    }

    req.session['user'] = datosUsuario
    console.log('Usuario en la sesión:', datosUsuario);
    res.redirect('/products')
    } catch (error) {
        res.redirect('/login')
    }
})

// logout
sesionesRouter.post('/logout', (req, res) => {
    req.session.destroy(err => {
        res.redirect('/login')
    })
})