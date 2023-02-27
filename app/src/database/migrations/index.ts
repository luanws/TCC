import { createGeometricFigureTable } from "./create-geometric-figure-table"

export interface Migration {
    name: string
    up: () => Promise<void>
    down: () => Promise<void>
}

export async function runMigrations() {
    for (const migration of migrations) {
        await migration.up()
        console.log(`${migration.name} migration completed`)
    }
}

export async function rollbackMigrations() {
    for (const migration of migrations.reverse()) {
        await migration.down()
        console.log(`${migration.name} rollback completed`)
    }
}

const migrations: Migration[] = [
    createGeometricFigureTable
]
