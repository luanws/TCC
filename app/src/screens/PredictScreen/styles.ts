import { FontAwesome } from '@expo/vector-icons'
import { Camera } from "expo-camera"
import { Dimensions, TouchableOpacity, View } from "react-native"
import { styled } from "../../hooks/theme"

const { width, height } = Dimensions.get("window")
const size = width < height ? width : height

export const Container = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 32px;
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

export const TakePictureButton = styled(TouchableOpacity)`
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 20px;
    border-radius: 1000px;
`

export const TakePictureButtonIcon = styled(FontAwesome)`
    color: ${({ theme }) => theme.colors.icon};
    font-size: 24px;
`

export const SwitchLabelContainer = styled(View)`
    padding: 0px 16px;
`