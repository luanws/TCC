import { Camera } from "expo-camera"
import { View } from "react-native"
import { styled } from "../../hooks/theme"

export const Container = styled(View)`
    flex: 1;
`

export const CameraStyled = styled(Camera)`
    flex: 1;
    justify-content: flex-end;
`

export const CameraContainer = styled(View)`
`

export const BottomBar = styled(View)`
    align-items: center;
    padding: 8px;
`

export const BottomBarRow = styled(View)`
    flex-direction: row;
    justify-content: space-between;
`