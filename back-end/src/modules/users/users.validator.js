import AppError from "../../shared/errors/UserError.js";

export class UsersValidator {
    post(req) {
      if (!req.body) {
        throw new AppError("invalid body", "INVALID_DATA");
      }
  
      const { name, email, password, cpf } = req.body;
  
      if (!name || !email || !password || !cpf) {
        throw new AppError("missing required fields");
      }
  
      const passwordRegex = /^(?=.*\d).{8,}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      const nameRegex = /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*$/;
      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
  
      if (!passwordRegex.test(password)) {
        throw new AppError("password must have at least 8 characters and 1 number", "INVALID_DATA");
      }
  
      if (!emailRegex.test(email)) {
        throw new AppError("invalid email", "INVALID_DATA");
      }
  
      if (!nameRegex.test(name)) {
        throw new AppError("invalid name", "INVALID_DATA");
      }
  
      if (!cpfRegex.test(cpf)) {
        throw new AppError("invalid cpf", "INVALID_DATA");
      }

      console.log('user', email, name, password, cpf)
  
      return { name, email, password, cpf };
    }
    get(req){
      if(!req.params) throw new AppError("invalid body!", "INVALID_DATA");
      
      const {email, password} = req.params;

      if(!email || !password) throw new AppError("missing required fields", "INVALID_DATA");

      const passwordRegex = /^(?=.*\d).{8,}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      if(!passwordRegex.test(password) || !emailRegex.test(email)) throw new AppError('invalid required fields', "INVALID_DATA");

      return {email, password};
    }
  }
  
  export default new UsersValidator();
  