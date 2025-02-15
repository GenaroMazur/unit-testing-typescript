export default class User {
	id: number;
	name: string;
	email: string;
	password: string;

	static builder(): UserBuilder {
		return new UserBuilder();
	}

	constructor();
	constructor(id: number, name: string, email: string, password: string);
	constructor(id?: number, name?: string, email?: string, password?: string) {
		if (typeof id !== "undefined") this.id = id;
		if (typeof name !== "undefined") this.name = name;
		if (typeof email !== "undefined") this.email = email;
		if (typeof password !== "undefined") this.password = password;
	}
}

class UserBuilder {
	private readonly user: User;

	constructor() {
		this.user = new User(0, "", "", "");
	}

	withId(id: number): UserBuilder {
		this.user.id = id;
		return this;
	}

	withName(name: string): UserBuilder {
		this.user.name = name;
		return this;
	}

	withEmail(email: string): UserBuilder {
		this.user.email = email;
		return this;
	}

	withPassword(password: string): UserBuilder {
		this.user.password = password;
		return this;
	}

	build(): User {
		return this.user;
	}
}
