const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = require('../utils/toThousand');
const toDiscount = require('../utils/toDiscount');


const controller = {
	// Root - Show all products	
	index: (req, res) => {
		const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productsDataBase.json'), 'utf-8'));
		return res.render('products',{
		products,
		toThousand,
		toDiscount
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productsDataBase.json'), 'utf-8'));
		return res.render('detail', {
			product : products.find(product => product.id === +req.params.id),
			toThousand,
			toDiscount
		})
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form')		
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productsDataBase.json'), 'utf-8'));
		const {name,price,discount,category, description} = req.body;
        let product = {
            id : products[products.length - 1].id + 1,
            name : name.trim(),
            description : description.trim(),
            price : +price,
            discount : +discount,
			image : req.file ? req.file.filename : 'default-image.png',
            category                        
        }
        products.push(product);

        fs.writeFileSync(path.join(__dirname,'..','data','productsDataBase.json'),JSON.stringify(products,null,3),'utf-8');

        res.redirect('/products/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productsDataBase.json'), 'utf-8'));
		return res.render('product-edit-form', {
			product : products.find(product => product.id === +req.params.id)
		});
	},
	// Update - Method to update
	update: (req, res) => {	
		const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productsDataBase.json'), 'utf-8'));	
		const {name,price,discount,category, description} = req.body;

        let product = products.find(product => product.id === +req.params.id);

        let productEdited = {
            id : +req.params.id,
            name : name.trim(),
            price : +price,
            discount : +discount,
            category,
            description : description.trim(),
            image : product.image         
        }

        let productsEdited = products.map(product => product.id === +req.params.id ? productEdited : product);

        fs.writeFileSync(path.join(__dirname,'..','data','productsDataBase.json'),JSON.stringify(productsEdited,null,3),'utf-8');

        return res.redirect('/products/' + req.params.id)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productsDataBase.json'), 'utf-8'));
		
		let productsEdited = products.filter(product => product.id !== +req.params.id);

        fs.writeFileSync(path.join(__dirname,'..','data','productsDataBase.json'),JSON.stringify(productsEdited,null,3),'utf-8');

        return res.redirect('/products')      
	},
	visited : (req, res) => {
		let productsVisited = products.filter(product => product.category === 'visited');

        fs.writeFileSync(path.join(__dirname,'..','data','productsDataBase.json'),JSON.stringify(productsVisited,null,3),'utf-8');  
	}
};

module.exports = controller;