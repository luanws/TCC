import { Camera } from "expo-camera"
import { Dimensions, View } from "react-native"
import { styled } from "../../hooks/theme"

const { width, height } = Dimensions.get("window")
const size = width < height ? width : height

export const Container = styled(View)`
    flex: 1;
`

export const CameraStyled = styled(Camera)`
    justify-content: flex-end;
    width: ${size}px;
    height: ${size}px;
`

export const CameraContainer = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: center;
`

export const BottomContainer = styled(View)`
    justify-content: flex-end;
`

export const BottomBar = styled(View)`
    align-items: center;
    padding: 8px;
`

export const BottomBarRow = styled(View)`
    flex-direction: row;
    justify-content: space-between;
`