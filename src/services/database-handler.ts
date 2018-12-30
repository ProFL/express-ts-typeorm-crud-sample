import "reflect-metadata";
import { Connection, createConnection, EntitySchema, getConnection, ObjectLiteral } from "typeorm";

export default class DatabaseHandler {
    public static getInstance(): DatabaseHandler {
        if (this.instance === null || this.instance === undefined) {
            this.instance = new DatabaseHandler();
        }

        return this.instance;
    }
    private static instance: DatabaseHandler;

    private constructor() {
        createConnection()
            .then((connection: Connection) => connection)
            .catch((error) => console.log(error));
    }

    // tslint:disable-next-line:ban-types
    public async getDeleteBuilder<T>(
        entityType: new () => T,
        entityNickname: string,
        query: string,
        idObject: ObjectLiteral,
    ) {
        try {
            return await getConnection()
                .getRepository(entityType)
                .createQueryBuilder(entityNickname)
                .delete()
                .where(query, idObject)
                .execute();
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    public async find<T>(model: EntitySchema<T>): Promise<T[]> {
        return await getConnection().manager.find(model);
    }

    public async findAll<T>(entityType: new () => T): Promise<T[]> {
        try {
            return await getConnection()
                .getRepository(entityType)
                .createQueryBuilder()
                .select()
                .execute();
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async findOne<T>(
        entityType: new () => T,
        entityNickname: string,
        query: string,
        idObject: ObjectLiteral,
    ): Promise<T | undefined> {
        try {
            return await getConnection()
                .getRepository(entityType)
                .createQueryBuilder(entityNickname)
                .where(query, idObject)
                .getOne();
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    public async save<T>(entity: T): Promise<T> {
        return await getConnection().manager.save(entity);
    }
}
