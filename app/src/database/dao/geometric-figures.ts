import { GeometricFigure, NewGeometricFigure } from "../../models/geometric-figure"
import { db } from "../connection"

export namespace GeometricFigureDAO {
    export async function create(newGeometricFigure: NewGeometricFigure, filename: string): Promise<void> {
        const { type } = newGeometricFigure
        const isFailed = newGeometricFigure.isFailed ? 1 : 0
        return new Promise<void>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(`
                    INSERT INTO geometric_figures (type, is_failed, image_uri) VALUES (?, ?, ?);
                `, [type, isFailed, filename])
            }, reject, resolve)
        })
    }

    export async function createMany(geometricFigures: GeometricFigure[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            db.transaction(tx => {
                geometricFigures.forEach(geometricFigure => {
                    const { type, isFailed, filename } = geometricFigure
                    const isFailedInt = isFailed ? 1 : 0
                    tx.executeSql(`
                        INSERT INTO geometric_figures (id, type, is_failed, image_uri) VALUES (?, ?, ?, ?);
                    `, [geometricFigure.id, type, isFailedInt, filename])
                })
            }, reject, resolve)
        })
    }

    export async function getAll(): Promise<GeometricFigure[]> {
        return new Promise<GeometricFigure[]>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(`
                    SELECT * FROM geometric_figures;
                `, [], (_, { rows: { _array } }) => {
                    const geometricFigures = _array.map(row => {
                        const { type, is_failed, image_uri, id } = row
                        const isFailed = is_failed === 1
                        return { type, isFailed, filename: image_uri, id }
                    })
                    resolve(geometricFigures)
                })
            }, reject)
        })
    }

    export async function getGeometricFigureByFilename(filename: string): Promise<GeometricFigure> {
        return new Promise<GeometricFigure>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(`
                    SELECT * FROM geometric_figures WHERE image_uri = ?;
                `, [filename], (_, { rows: { _array } }) => {
                    const row = _array[0]
                    const { type, is_failed, image_uri, id } = row
                    const isFailed = is_failed === 1
                    const geometricFigure = { type, isFailed, filename: image_uri, id }
                    resolve(geometricFigure)
                })
            }, reject)
        })
    }

    export async function deleteGeometricFigure(geometricFigureId: number) {
        return new Promise<void>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(`
                    DELETE FROM geometric_figures WHERE id = ?;
                `, [geometricFigureId])
            }, reject, resolve)
        })
    }

    export async function deleteGeometricFigures(geometricFigureIds: number[]) {
        return new Promise<void>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(`
                    DELETE FROM geometric_figures WHERE id IN (${geometricFigureIds.join(',')});
                `)
            }, reject, resolve)
        })
    }

    export async function deleteAllGeometricFigures() {
        return new Promise<void>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(`
                    DELETE FROM geometric_figures;
                `)
            }, reject, resolve)
        })
    }
}