import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { v4 as uuid4 } from 'uuid';
import { promises as fs } from 'fs';
import { postRepository, userRepository } from '../repository';
import { User, UserType } from '../entities';
import { BadRequestException, NotFoundException } from '../exceptions';
import { env } from '../utils';

class UserService {

  // Find a user by their id
  async findUserById(id: string): Promise<User> {
    const user = await userRepository.selectById(id);
    if (!user) throw new NotFoundException('The user was not found.');
    return user;
  }

  // Find a user by their username
  async findUserByUsername(username: string): Promise<User> {
    const user = await userRepository.selectByUsername(username);
    if (!user) throw new NotFoundException('The user was not found.');
    return user;
  }

  // Generate a JsonWebToken token for a user
  async generateToken(user: User): Promise<string> {
    const payload = { userId: user.id };
    const secret = env.getJwtSecret();
    return new Promise((resolve, reject) => {
      jsonwebtoken.sign(payload, secret, (error, encoded) => {
        if (error || !encoded) return reject(error);
        return resolve(encoded);
      });
    });
  }

  // Authenticate the user with username and password
  async authenticate(username: string, password: string): Promise<User> {
    const user = await userRepository.selectByUsername(username);
    if (!user) {
      throw new BadRequestException('Invalid username or password.');
    } else {
      const doPasswordsMatch = await bcrypt.compare(password, user.password);
      if (!doPasswordsMatch) {
        throw new BadRequestException('Invalid username or password.');
      } else {
        return user;
      }
    }
  }

  // Create a new regular user
  async createUser(username: string, password: string): Promise<void> {
    const errors: { username?: string, password?: string } = {};
    const usernameError = await UserService.validateUsername(username);
    if (usernameError) errors.username = usernameError;
    const passwordError = UserService.validatePassword(password);
    if (passwordError) errors.password = passwordError;
    if (Object.keys(errors).length) {
      throw new BadRequestException('The provided fields are invalid.', errors);
    } else {
      const id = uuid4();
      const hashedPassword = await bcrypt.hash(password, 10);
      await userRepository.insert(id, UserType.regular, username, hashedPassword);
    }
  }

  // Delete an existing user
  async deleteUser(user: User, password: string): Promise<void> {
    const doPasswordsMatch = await bcrypt.compare(password, user.password);
    if (!doPasswordsMatch) {
      throw new BadRequestException('The password is incorrect.');
    } else {
      const filenamesToDelete = await postRepository.selectFilenamesByUserId(user.id);
      if (user.filename) filenamesToDelete.push(user.filename);
      await Promise.all(filenamesToDelete.map(filename => {
        return fs.rm(`uploads/${filename}`, { force: true });
      }));
      await userRepository.delete(user.id);
    }
  }

  // Update the username of a user
  async updateUsername(user: User, username: string): Promise<void> {
    const usernameError = await UserService.validateUsername(username);
    if (usernameError) {
      throw new BadRequestException(usernameError);
    } else {
      await userRepository.update(user.id, { username });
    }
  }

  // Update the password of a user
  async updatePassword(user: User, newPassword: string, currentPassword: string): Promise<void> {
    const errors: { newPassword?: string, currentPassword?: string } = {};
    const newPasswordError = UserService.validatePassword(newPassword);
    if (newPasswordError) errors.newPassword = newPasswordError;
    const doPasswordsMatch = await bcrypt.compare(currentPassword, user.password);
    if (!doPasswordsMatch) errors.currentPassword = 'The password is incorrect.';
    if (Object.keys(errors).length) {
      throw new BadRequestException('The provided fields are invalid.', errors);
    } else {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await userRepository.update(user.id, { password: hashedPassword });
    }
  }

  // Update the profile picture of a user
  async updatePicture(user: User, file?: Express.Multer.File): Promise<void> {
    const filename = file?.filename || null;
    if (user.filename) {
      await fs.rm(`uploads/${user.filename}`, { force: true });
    }
    await userRepository.update(user.id, { filename });
  }

  // Sanitize user data
  getSanitizedUserData(user: User): Omit<User, 'password'> {
    const { password, ...rest } = user;
    return rest;
  }

  // Validate a username, returns the error
  private static async validateUsername(username: string): Promise<string | undefined> {
    const found = await userRepository.selectByUsername(username);
    if (found) {
      return 'The username is in use already.';
    } else if (!username.match(/[a-zA-Z0-9\-_.]{1,32}/g)) {
      return 'The username is invalid.';
    }
  }

  // Validate a password, returns the error
  private static validatePassword(password: string): string | undefined {
    const passwordPolicy: validator.strongPasswordOptions = {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    };
    if (!validator.isStrongPassword(password, passwordPolicy)) {
      return 'The password is too weak.';
    } else if (password.length > 256) {
      return 'The password is too long.';
    }
  }

}

export const userService = new UserService();
