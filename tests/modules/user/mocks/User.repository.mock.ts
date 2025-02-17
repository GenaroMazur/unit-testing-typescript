import User from "../../../../src/modules/user/domain/User";
import UserRepository from "../../../../src/modules/user/domain/User.repository";
import { findOptions } from "../../../../src/repository/GenericRepository";

const user1 = User.builder()
	.withId(1)
	.withName("John Doe")
	.withEmail("johndoe@gmail.com")
	.withPassword("123456")
	.build();

const user2 = User.builder()
	.withId(2)
	.withName("Jane Doe")
	.withEmail("janedoe@gmail.com")
	.withPassword("123456")
	.build();

export default class UserRepositoryMock extends UserRepository {
	public readonly users: User[] = [user1, user2];

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	override find(_?: findOptions<User> | undefined): Promise<User[]> {
		return Promise.resolve(this.users);
	}

	override findOne(
		option: Pick<findOptions<User>, "where">,
	): Promise<User | null> {
		return Promise.resolve(
			this.users.find((u) => {
				if (option.where?.id) return u.id === option.where.id;
				if (option.where?.email) return u.email === option.where.email;
				if (option.where?.name) return u.name === option.where.name;
				else return false;
			}) || null,
		);
	}

	override create(data: User): Promise<User> {
		this.users.push(data);

		return Promise.resolve(data);
	}

	override update(data: User): Promise<User> {
		return Promise.resolve(data);
	}

	override delete(data: User): Promise<void> {
		this.users.splice(this.users.indexOf(data), 1);

		return Promise.resolve();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	override count(_?: Pick<findOptions<User>, "where">): Promise<number> {
		return Promise.resolve(0);
	}

	clear(): void {
		this.users.splice(0, this.users.length);
	}
}
