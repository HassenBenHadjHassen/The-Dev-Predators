import { User } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super();
  }

  async create(data: any): Promise<User> {
    return this.handleDatabaseOperation(() =>
      this.prisma.user.create({
        data,
      })
    );
  }

  async findById(id: string): Promise<User | null> {
    return this.handleDatabaseOperation(() =>
      this.prisma.user.findUnique({
        where: { id },
      })
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.handleDatabaseOperation(() =>
      this.prisma.user.findUnique({
        where: { email },
      })
    );
  }

  async findAll(filters: Record<string, any> = {}): Promise<User[]> {
    const where = this.buildWhereClause(filters);
    const orderBy = this.buildOrderByClause(
      filters.sortBy,
      filters.sortOrder as "asc" | "desc"
    );
    const { skip, take } = this.buildPaginationOptions(
      filters.page,
      filters.limit
    );

    return this.handleDatabaseOperation(() =>
      this.prisma.user.findMany({
        where,
        orderBy,
        skip,
        take,
      })
    );
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    return this.handleDatabaseOperation(() =>
      this.prisma.user.update({
        where: { id },
        data,
      })
    );
  }

  async delete(id: string): Promise<boolean> {
    await this.handleDatabaseOperation(() =>
      this.prisma.user.delete({
        where: { id },
      })
    );
    return true;
  }

  protected buildSearchClause(searchTerm: string): any[] {
    return [
      { fullName: { contains: searchTerm, mode: "insensitive" } },
      { email: { contains: searchTerm, mode: "insensitive" } },
    ];
  }
}
