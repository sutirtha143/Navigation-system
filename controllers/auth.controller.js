import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';

export const signup =async (req, res, next) => {
    const {username, email, password} = req.body

    var hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashedPassword})
    try{
        let ok = await newUser.save()
        console.log(ok)

        res.status(201).json("User created successfully")

    }catch(error){ 
        next(error)  
    }
}

export const signin = async (req, res, next) => {
    const {email, password} = req.body

    try{
        
        const validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(404, "Email not found!"))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return next(errorHandler(401, "Wrong password!"))

        const{password: pass, ...restinfo} = validUser._doc //we remove the password here and put remaining data in rest
        res.status(200).json(restinfo)  

    }catch(error){
        next(error)
    }
}