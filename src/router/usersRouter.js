import { Router } from 'express'
import { usuariosManager } from '../models/users.mongoose.js'
import { soloLogueadosWeb } from '../middlewares/sesiones.js'

export const usuariosRouter = Router()

// registro

usuariosRouter.get('/register', function registerView(req, res) {
    res.render('register.handlebars', {
        pageTitle: 'Registro'
    })
})

usuariosRouter.post('/register', async function registrarUsuario(req, res) {
    try {
        console.log('Datos del formulario:', req.body);
        await usuariosManager.create(req.body)
        res.redirect('/login')
    } catch (error) {
        res.redirect('/register')
    }
})

// perfil
usuariosRouter.get('/profile', soloLogueadosWeb, function profileView(req, res) {
    console.log('Usuario en sesión al renderizar perfil:', req.session['user']);
    res.render('profile', {
        pageTitle: 'Perfil',
        user: req.session['user']
    })
})