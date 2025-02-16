export interface findOptions<T> {
	where?: Partial<T>;
	pagination?: {
		page: number;
		limit: number;
	};
}

export default abstract class GenericRepository<T> {
	abstract find(options?: findOptions<T>): Promise<T[]>;

	abstract findOne(options: Pick<findOptions<T>, "where">): Promise<T | null>;

	abstract create(data: T): Promise<T>;

	abstract update(data: T): Promise<T>;

	abstract delete(data: T): Promise<void>;

	abstract count(options?: Pick<findOptions<T>, "where">): Promise<number>;
}
