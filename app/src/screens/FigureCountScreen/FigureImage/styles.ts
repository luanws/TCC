import { Image, View } from "react-native"
import Icon from "../../../components/Icon"
import { styled } from "../../../hooks/theme"

export const Container = styled(View)`
    background-color: ${({ theme }) => theme.colors.containerBackground};
    padding: 8px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    margin: 4px;
`

export const ButtonIcon = styled(Icon)`
    color: #00b800;
`

export const ButtonImage = styled(Image)`
    width: 40px;
    height: 40px;
`