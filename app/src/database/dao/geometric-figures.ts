import { GeometricFigure, GeometricFigureWithImage } from "../../models/geometric-figure"
import { db } from "../connection"

export namespace GeometricFigureDAO {
    export async function create(geometricFigure: GeometricFigureWithImage): Promise<void> {
        const { type, filename } = geometricFigure
        const isFailed = geometricFigure.isFailed ? 1 : 0
        return new Promise<void>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(`
                    INSERT INTO geometric_figures (type, is_failed, image_uri) VALUES (?, ?, ?);
                `, [type, isFailed, filename])
            }, reject, resolve)
        })
    }

    export async function getAll(): Promise<GeometricFigureWithImage[]> {
        return new Promise<GeometricFigureWithImage[]>((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(`
                    SELECT * FROM geometric_figures;
                `, [], (_, { rows: { _array } }) => {
                    const geometricFigures = _array.map(row => {
                        const { type, is_failed, image_uri } = row
                        const isFailed = is_failed === 1
                        return { type, isFailed, filename: image_uri }
                    })
                    resolve(geometricFigures)
                })
            }, reject)
        })
    }
}