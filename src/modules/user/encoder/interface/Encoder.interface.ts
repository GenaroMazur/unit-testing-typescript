export interface EncoderInterface {
	encode(password: string): Promise<string>;

	compare(plainText: string, hash: string): Promise<boolean>;
}
