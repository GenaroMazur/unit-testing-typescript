import { EncoderInterface } from "../../../../src/modules/user/encoder/interface/Encoder.interface";
import { compareSync, hashSync } from "bcrypt";

export default class BcryptEncoderApplicationMock implements EncoderInterface {
	encode(password: string): Promise<string> {
		return Promise.resolve(hashSync(password, 10));
	}

	compare(plainText: string, hash: string): Promise<boolean> {
		return Promise.resolve(compareSync(plainText, hash));
	}
}
