const { Router } = require('express');
const authController = require('../controllers/authController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware')
const Task = require('../models/task');


const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.get('/userupdate', authController.userupdate_get);
router.post('/userupdate', authController.userupdate_post);


router.get('/create', requireAuth, (req, res) => res.render('create', {title: "Create task" } ));
router.get('/home', requireAuth, (req, res) => {
    Task.find().sort({ createdAt: 1})
    .then((result) => { 
        res.render('home', {title: "Home", tasks: result })
    })
    .catch((err) => {
        console.log(err);
    });
});

router.post('/home', (req, res) => {
    const task = new Task(req.body);

    task.save()
    .then((result) => {
        res.redirect('/home');
    })
    .catch((err) => {
        console.log(err);
    })
})




router.get('/profile', requireAuth, (req, res) => res.render('profile', {title: 'Profile' } ));




router.get('/task/:id', (req, res) =>{
    const id = req.params.id;
    Task.findById(id)
    .then(result => {
        res.render('details', {task: result, title: 'Task Details', })
    })
    .catch(err => {
        console.log(err);
    });
})
router.delete('/tasks/:id' ,(req, res) =>{
    const id = req.params.id;
    Task.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/home'})
    })
    .catch(err =>{
        console.log(err);
    });
})

router.use('*',(req, res) => res.render('404', {title: '404 | Not found'} ));
module.exports = router;