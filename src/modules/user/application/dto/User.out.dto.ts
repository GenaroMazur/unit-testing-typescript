import User from "../../domain/User";

export default class UserOutDto implements Omit<User, "password"> {
	constructor(
		private readonly user: Omit<User, "password"> & { password?: string },
	) {}

	getPrimitive(): Omit<User, "password"> {
		const response = { ...this.user };
		delete response["password"];

		return response;
	}

	get id(): number {
		return this.user.id;
	}

	get name(): string {
		return this.user.name;
	}

	get email(): string {
		return this.user.email;
	}

	get deleteAt(): Date | null {
		return this.user.deleteAt;
	}

	get createAt(): Date {
		return this.user.createAt;
	}

	get updateAt(): Date {
		return this.user.updateAt;
	}
}
