import { Dimensions, Image, ScrollView, Text, View, TouchableOpacity } from "react-native"
import { styled } from "../../hooks/theme"

const { width } = Dimensions.get("window")
const imagePadding = 0

export const Scroll = styled(ScrollView)`
`

export const Container = styled(View)`
    align-items: center;
    padding: 0px 16px;
`

export const Space = styled(View)`
    height: 16px;
`

export const ImageStyled = styled(Image)`
    width: ${width - imagePadding}px;
    height: ${width - imagePadding}px;
`

export const CategoryImage = styled(Image)`
    width: 32px;
    height: 32px;
`

export const JSONContainer = styled(View)`
    background-color: ${({ theme }) => theme.colors.containerBackground};
    padding: 16px 24px;
    border-radius: 8px;
    width: 100%;
`

export const JSONText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
    font-size: 16px;
`

export const DeleteButton = styled(TouchableOpacity)`
    background-color: ${({ theme }) => theme.colors.danger};
    padding: 16px 24px;
    border-radius: 8px;
    width: 100%;
    align-items: center;
`

export const DeleteButtonText = styled(Text)`
    color: white;
    font-size: 18px;
    font-weight: bold;
`