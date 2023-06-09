const Product = require('../db/models/product');
const fs = require('fs')

class ProductController {

   async showProducts(req, res) {
      
      const{q, sort, filtr, countmin, countmax} = req.query;
      const page = req.query.page || 1;
      const perPage = 3;

      const where ={};
      if (q) where.name = {$regex: q, $options: 'i'};
      if (filtr) where.category = {$regex: filtr};

      if (countmin || countmax)  {
         where.price = {};
         if (countmin) where.price.$gte = countmin;
         if (countmax) where.price.$lte = countmax;
      }
      
      let query = Product.find(where);
      
      
      query = query.skip((page - 1) * perPage);
      query = query.limit(perPage);
      
      
      if (sort) {
        const s = sort.split('|')
         query = query.sort({[s[0]]: s[1]});
      }

      const products = await query.populate('user').exec();
      
      const resultsCount = await Product.find(where).count();
      const pagesCount = Math.ceil(resultsCount / perPage);
      

      res.render('pages/products/products', {
         titlePage: '-produkty',
        products,
        page,
        pagesCount,
        resultsCount,
        
        
      })
     }

    async showProduct (req, res)  {
        const{name} = req.params;
        
        const product = await Product.findOne({slug: name}).populate('user').exec();
         
          res.render('pages/products/product', {
            
             product,
             name: product?.name,
             description: product?.description ?? 'brak opisu',
             titlePage: product?.name ?? 'brak wyników'
          });
    }

    showCreateProductForm(req, res) {
         res.render('pages/products/create');
    }

    async createProduct(req,res) {
      
        const product = new Product({
         name: req.body.name,
         slug: req.body.name,
         price: req.body.price,
         category: req.body.category,
         description: req.body.description,
         user: req.session.user._id,
         
         
        });

       try{
        await product.save();
        res.redirect('/produkty');
       } catch (e) {
          res.render('pages/products/create', {
            errors: e.errors,
            form: req.body
          })
       }
    }



    async showEditProductForm(req, res) {
      const{name} = req.params;
      const product = await Product.findOne({slug: name})
         res.render('pages/products/edit', {
            form: product
         });
    }

    async editProduct(req,res) {
      const{name} = req.params;
      const product = await Product.findOne({slug: name});
      product.name = req.body.name;
      product.slug = req.body.name;
      product.price = req.body.price;
      product.category = req.body.category;
      product.description = req.body.description;

      if (req.file && product.image) {
         fs.unlinkSync('public/uploads/' + product.image);
      }
      if (req.file) {
         product.image = req.file.filename
      }

      

      

       try{
        await product.save();
        res.redirect('/produkty');
       } catch (e) {
          res.render('pages/products/edit', {
            errors: e.errors,
            form: req.body
          })
       }
    }

    async deleteProduct(req, res) {
      const{name} = req.params;
      const product = await Product.findOne({slug: name});
   try{
      if (product.image) {
         fs.unlinkSync('public/uploads/' + product.image)
      }
       await Product.deleteOne({slug: name});
       res.redirect('/produkty')
   } catch (e){
        //
      }
    }

    async deleteImage(req, res) {
      const{name} = req.params;
       const product = await Product.findOne({slug: name});
       try{
         fs.unlinkSync('public/uploads/' + product.image);
         product.image = '';
         await product.save();
          res.redirect('/produkty')
      } catch (e){
           //
         }
    }

};

module.exports = new ProductController();