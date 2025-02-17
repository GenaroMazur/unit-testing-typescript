import UserOutDto from "../../../../../src/modules/user/application/dto/User.out.dto";
import User from "../../../../../src/modules/user/domain/User";

describe("UserOutDto", () => {
	it("Debe ser UserOutDto", () => {
		const user = User.builder().withPassword("test").build();
		user.id = 0;

		const userOutDto = new UserOutDto(user);

		expect(userOutDto).toBeInstanceOf(UserOutDto);
		expect(userOutDto.createAt).toBeInstanceOf(Date);
		expect(userOutDto.updateAt).toBeInstanceOf(Date);
		expect(userOutDto.id).toBe(0);
		expect(userOutDto.name).toBe("");
		expect(userOutDto.email).toBe("");
		expect(userOutDto.deleteAt).toBeNull();
	});

	it("Debe devolver un primitivo", () => {
		const user = User.builder().withPassword("test").build();
		user.id = 0;

		const userOutDto = new UserOutDto(user);

		expect(userOutDto.getPrimitive()).toStrictEqual({
			id: 0,
			name: "",
			email: "",
			deleteAt: null,
			createAt: userOutDto.createAt,
			updateAt: userOutDto.updateAt,
		});
	});

	it("No debe devolver la contraseña", () => {
		const userOutDto = new UserOutDto(
			User.builder().withPassword("test").build(),
		);

		// @ts-ignore
		expect(userOutDto.password).toBeUndefined();
	});
});
