const admin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
        throw new Error('NOT AUTHORIZED HERE AS AN ADMIN!');
    }
};

module.exports = admin ;