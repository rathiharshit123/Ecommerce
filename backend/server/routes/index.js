
const userRoutes = require("../user");
const productRoutes = require('../product');

const route = function(app){
    app.use('/api/v1/user',userRoutes);
    app.use('/api/v1/product',productRoutes);
    
    app.get("/api/v1/serverTime",(req,res)=>{
        res.json({serverTime: Date.now()});
    })
}

module.exports = route