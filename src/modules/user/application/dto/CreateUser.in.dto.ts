export interface CreateUserInPrimitive {
	name: string;
	email: string;
	password: string;
}

export default class CreateUserInDto implements CreateUserInPrimitive {
	constructor(private readonly primitive: CreateUserInPrimitive) {}

	toPrimitive() {
		return { ...this.primitive };
	}

	get name() {
		return this.primitive.name;
	}

	get email() {
		return this.primitive.email;
	}

	get password() {
		return this.primitive.password;
	}
}
