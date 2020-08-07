const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var tokenList = {};
const utils = require('../middlewares/authentication/until');

const User = require('../models/users');

const { json } = require('body-parser');
const { response } = require('express');
/**
 * Login
 * 
 * 
 */
module.exports.login = async(req,res) => {
       try {
            const user =  await User.findOne({ email: req.body.email});
            if(user){
                var _user = {
                    "id":user._id,
                    "email":user.email,
                }
                bcrypt.compare(req.body.password,user.password, function(err, result) {
                    if(result){
                        //refresh after 15p
                        const access_token = jwt.sign({_user}, process.env.SESSION_TOKEN_SECRET, {
                            expiresIn: 900
                          });
                          // Tạo một mã token khác - Refresh token
                        const refreshToken = jwt.sign({_user}, process.env.REFRESH_TOKEN_SECRET, {
                            expiresIn: 900
                        });
                         // Lưu lại mã Refresh token, kèm thông tin của user để sau này sử dụng lại
                        tokenList[refreshToken] = _user;
                        // Trả lại cho user thông tin mã token kèm theo mã Refresh token
                        const response = {
                            access_token,
                            refreshToken,
                        }

                        res.json({response});
                    }
                    else{
                        res.status(401).send("Password incorrect!")
                    }
                });
            }else{
                res.status('404').send(new Error("Not Found Email!"));
            }
       } catch (error) {
           res.send("Error : " + error)
        }
    }
/**
 * Lấy mã token mới sử dụng Refresh token
 * POST /refresh_token
 */
module.exports.refreshToken =  async (req, res) => {
    // User gửi mã Refresh token kèm theo trong body
    const { refreshToken } = req.body;
    
    // Kiểm tra Refresh token có được gửi kèm và mã này có tồn tại trên hệ thống hay không
    if ((refreshToken) && (refreshToken in tokenList)) {
      try {
        // Kiểm tra mã Refresh token
        // console.log(process.env.REFRESH_TOKEN_SECRET);
         await utils.verifyJwtToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
         // Lấy lại thông tin user
        const _user = tokenList[refreshToken];
        // Tạo mới mã token và trả lại cho user
        const access_token = jwt.sign({_user}, process.env.SESSION_TOKEN_SECRET, {
            expiresIn: 900
          });
        const response = {
            access_token,
        }
        // res.header('access_token',json(response));
        res.status(200).json(response);
      } catch (err) {
        // console.error(err);
        res.status(403).json({
          message: 'Invalid refresh token',
        });
      }
    } else {
      res.status(400).json({
        message: 'Invalid request',
      });
    }
  }
/**
 *  get user by token
 * 
 */
module.exports.getUserById = async (req , res) =>{
  const token = req.header('Authorization').replace('Bearer ', '');
  jwt.verify(token, process.env.SESSION_TOKEN_SECRET, async (err, decoded) =>{
    if(err){
      res.status(404).send('User Not Found!');
    }
    const user=  await User.findOne({ _id: decoded._user.id});
    if(user){
      res.status(200).json(user);
    }
    else{
      res.status(404).send('User Not Found');
    }


  });
  
}

  /**Logout revoke token
   * 
   */
// module.exports.logout  = async(req,res) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '')

//         res.json(token);
//         // const a = await utils.verifyJwtToken(tokenList, process.env.REFRESH_TOKEN_SECRET);
//         // console.log(a); 
        
//     } catch (error) {
//         res.status(500).send("loi:"+error)
//     }
// }
