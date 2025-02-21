import User from "../../../../src/modules/user/domain/User";

describe("User Entity", () => {
	describe("Instanciar usuario por constructor", () => {
		it("Con argumentos", () => {
			// Arrange
			const name = "John Doe";
			const email = "jhondoe@gmail.com";
			const password = "123456";

			// Act
			const user = new User(name, email, password);

			// Assert
			expect(user.name).toBe(name);
			expect(user.email).toBe(email);
			expect(user.password).toBe(password);
			expect(user.deleteAt).toBeNull();
			expect(user.createAt).toBeInstanceOf(Date);
			expect(user.updateAt).toBeInstanceOf(Date);
		});

		it("Sin argumentos", () => {
			// Act
			const user = new User();

			// Assert
			expect(user.name).toBeUndefined();
			expect(user.email).toBeUndefined();
			expect(user.password).toBeUndefined();
			expect(user.deleteAt).toBeNull();
			expect(user.createAt).toBeInstanceOf(Date);
			expect(user.updateAt).toBeInstanceOf(Date);
		});
	});

	describe("Instanciar usuario por builder", () => {
		it("Con argumentos", () => {
			// Arrange
			const name = "John Doe";
			const email = "jhondoe@gmail.com";
			const password = "123456";

			// Act
			const user = User.builder()
				.withName(name)
				.withEmail(email)
				.withPassword(password)
				.build();

			// Assert
			expect(user.name).toBe(name);
			expect(user.email).toBe(email);
			expect(user.password).toBe(password);
			expect(user.deleteAt).toBeNull();
			expect(user.createAt).toBeInstanceOf(Date);
			expect(user.updateAt).toBeInstanceOf(Date);
		});

		it("Sin argumentos", () => {
			// Act
			const user = User.builder().build();

			// Assert
			expect(user.name).toBe("");
			expect(user.email).toBe("");
			expect(user.password).toBe("");
			expect(user.deleteAt).toBeNull();
			expect(user.createAt).toBeInstanceOf(Date);
			expect(user.updateAt).toBeInstanceOf(Date);
		});
	});
});
