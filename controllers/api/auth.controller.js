const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var token_list = {};
const utils = require('../../middlewares/authentication/until');

const User = require('../../models/users');

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
                        const refresh_token = jwt.sign({_user}, process.env.REFRESH_TOKEN_SECRET, {
                            expiresIn: 900
                        });
                         // Lưu lại mã Refresh token, kèm thông tin của user để sau này sử dụng lại
                        token_list[refresh_token] = _user;
                        // Trả lại cho user thông tin mã token kèm theo mã Refresh token
                        const response = {
                            access_token,
                            refresh_token,
                        }

                        res.json({response});
                    }
                    else{
                        res.status(401).json({"error":"Password incorrect!"})
                    }
                });
            }else{
                res.status('404').json({"error":"Email Not Found!"});
            }
       } catch (error) {
           res.send("error : " + error)
        }
    }
/**
 * Lấy mã token mới sử dụng Refresh token
 * POST /refresh_token
 */
module.exports.refreshToken =  async (req, res) => {
    // User gửi mã Refresh token kèm theo trong body
    const { refresh_token } = req.body;
    // Kiểm tra Refresh token có được gửi kèm và mã này có tồn tại trên hệ thống hay không
    if ((refresh_token) && (refresh_token in token_list)) {
      try {
        // Kiểm tra mã Refresh token
        // console.log(process.env.REFRESH_TOKEN_SECRET);
         await utils.verifyJwtToken(refresh_token, process.env.REFRESH_TOKEN_SECRET);
         // Lấy lại thông tin user
        const _user = token_list[refresh_token];
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
module.exports.get_user = async (req , res) =>{
  const token = req.header('Authorization').replace('Bearer ', '');
  jwt.verify(token, process.env.SESSION_TOKEN_SECRET, async (err, decoded) =>{
    if(err){
      res.status(404).json({'error':'User Not Found!'});
    }
    const user=  await User.findOne({ _id: decoded._user.id});
    if(user){
      const _user = new User({
        _id : user._id,
        name: user.name,
        email:user.email,
        avatar:user.avatar,
        createdAt:user.createdAt,
        updatedAt:user.updatedAt,
      })
      res.status(200).json(_user);
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
//         // const a = await utils.verifyJwtToken(token_list, process.env.REFRESH_TOKEN_SECRET);
//         // console.log(a); 
        
//     } catch (error) {
//         res.status(500).send("loi:"+error)
//     }
// }
