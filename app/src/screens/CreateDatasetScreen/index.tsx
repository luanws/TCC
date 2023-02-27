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
              <Button icon='MaterialCommunityIcons/square' />
              <Button icon='MaterialCommunityIcons/triangle' />
              <Button icon='MaterialCommunityIcons/checkbox-blank-circle' />
              <Button icon='MaterialCommunityIcons/square' />
              <Button icon='MaterialCommunityIcons/triangle' />
              <Button icon='MaterialCommunityIcons/checkbox-blank-circle' />
            </BottomBarRow>
          </BottomBar>
        </CameraContainer>
      </CameraStyled>
    </Container>
  )
}

export default CreateDatasetScreen