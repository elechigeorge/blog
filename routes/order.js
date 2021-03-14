//blog routes

const express = require('express');
const Blog = require('./../models/Blog');
const Order = require('./../models/Order');
const router = express.Router();
const multer = require('multer');

//define storage for the images

const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
        callback(null, './public/uploads/images');
    },

    //add back the extension
    filename: function (request, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});

//upload parameters for multer
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
});

router.get('/new', (request, response) => {
    response.render('new');
});

//view route
router.post('/:slug', async (request, response, next) => {
    try {
        let blog = await Blog.findOne({ slug: request.params.slug });


        if (!blog) throw new Error({ msg: "inva" });



        let order = new Order({
            title: blog.title,
            price: blog.price,
            description: blog.description,
            img: blog.img,
        });

        order = await order.save();

        response.status(200).json(order)

        //   if (blog) {
        //     response.redirect('pages/show');
        //   } else {
        //     response.redirect('/');
        //   }

    } catch (error) {
        response.status(500).json(error)
    }

});



// route that handles edit view
router.get('/', async (request, response) => {
    let order = await Order.find();

    // create new order
    response.status(200).json(order)

    // response.render('edit', { blog: blog });
});

//route to handle updates
router.put('/:id', async (request, response) => {
    request.blog = await Blog.findById(request.params.id);
    let blog = request.blog;
    blog.title = request.body.title;
    blog.price = request.body.price;
    blog.description = request.body.description;

    try {
        blog = await blog.save();
        //redirect to the view route
        response.redirect(`/blogs/${blog.slug}`);
    } catch (error) {
        console.log(error);
        response.redirect(`/seblogs/edit/${blog.id}`, { blog: blog });
    }
});

///route to handle delete
router.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id);
    response.redirect('/');
});

module.exports = router;
