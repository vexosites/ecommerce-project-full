import UsersValidator from '../../../src/validators/usersValidator.js';

describe('UsersValidator', () => {

  // ======================
  // POST
  // ======================
  describe('post', () => {

    test('deve validar e retornar dados corretamente', () => {
      const req = {
        body: {
          name: 'Leonard Silva',
          email: 'leo@email.com',
          password: '12345678a',
          cpf: '12345678900'
        }
      };

      const result = UsersValidator.post(req);

      expect(result).toEqual(req.body);
    });

    test('deve falhar se body não existir', () => {
      const req = {};

      expect(() => UsersValidator.post(req))
        .toThrow('invalid body');
    });

    test('deve falhar se faltar campos obrigatórios', () => {
      const req = {
        body: {
          name: 'Leo'
        }
      };

      expect(() => UsersValidator.post(req))
        .toThrow('missing required fields');
    });

    test('deve falhar se senha for inválida', () => {
      const req = {
        body: {
          name: 'Leonard Silva',
          email: 'leo@email.com',
          password: '123', // inválida
          cpf: '12345678900'
        }
      };

      expect(() => UsersValidator.post(req))
        .toThrow('password must have at least 8 characters and 1 number');
    });

    test('deve falhar se email for inválido', () => {
      const req = {
        body: {
          name: 'Leonard Silva',
          email: 'leoemail.com',
          password: '12345678a',
          cpf: '12345678900'
        }
      };

      expect(() => UsersValidator.post(req))
        .toThrow('invalid email');
    });

    test('deve falhar se nome for inválido', () => {
      const req = {
        body: {
          name: 'Leo123',
          email: 'leo@email.com',
          password: '12345678a',
          cpf: '12345678900'
        }
      };

      expect(() => UsersValidator.post(req))
        .toThrow('invalid name');
    });

    test('deve falhar se cpf for inválido', () => {
      const req = {
        body: {
          name: 'Leonard Silva',
          email: 'leo@email.com',
          password: '12345678a',
          cpf: '123'
        }
      };

      expect(() => UsersValidator.post(req))
        .toThrow('invalid cpf');
    });

  });

  // ======================
  // GET
  // ======================
  describe('get', () => {

    test('deve validar e retornar dados corretamente', () => {
      const req = {
        params: {
          email: 'leo@email.com',
          password: '12345678a'
        }
      };

      const result = UsersValidator.get(req);

      expect(result).toEqual(req.params);
    });

    test('deve falhar se params não existir', () => {
      const req = {};

      expect(() => UsersValidator.get(req))
        .toThrow('invalid body!');
    });

    test('deve falhar se faltar campos obrigatórios', () => {
      const req = {
        params: {
          email: 'leo@email.com'
        }
      };

      expect(() => UsersValidator.get(req))
        .toThrow('missing required fields');
    });

    test('deve falhar se email ou senha forem inválidos', () => {
      const req = {
        params: {
          email: 'leoemail.com',
          password: '123'
        }
      };

      expect(() => UsersValidator.get(req))
        .toThrow('invalid required fields');
    });

  });

});