import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { BaseService } from "./BaseService";
import { UserRepository } from "../repositories/UserRepository";
import { ServiceResponse } from "../types";
import { config } from "../config/environment";

export class UserService extends BaseService<User> {
  protected modelName = "User";
  private userRepository: UserRepository;

  constructor() {
    super();
    this.userRepository = new UserRepository();
  }

  async register(data: any): Promise<ServiceResponse<User>> {
    const validationErrors = this.validateRequiredFields(data, [
      "email",
      "password",
      "fullName",
    ]);
    if (validationErrors.length > 0) {
      return this.createErrorResponse("Validation failed", validationErrors);
    }

    if (!this.validateEmail(data.email)) {
      return this.createErrorResponse("Invalid email format");
    }

    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      return this.createErrorResponse("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    // Don't return password
    const { password, ...userWithoutPassword } = user;
    return this.createSuccessResponse(
      userWithoutPassword as User,
      "User registered successfully"
    );
  }

  async login(
    data: any
  ): Promise<ServiceResponse<{ user: Partial<User>; token: string }>> {
    const validationErrors = this.validateRequiredFields(data, [
      "email",
      "password",
    ]);
    if (validationErrors.length > 0) {
      return this.createErrorResponse("Validation failed", validationErrors);
    }

    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      return this.createErrorResponse("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return this.createErrorResponse("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: "user" }, // Default role
      config.JWT_SECRET,
      { expiresIn: "24h" }
    );

    const { password, ...userWithoutPassword } = user;

    return this.createSuccessResponse(
      { user: userWithoutPassword, token },
      "Login successful"
    );
  }

  // BaseService implementation
  async create(data: Partial<User>): Promise<ServiceResponse<User>> {
    // This probably shouldn't be used directly for users due to password hashing, prefer register
    return this.register(data);
  }

  async findById(id: string): Promise<ServiceResponse<User>> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return this.createErrorResponse("User not found", []);
    }
    const { password, ...userWithoutPassword } = user;
    return this.createSuccessResponse(userWithoutPassword as User);
  }

  async findAll(
    filters: Record<string, any> = {}
  ): Promise<ServiceResponse<User[]>> {
    const users = await this.userRepository.findAll(filters);
    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user;
      return rest as User;
    });
    return this.createSuccessResponse(usersWithoutPassword);
  }

  async update(
    id: string,
    data: Partial<User>
  ): Promise<ServiceResponse<User>> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const user = await this.userRepository.update(id, data);
    if (!user) {
      return this.createErrorResponse("User not found");
    }
    const { password, ...userWithoutPassword } = user;
    return this.createSuccessResponse(
      userWithoutPassword as User,
      "User updated successfully"
    );
  }

  async delete(id: string): Promise<ServiceResponse<boolean>> {
    const result = await this.userRepository.delete(id);
    return this.createSuccessResponse(result, "User deleted successfully");
  }
}
