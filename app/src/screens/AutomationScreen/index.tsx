import { Camera, CameraType, FlashMode } from 'expo-camera'
import React, { useEffect, useRef, useState } from 'react'
import { Alert } from 'react-native'
import SwitchLabel from '../../components/SwitchLabel'
import usePersistedState from '../../hooks/persisted-state'
import { BeltStatus } from '../../models/belt'
import { GeometricFigureCategory } from '../../models/geometric-figure'
import { BeltService } from '../../services/belt'
import { GeometricFigureService } from '../../services/geometric-figure'
import { ImageUtils } from '../../utils/image'
import { CameraContainer, CameraStyled, Container, InfoText, PlayButton, PlayButtonIcon, SwitchLabelContainer } from './styles'

interface Props {
}

const AUTOMATION_INTERVAL = 3 * 1000
const MARGIN_SIZE = 0.25
let isWithinMargin = false
let predictions: GeometricFigureCategory[] = []

const AutomationScreen: React.FC<Props> = (props) => {
  const cameraRef = useRef<Camera>(null)

  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [flashMode, setFlashMode] = usePersistedState<FlashMode>('flash-mode', FlashMode.off)
  const [isAutomationEnabled, setIsAutomationEnabled] = useState<boolean>(false)
  const [_predictions, setPredictions] = useState<GeometricFigureCategory[]>([])
  const [infoText, setInfoText] = useState<string>('')

  useEffect(() => {
    BeltService.setBeltStatus({
      mainMotor: true,
      servoMotor1: false,
      servoMotor2: false,
      servoMotor3: false,
    })
  }, [])

  useEffect(() => {
    requestPermission()
  }, [])

  useEffect(() => {
    if (permission?.granted && isAutomationEnabled) {
      const interval = setInterval(runAutomation, AUTOMATION_INTERVAL)
      return () => clearInterval(interval!)
    }
  }, [permission, isAutomationEnabled])

  useEffect(() => {
    predictions = _predictions
    console.log('predictions', predictions)
  }, [_predictions])

  useEffect(() => {
    if (!isAutomationEnabled) {
      setPredictions([])
    }
  }, [isAutomationEnabled])

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
      })
      const resizedPhoto = await ImageUtils.resizeImage(photo.uri, 128, 128)
      return resizedPhoto
    }
  }

  async function onPredictGeometricFigure(prediction: GeometricFigureCategory, predictions: GeometricFigureCategory[]) {
    Alert.alert('Geometric figure detected', prediction + '\n\n' + JSON.stringify(predictions))
    const beltServoMotorStatus = BeltService.getBeltServoMotorStatus(prediction)
    const beltStatus: BeltStatus = {
      ...beltServoMotorStatus,
      mainMotor: true,
    }
    await BeltService.setBeltStatus(beltStatus)
  }

  async function onEnterMargin(prediction: GeometricFigureCategory) {
    isWithinMargin = true
    setPredictions(predictions => [...predictions, prediction])
  }

  async function onExitMargin() {
    if (isWithinMargin) {
      isWithinMargin = false
      if (predictions.length === 0) return
      const prediction = predictions.reduce((prev, current) => {
        const prevCount = predictions.filter(p => p === prev).length
        const currentCount = predictions.filter(p => p === current).length
        return (prevCount > currentCount) ? prev : current
      }, predictions[0])
      await onPredictGeometricFigure(prediction, predictions)
      setPredictions([])
    }
  }

  async function runAutomation() {
    const picture = await takePicture()
    if (picture) {
      const geometricFigureInfo = await GeometricFigureService.getGeometricFigureInfo(picture.uri)
      const { bottomDistance, topDistance, containsGeometricFigure, category } = geometricFigureInfo
      setInfoText(`${(bottomDistance * 100).toFixed(0)}% - ${(topDistance * 100).toFixed(0)}%`)
      const newIsWithinMargin = bottomDistance > MARGIN_SIZE && topDistance > MARGIN_SIZE
      if (containsGeometricFigure && newIsWithinMargin) {
        onEnterMargin(category)
      } else {
        onExitMargin()
      }
    }
  }

  return (
    <Container>
      <CameraContainer>
        <CameraStyled
          ref={cameraRef}
          type={CameraType.back}
          ratio='1:1'
          flashMode={flashMode}
        />
      </CameraContainer>
      <InfoText>{infoText}</InfoText>
      <SwitchLabelContainer>
        <SwitchLabel
          label='Flash'
          value={flashMode === FlashMode.on}
          onChange={value => setFlashMode(value ? FlashMode.on : FlashMode.off)}
        />
      </SwitchLabelContainer>
      <PlayButton onPress={() => setIsAutomationEnabled(!isAutomationEnabled)}>
        {isAutomationEnabled ? <PlayButtonIcon name='controller-stop' /> : <PlayButtonIcon name='controller-play' />}
      </PlayButton>
    </Container>
  )
}

export default AutomationScreen