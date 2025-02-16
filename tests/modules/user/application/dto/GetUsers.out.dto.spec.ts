import GetAllUserOutDto from "../../../../../src/modules/user/application/dto/GetAllUser.out.dto";
import UserOutDto from "../../../../../src/modules/user/application/dto/User.out.dto";
import User from "../../../../../src/modules/user/domain/User";

describe("GetAllUserOutDto", () => {
	it("Debe ser GetAllUserOutDto", () => {
		const getAllUserOutDto = new GetAllUserOutDto({
			count: 0,
			limit: 10,
			page: 1,
			users: [],
		});

		expect(getAllUserOutDto).toBeInstanceOf(GetAllUserOutDto);
	});

	it("Debe devolver el primitivo", () => {
		const getAllUserOutDto = new GetAllUserOutDto({
			count: 0,
			limit: 10,
			page: 1,
			users: [],
		});

		expect(getAllUserOutDto.getPrimitive()).toStrictEqual({
			count: 0,
			limit: 10,
			page: 1,
			users: [],
		});
	});

	it("Debe tener un atributo limit", () => {
		const getAllUserOutDto = new GetAllUserOutDto({
			count: 0,
			limit: 10,
			page: 1,
			users: [],
		});

		expect(getAllUserOutDto.limit).toBe(10);
	});

	it("Debe tener un atributo page", () => {
		const getAllUserOutDto = new GetAllUserOutDto({
			count: 0,
			limit: 10,
			page: 1,
			users: [],
		});

		expect(getAllUserOutDto.page).toBe(1);
	});

	it("Debe tener el atributo count", () => {
		const getAllUserOutDto = new GetAllUserOutDto({
			count: 0,
			limit: 10,
			page: 1,
			users: [],
		});

		expect(getAllUserOutDto.count).toBe(0);
	});

	it("Debe tener el atributo users", () => {
		const getAllUserOutDto = new GetAllUserOutDto({
			count: 0,
			limit: 10,
			page: 1,
			users: [],
		});

		expect(Array.isArray(getAllUserOutDto.users)).toBeTruthy();
		expect(getAllUserOutDto.users).toHaveLength(0);
	});

	it("Los usuarios deben convertirse en primitivos", () => {
		const getAllUserOutDto = new GetAllUserOutDto({
			count: 0,
			limit: 10,
			page: 1,
			users: [],
		});
		getAllUserOutDto.users.push(
			new UserOutDto(User.builder().withPassword("test").build()),
		);

		expect(getAllUserOutDto.getPrimitive().users).toHaveLength(1);
		expect(
			// @ts-ignore
			getAllUserOutDto.getPrimitive().users[0]!.password,
		).toBeUndefined();
	});
});
