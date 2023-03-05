import { Dimensions, Text, TouchableOpacity, View } from "react-native"
import { styled } from "../../../hooks/theme"

const numberOfColumns = 3
const padding = 12
const width = Dimensions.get("window").width
const itemSize = width / numberOfColumns - padding * 2 / numberOfColumns

export const Container = styled(View)`
    background-color: ${({ theme }) => theme.colors.background};
    border-color: ${({ theme }) => theme.colors.background};
    align-items: center;
    justify-content: center;
    height: ${itemSize}px;
    width: ${itemSize}px;
    padding: 4px;
`

export const Button = styled(TouchableOpacity)`
    flex: 1;
    width: 100%;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.containerBackground};
    align-items: center;
    justify-content: center;
    padding: 8px;
`

export const TitleText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
    text-align: center;
    margin-top: 4px;
    font-weight: 500;
`