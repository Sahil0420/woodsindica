// import jwt from 'jsonwebtoken';

// export const generateJWTToken = (user , secretKey) =>{
//   const payload = {
//     userId : user.uid,
//     email : user.email,
//   }  
//   const token = jwt.sign(payload , secretKey , {expiresIn : '120h'});
//   return token;
// };

// export const decodeJWTToken = (token) =>{
//   try{
//     return jwt.verify(token , 'your_secret_token');
//   }catch(error){
//     return null;
//   }
// }
