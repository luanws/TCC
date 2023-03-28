import { Camera, FlashMode } from 'expo-camera'
import { CameraType } from 'expo-camera/build/Camera.types'
import React, { useEffect, useRef } from 'react'
import { ToastAndroid } from 'react-native'
import SwitchLabel from '../../components/SwitchLabel'
import usePersistedState from '../../hooks/persisted-state'
import { NewGeometricFigure } from '../../models/geometric-figure'
import { GeometricFigureService } from '../../services/geometric-figure'
import Button from './Button'
import { BottomBar, BottomBarRow, BottomContainer, CameraContainer, CameraStyled, Container, SwitchLabelContainer } from './styles'

const CreateDatasetScreen: React.FC = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions()

  const cameraRef = useRef<Camera>(null)

  const [flashMode, setFlashMode] = usePersistedState<FlashMode>('flash-mode', FlashMode.off)

  useEffect(() => {
    requestPermission()
  }, [])

  async function handleTakePicture(geometricFigure: NewGeometricFigure) {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 1 })
      await GeometricFigureService.createGeometricFigure(geometricFigure, photo.uri)
      ToastAndroid.show('Imagem salva com sucesso!', ToastAndroid.SHORT)
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
      <BottomContainer>
        <BottomBar>
          <SwitchLabelContainer>
            <SwitchLabel
              label='Flash'
              value={flashMode === FlashMode.on}
              onChange={value => setFlashMode(value ? FlashMode.on : FlashMode.off)}
            />
          </SwitchLabelContainer>
          <BottomBarRow>
            <Button
              image={require('../../assets/img/shapes/square.png')}
              onPress={() => handleTakePicture({ type: 'square', isFailed: false })}
            />
            <Button
              image={require('../../assets/img/shapes/triangle.png')}
              onPress={() => handleTakePicture({ type: 'triangle', isFailed: false })}
            />
            <Button
              image={require('../../assets/img/shapes/circle.png')}
              onPress={() => handleTakePicture({ type: 'circle', isFailed: false })}
            />
          </BottomBarRow>
          <BottomBarRow>
            <Button
              image={require('../../assets/img/shapes/failed-square.png')}
              onPress={() => handleTakePicture({ type: 'square', isFailed: true })}
            />
            <Button
              image={require('../../assets/img/shapes/failed-triangle.png')}
              onPress={() => handleTakePicture({ type: 'triangle', isFailed: true })}
            />
            <Button
              image={require('../../assets/img/shapes/failed-circle.png')}
              onPress={() => handleTakePicture({ type: 'circle', isFailed: true })}
            />
          </BottomBarRow>
        </BottomBar>
      </BottomContainer>
    </Container>
  )
}

export default CreateDatasetScreen