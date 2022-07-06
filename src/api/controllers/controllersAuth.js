const logger = require('../utils/winston')

class controllersAuth {

    async products (req, res) {
        try { 
            logger.info('Se accedió correctamente a productos')
            res.render('products', {
                user: req.user
            })
        } catch (error) {
            logger.error('Error en productos: ' + error)
            res.send('Error')
        }
    }

    async login (req, res)  {
        try {
            logger.info('Accedió correctamente a /login')
            if (req.isAuthenticated()) return res.redirect('/auth')
            res.render('login')
        } catch (error) {
            logger.error('Error en /login: ' + error)
            res.send('Error')
        }
    }

    async redirect (req, res) {
        res.redirect('/')
    } 

    async signup (req, res)  {
        try {
            logger.info('Accedió correctamente a /signup')
            if (req.isAuthenticated()) return res.redirect('/auth')
            res.render('signup')
        } catch (error) {
            logger.error('Error en /signup: ' + error)
            res.send('Error')
        }
    }

    async redirectLogin (req, res) {
        res.redirect('/auth/login')
    } 

    async logout (req, res) {
        try {
            logger.info('Se ha deslogueado la sesión correctamente')
            req.logout(err => {
                if (err) return err
                res.redirect('/auth/login')
            })
        } catch (error) {
            logger.error('Error en /logout: ' + error)
            res.send('Error')
        }
    }

    async errorLogin (req, res) {
        try {
            logger.warn('No se ha podido iniciar sesión')
            if (req.isAuthenticated()) return res.redirect('/auth')
            res.render('error-login')
        } catch (error) {
            logger.error('Error en /error-login: ' + error)
            res.send('Error')
        }
    }

    async errorSignup (req, res) {
        try {
            logger.warn('No se ha podido registrar el usuario')
            if (req.isAuthenticated()) return res.redirect('/auth')
            res.render('error-signup')
        } catch (error) {
            logger.error('Error en /error-signup: ' + error)
            res.send('Error')
        }
    }
}

module.exports = new controllersAuth