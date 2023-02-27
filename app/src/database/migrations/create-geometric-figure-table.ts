import { Migration } from "."
import { db } from "../connection"

export const createGeometricFigureTable: Migration = {
    name: 'create_geometric_figures_table',
    up: async () => {
        return new Promise<void>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(`
                    CREATE TABLE IF NOT EXISTS geometric_figures (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        type TEXT NOT NULL,
                        is_failed INTEGER NOT NULL,
                        image_uri TEXT NOT NULL
                    );
                `)
            }, reject, resolve)
        })
    },
    down: async () => {
        return new Promise<void>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql('DROP TABLE IF EXISTS geometric_figures;')
            }, reject, resolve)
        })
    }
}