import { Camera } from 'expo-camera'
import { CameraType } from 'expo-camera/build/Camera.types'
import React, { useEffect } from 'react'
import Button from './Button'
import { BottomBar, BottomBarRow, CameraContainer, CameraStyled, Container } from './styles'

interface Props {
}

const CreateDatasetScreen: React.FC<Props> = (props) => {
  const [permission, requestPermission] = Camera.useCameraPermissions()

  useEffect(() => {
    requestPermission()
  }, [])

  return (
    <Container>
      <CameraStyled type={CameraType.back}>
        <CameraContainer>
          <BottomBar>
            <BottomBarRow>
              <Button image={require('../../assets/img/shapes/square.png')} />
              <Button image={require('../../assets/img/shapes/triangle.png')} />
              <Button image={require('../../assets/img/shapes/circle.png')} />
              <Button image={require('../../assets/img/shapes/failed-square.png')} />
              <Button image={require('../../assets/img/shapes/failed-triangle.png')} />
              <Button image={require('../../assets/img/shapes/failed-circle.png')} />
            </BottomBarRow>
          </BottomBar>
        </CameraContainer>
      </CameraStyled>
    </Container>
  )
}

export default CreateDatasetScreen