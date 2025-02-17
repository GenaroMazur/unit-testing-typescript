import BcryptEncoderApplication from "../../../../../src/modules/user/encoder/application/BcryptEncoder.application";
import { compareSync, hashSync } from "bcrypt";

describe("BcryptEncoder", () => {
	let bcryptEncoderApplication!: BcryptEncoderApplication;

	it("Se debe poder instanciar con el parametro SALT", () => {
		const SALT = 10;

		const bcryptEncoderApplication = new BcryptEncoderApplication(SALT);

		expect(bcryptEncoderApplication).toBeInstanceOf(BcryptEncoderApplication);
	});

	beforeEach(() => {
		const SALT = 10;
		bcryptEncoderApplication = new BcryptEncoderApplication(SALT);
	});

	it("Debe hashear las contraseñas con bcrypt", async () => {
		const password = "abcd1234";

		const hash = await bcryptEncoderApplication.encode(password);

		expect(hash).toBeDefined();
		expect(hash).not.toBe(password);

		expect(compareSync(password, hash)).toBe(true);
	});

	it("Debe comparar las contraseñas con bcrypt", async () => {
		const password = "abcd1234";
		const hash = hashSync(password, 10);

		const compare = await bcryptEncoderApplication.compare(password, hash);

		expect(compare).toBe(true);
	});
});
