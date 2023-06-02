const User=require('../models/user')



module.exports.home=function(req,res){
    return res.render('home')
}

module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/result')
    }
    return res.render('sign_up')
}

module.exports.create= async function(req,res){
    if(req.body.password!=req.body.confirmPassword){
        console.log("Password does not match")
        return res.redirect('back')
    }
    const user=await User.findOne({email:req.body.email})
    if(!user){
        User.create(req.body)
        return res.redirect('/signin')
    }
    else{
        return res.redirect('back')
    }
}

module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return  res.redirect('/result')
    }
    return res.render('sign_in')
}

module.exports.createSession=function(req,res){
    return res.redirect('/result')
}

module.exports.result=function(req,res){
    return res.render('result')
}

module.exports.logout=function(req,res,next){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}
