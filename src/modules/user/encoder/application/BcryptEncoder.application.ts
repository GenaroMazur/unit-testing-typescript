import { EncoderInterface } from "../interface/Encoder.interface";
import { compare, hash } from "bcrypt";

export default class BcryptEncoderApplication implements EncoderInterface {
	constructor(private readonly SALT: number) {}

	encode(password: string): Promise<string> {
		return new Promise((r, j) => {
			hash(password, this.SALT, (err, hash) => {
				if (err) return j(err);
				r(hash);
			});
		});
	}

	compare(plainText: string, hash: string): Promise<boolean> {
		return new Promise((r, j) => {
			compare(plainText, hash, (err, same) => {
				if (err) return j(err);
				r(same);
			});
		});
	}
}
