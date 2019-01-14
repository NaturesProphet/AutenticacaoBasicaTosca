const DB_HOST = '127.0.0.1';
const DB_PORT: number = 5432;
const DB_USERNAME = 'julius';
const DB_PASSWORD = 'julius';
const DB_SCHEMA = 'julius';
const ORM_SYNC = true;

export class DbConfig {
    constructor(
        readonly type: 'postgres' = 'postgres',
        readonly host: string = DB_HOST,
        readonly port: number = DB_PORT,
        readonly login: string = DB_USERNAME,
        readonly password = DB_PASSWORD,
        readonly schema = DB_SCHEMA,
        readonly sync = ORM_SYNC,
    ) { }
}
