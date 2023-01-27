

const route = function(app){
    app.use('/api/v1/user/')


    app.get("/api/v1/user/serverTime",(req,res)=>{
        res.json({serverTime: Date.now()});
    })
}