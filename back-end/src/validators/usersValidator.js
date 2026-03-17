class UserValidator {
    post(req) {
      if (!req.body) {
        throw new Error("invalid body");
      }
  
      const { name, email, password, cpf } = req.body;
  
      if (!name || !email || !password || !cpf) {
        throw new Error("missing required fields");
      }
  
      const passwordRegex = /^(?=.*\d).{8,}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      const nameRegex = /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*$/;
      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
  
      if (!passwordRegex.test(password)) {
        throw new Error("password must have at least 8 characters and 1 number");
      }
  
      if (!emailRegex.test(email)) {
        throw new Error("invalid email");
      }
  
      if (!nameRegex.test(name)) {
        throw new Error("invalid name");
      }
  
      if (!cpfRegex.test(cpf)) {
        throw new Error("invalid cpf");
      }

      console.log('user', email, name, password, cpf)
  
      return { name, email, password, cpf };
    }
    get(req){
      if(!req.params) throw new Error("invalid body!");
      
      const {email, password} = req.params;

      if(!email || !password) throw new Error("missing required fields");

      const passwordRegex = /^(?=.*\d).{8,}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      if(!passwordRegex.test(password) || !emailRegex.test(email)) throw new Error('invalid required fields');

      return {email, password};
    }
  }
  
  export default new UserValidator();
  