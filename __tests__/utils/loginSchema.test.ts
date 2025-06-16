import {loginSchema} from '../../src/utils/loginSchema';

describe('Login Schema Validation', () => {
  it('should pass with valid email and password', async () => {
    const validData = {email: 'test@example.com', password: '123456'};
    await expect(loginSchema.validate(validData)).resolves.toEqual(validData);
  });

  it('should fail if email is empty', async () => {
    const data = {email: '', password: '123456'};
    await expect(loginSchema.validate(data)).rejects.toThrow(
      'Email là bắt buộc',
    );
  });

  it('should fail if email format is wrong', async () => {
    const data = {email: 'not-an-email', password: '123456'};
    await expect(loginSchema.validate(data)).rejects.toThrow(
      'Email không hợp lệ',
    );
  });

  it('should fail if password is empty', async () => {
    const data = {email: 'test@example.com', password: ''};
    await expect(loginSchema.validate(data)).rejects.toThrow(
      'Mật khẩu là bắt buộc',
    );
  });

  it('should fail if password is too short', async () => {
    const data = {email: 'test@example.com', password: '123'};
    await expect(loginSchema.validate(data)).rejects.toThrow(
      'Mật khẩu phải có ít nhất 6 ký tự',
    );
  });
});
