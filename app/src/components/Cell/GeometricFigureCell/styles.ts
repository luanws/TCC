import { Image, TouchableOpacity, View } from "react-native"
import { styled } from "../../../hooks/theme"

export const Container = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    padding: 16px 24px;
`

export const Space = styled(View)`
    width: 32px;
`

export const ImageStyled = styled(Image)`
    width: 80px;
    height: 80px;
    border-radius: 8px;
`

export const CategoryImage = styled(Image)`
    width: 32px;
    height: 32px;
`