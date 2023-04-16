import { Camera, CameraType, FlashMode } from 'expo-camera'
import React, { useEffect, useRef } from 'react'
import { Alert } from 'react-native'
import SwitchLabel from '../../components/SwitchLabel'
import usePersistedState from '../../hooks/persisted-state'
import { GeometricFigureService } from '../../services/geometric-figure'
import { CameraContainer, CameraStyled, Container, SwitchLabelContainer, TakePictureButton, TakePictureButtonIcon } from './styles'

interface Props {
}

const PredictScreen: React.FC<Props> = (props) => {
  const cameraRef = useRef<Camera>(null)

  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [flashMode, setFlashMode] = usePersistedState<FlashMode>('flash-mode', FlashMode.off)

  useEffect(() => {
    requestPermission()
  }, [])


  async function handleTakePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
      })
      const category = await GeometricFigureService.predictImage(photo.uri)
      Alert.alert('Predicted category', category)
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
      <SwitchLabelContainer>
        <SwitchLabel
          label='Flash'
          value={flashMode === FlashMode.on}
          onChange={value => setFlashMode(value ? FlashMode.on : FlashMode.off)}
        />
      </SwitchLabelContainer>
      <TakePictureButton activeOpacity={0.7} onPress={handleTakePicture}>
        <TakePictureButtonIcon name='camera' />
      </TakePictureButton>
    </Container>
  )
}

export default PredictScreen