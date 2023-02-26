import { db } from "./connection"

export namespace DatabaseUtils {
    export async function showTables(): Promise<void> {
        try {
            await db.transaction(tx => {
                tx.executeSql('SELECT name FROM sqlite_master WHERE type="table";', [], (_, { rows }) => {
                    const tables = rows._array.map(table => table.name)
                    console.log('Tables:', tables)
                })
            })
        } catch (error) {
            console.error(error)
        }
    }

    export async function dropDatabase() {
        try {
            await db.transaction(tx => {
                tx.executeSql(
                    'SELECT name from sqlite_master where type="table;"',
                    [],
                    (_, { rows }) => {
                        rows._array.forEach(table => {
                            tx.executeSql(`DROP TABLE ${table.name}`)
                        })
                    }
                )
            })
        } catch (error) {
            console.log(error)
        }
    }
}