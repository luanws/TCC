import { Camera } from 'expo-camera'
import { CameraType } from 'expo-camera/build/Camera.types'
import * as FileSystem from 'expo-file-system'
import React, { useEffect, useRef } from 'react'
import { GeometricFigure } from '../../models/geometric-figure'
import Button from './Button'
import { BottomBar, BottomBarRow, CameraContainer, CameraStyled, Container } from './styles'

interface Props {
}

const CreateDatasetScreen: React.FC<Props> = (props) => {
  const [permission, requestPermission] = Camera.useCameraPermissions()

  const cameraRef = useRef<Camera>(null)

  useEffect(() => {
    requestPermission()
  }, [])

  async function savePicture(geometricFigure: GeometricFigure, uri: string) {
    savePictureToDownloads(uri)
  }

  async function savePictureToDownloads(uri: string) {
    const filename = new Date().getTime().toString()
    const fileUri = FileSystem.documentDirectory!! + filename
    await FileSystem.copyAsync({ from: uri, to: fileUri })
    console.debug(`Imagem salva em ${fileUri}`)
  }

  async function handleTakePicture(geometricFigure: GeometricFigure) {
    console.debug(FileSystem.documentDirectory)
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 1 })
      savePicture(geometricFigure, photo.uri)
    }
  }

  return (
    <Container>
      <CameraStyled ref={cameraRef} type={CameraType.back}>
        <CameraContainer>
          <BottomBar>
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
        </CameraContainer>
      </CameraStyled>
    </Container>
  )
}

export default CreateDatasetScreen