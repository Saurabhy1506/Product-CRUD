const express = require ('express');
const mysqlConnection = require('./db');
const app = express();
const bodyparser = require('body-parser')

app.use(bodyparser.json())

app.listen(3300,()=>{
    console.log("server is running on port 3300");
});

app.get('/',(req,res)=>{
    res.send("hello")
})
app.get('/products',(req,res)=>{
    mysqlConnection.query('select * from products',(err, rows)=>{
        if(!err){
            res.send(rows)
        }
        else{
            console.log(err);
        }
    })
})

app.get('/products/:id',(req,res)=>{
    mysqlConnection.query('select * from products where id = ?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})

app.post('/products',(req,res)=>{
let products = req.body;

var sql = `insert into products(id, name, description, long_description, attributes, price,sale_price, stock, images, tax, category_id) values ('${products.id}','${products.name}','${products.description}','${products.long_description}','${products.attributes}','${products.price}','${products.sales_price}','${products.stock}','${products.images}','${products.tax}','${products.category_id}')`
mysqlConnection.query(sql,(err, rows,fields)=>{
    if(!err)
        if(rows.affectedRows>0)
        res.send("inserted product id:" +rows.insertId)
    
    else{
        console.log(err);
    }
})
})

app.put('/products/:id',(req,res)=>{
    let products =req.body;
    var sql = `update products set name = '${products.name}',description='${products.description}',long_description='${products.long_description}',attributes = '${products.attributes}',price='${products.price}',sale_price='${products.sale_price}',stock='${products.stock}',images='${products.images}',tax='${products.tax}'`
    mysqlConnection.query(sql,(err, rows, fields)=>{
        if(!err){
            res.send("updated successfully");
        }
        else{
            console.log(err);
        }
    })
})

app.delete('/products/:id',(req,res)=>{
    mysqlConnection.query(`delete from products where id = ?`,[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send("deleted successfully")
        }
        else{
            console.log(err);
        }
    })
})

app.get('/categories',(req,res)=>{
    mysqlConnection.query('select * from categories',(err, rows)=>{
        if(!err){
            res.send(rows)
        }
        else{
            console.log(err);
        }
    })
})

app.get('/categories/:id',(req,res)=>{
    mysqlConnection.query('select * from categories where id = ?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})


app.post('/categories',(req,res)=>{
    let categories = req.body;
    var sql = `Insert into categories(id, name, image, description) values ('${categories.id}','${categories.name}','${JSON.stringify(categories.image)}','${categories.description}')`
    mysqlConnection.query(sql,(err, rows,fields)=>{
        if(!err){
            if(rows.affectedRows>0){
                res.send("inserted categories id "+rows.insertId)
            }
        }
        else{
            console.log(err);
        }
    })
    })
    
    app.put('/categories/:id',(req,res)=>{
        let categories =req.body;
        var sql = `update categories set name = '${categories.name}',image='${categories.image}',description='${categories.description}'`
        mysqlConnection.query(sql,(err, rows, fields)=>{
            if(!err){
                res.send("updated successfully");
            }
            else{
                console.log(err);
            }
        })
    })
    
    app.delete('/categories/:id',(req,res)=>{
        mysqlConnection.query(`delete from categories where id = ?`,[req.params.id],(err, rows, fields)=>{
            if(!err){
                res.send("deleted successfully")
            }
            else{
                console.log(err);
            }
        })
    })
    