import { Camera } from "expo-camera"
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { styled } from "../../hooks/theme"

import { Entypo } from '@expo/vector-icons'
const { width, height } = Dimensions.get("window")
const size = width < height ? width : height

export const Container = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: center;
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

export const PlayButton = styled(TouchableOpacity)`
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 20px;
    border-radius: 1000px;
`

export const PlayButtonIcon = styled(Entypo)`
    color: ${({ theme }) => theme.colors.icon};
    font-size: 24px;
`

export const SwitchLabelContainer = styled(View)`
    padding: 0px 16px;
`

export const InfoText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
    margin-bottom: 8px;
`

export const PredictionImagesScroll = styled(ScrollView)`
    flex-grow: 0;
`

export const PredictionImagesContainer = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
    padding: 16px;
`

export const PredictionImage = styled(Image)`
    width: 24px;
    height: 24px;
`

export const BottomContainer = styled(View)`
    margin-bottom: 16px;
    align-items: center;
    justify-content: center;
`