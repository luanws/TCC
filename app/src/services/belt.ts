import * as firebaseDatabase from 'firebase/database'
import { BeltServoMotorStatus, BeltStatus } from "../models/belt"
import { GeometricFigureCategory } from '../models/geometric-figure'

export namespace BeltService {
    const beltStatusMapping: { [key in GeometricFigureCategory]: BeltServoMotorStatus } = {
        'circle': {
            servoMotor1: true,
            servoMotor2: false,
            servoMotor3: false,
        },
        'square': {
            servoMotor1: false,
            servoMotor2: true,
            servoMotor3: false,
        },
        'triangle': {
            servoMotor1: false,
            servoMotor2: false,
            servoMotor3: true,
        },
        'failed-circle': {
            servoMotor1: false,
            servoMotor2: false,
            servoMotor3: false,
        },
        'failed-square': {
            servoMotor1: false,
            servoMotor2: false,
            servoMotor3: false,
        },
        'failed-triangle': {
            servoMotor1: false,
            servoMotor2: false,
            servoMotor3: false,
        },
    }

    export async function setBeltStatus(beltStatus: BeltStatus) {
        const database = firebaseDatabase.getDatabase()
        const beltStatusRef = firebaseDatabase.ref(database, 'beltStatus')
        await firebaseDatabase.set(beltStatusRef, beltStatus)
    }

    export function getBeltServoMotorStatus(geometricFigureCategory: GeometricFigureCategory): BeltServoMotorStatus {
        return beltStatusMapping[geometricFigureCategory]
    }
}