

class controllersAuth {

    async products (req, res) {
        try {
            console.log('Se accedió correctamente a productos')
            res.render('products', {
                user: req.user
            })
        } catch (error) {
            console.log('Error en productos: ' + error)
            res.send('Error')
        }
    }

    async login (req, res)  {
        try {
            console.log('Accedió correctamente a /login')
            if (req.isAuthenticated()) return res.redirect('/auth')
            res.render('login')
        } catch (error) {
            console.log('Error en /login: ' + error)
            res.send('Error')
        }
    }

    async redirect (req, res) {
        res.redirect('/')
    } 

    async signup (req, res)  {
        try {
            console.log('Accedió correctamente a /signup')
            if (req.isAuthenticated()) return res.redirect('/auth')
            res.render('signup')
        } catch (error) {
            console.log('Error en /signup: ' + error)
            res.send('Error')
        }
    }

    async redirectLogin (req, res) {
        res.redirect('/auth/login')
    } 

    async logout (req, res) {
        try {
            console.log('Se ha deslogueado la sesión correctamente')
            req.logout(err => {
                if (err) return err
                res.redirect('/auth/login')
            })
        } catch (error) {
            console.log('Error en /logout: ' + error)
            res.send('Error')
        }
    }

    async errorLogin (req, res) {
        try {
            console.log('No se ha podido iniciar sesión')
            if (req.isAuthenticated()) return res.redirect('/auth')
            res.render('error-login')
        } catch (error) {
            console.log('Error en /error-login: ' + error)
            res.send('Error')
        }
    }

    async errorSignup (req, res) {
        try {
            console.log('No se ha podido registrar el usuario')
            if (req.isAuthenticated()) return res.redirect('/auth')
            res.render('error-signup')
        } catch (error) {
            console.log('Error en /error-signup: ' + error)
            res.send('Error')
        }
    }
}

module.exports = new controllersAuth