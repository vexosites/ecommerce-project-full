import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import TokensService from '../../../src/modules/auth/Tokens.service.js';

describe('TokensService', () => {
  let service;
  let mockProvider;
  let mockRepository;

  beforeEach(() => {
    mockProvider = {
      verify: jest.fn(),
      generate: jest.fn(),
      isOlder9Min: jest.fn()
    };

    mockRepository = {
      get: jest.fn(),
      update: jest.fn()
    };

    service = new TokensService(mockProvider, mockRepository);
  });

  describe('verify', () => {
    test('should return valid when access token is valid and not expired', async () => {
      mockProvider.verify.mockResolvedValue({
        valid: true,
        expired: false,
        payload: { id: 1, role: 'ADMIN', iat: Date.now() }
      });

      mockProvider.isOlder9Min.mockReturnValue(false);

      const result = await service.verify('accessToken', 'refreshToken');

      expect(result.valid).toBe(true);
      expect(result.shouldRefresh).toBe(false);
      expect(result.user).toBeDefined();
    });

    test('should refresh access token when older than 9 minutes', async () => {
      mockProvider.verify.mockResolvedValue({
        valid: true,
        expired: false,
        payload: { id: 1, role: 'ADMIN', iat: 0 }
      });

      mockProvider.isOlder9Min.mockReturnValue(true);
      mockProvider.generate.mockResolvedValue('newAccessToken');

      const result = await service.verify('accessToken', 'refreshToken');

      expect(result.valid).toBe(true);
      expect(result.shouldRefresh).toBe(true);
    });

    test('should generate new tokens when access token is expired and refresh is valid', async () => {
      mockProvider.verify
        .mockResolvedValueOnce({
          valid: false,
          expired: true
        }) // access token
        .mockResolvedValueOnce({
          valid: true,
          payload: { userId: 1 }
        }); // refresh token

      mockRepository.get.mockResolvedValue({
        token: 'refreshToken'
      });

      mockProvider.generate
        .mockResolvedValueOnce('newAccessToken')
        .mockResolvedValueOnce('newRefreshToken');

      const result = await service.verify('accessToken', 'refreshToken');

      expect(result.valid).toBe(true);
      expect(result.newTokens).toBeDefined();
      expect(result.newTokens.accessToken).toBeDefined();
      expect(result.newTokens.refreshToken).toBeDefined();
    });

    test('should return invalid when refresh token is invalid', async () => {
      mockProvider.verify
        .mockResolvedValueOnce({
          valid: false,
          expired: true
        }) // access token
        .mockResolvedValueOnce({
          valid: false
        }); // refresh token

      const result = await service.verify('accessToken', 'refreshToken');

      expect(result.valid).toBe(false);
    });

    test('should return invalid when refresh token does not match stored token', async () => {
      mockProvider.verify
        .mockResolvedValueOnce({
          valid: false,
          expired: true
        }) // access token
        .mockResolvedValueOnce({
          valid: true,
          payload: { userId: 1 }
        }); // refresh token

      mockRepository.get.mockResolvedValue({
        token: 'differentRefreshToken'
      });

      const result = await service.verify('accessToken', 'refreshToken');

      expect(result.valid).toBe(false);
    });
  });
});