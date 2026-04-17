import { jest, test } from '@jest/globals';
import UsersService from '../../../src/services/usersService.js';

describe('UsersService', () => {
  describe('post', () => {
    test('should return 201 when all fields are valid', async () => {
      const mockRepository = {
        create: jest.fn().mockResolvedValue({
          id: 1,
          name: 'leonard',
          email: 'leonard@email.com'
        })
      };

      const mockTokenService = {
        generate: jest.fn().mockReturnValue('token')
      };

      const service = new UsersService(mockRepository, mockTokenService);

      const result = await service.post({
        name: 'leonard',
        email: 'leonard@email.com',
        password: '12345678',
        cpf: '12345678900'
      });

      expect(result).toBeDefined();
    });
test('should return 409 when any unique constraint is conflicting', async () => {
  const validUserData = {
    name: 'leonard',
    email: 'leonard@email.com',
    password: '12345678',
    cpf: '12345678900'
  };

  const mockRepository = {
    create: jest.fn().mockRejectedValue({
      code: 'P2002'
    })
  };

  const mockTokenService = {
    generate: jest.fn()
  };

  const service = new UsersService(mockRepository, mockTokenService);

  await expect(service.post(validUserData))
    .rejects
    .toMatchObject({
      statusCode: 409
    });
});
test('should', async()=>{
 
})
  });
});