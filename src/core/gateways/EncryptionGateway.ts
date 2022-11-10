export interface EncryptionGateway {
    encrypt(password: string): string;
    match(password: string, userHashedPassword: string): Promise<boolean>;
}