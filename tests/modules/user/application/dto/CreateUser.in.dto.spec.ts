import CreateUserInDto from "../../../../../src/modules/user/application/dto/CreateUser.in.dto";


describe("CreateUserInDto", () => {
	it("Debe ser una clase y se debe instanciar", () => {
		const createUserInDto = new CreateUserInDto({
			email: "",
			name: "",
			password: "",
		});

		expect(createUserInDto).toBeInstanceOf(CreateUserInDto);
	});

	it("Debe devolver un primitivo", () => {
		const createUserInDto = new CreateUserInDto({
			email: "",
			name: "",
			password: "",
		});

		const data = createUserInDto.toPrimitive();

		expect(data).toEqual({
			email: "",
			name: "",
			password: "",
		});
	});

	it("Se deben poder acceder a todos los valores", () => {
		const createUserInDto = new CreateUserInDto({
			email: "",
			name: "",
			password: "",
		});

		expect(createUserInDto.email).toBe("");
		expect(createUserInDto.name).toBe("");
		expect(createUserInDto.password).toBe("");
	});
});
