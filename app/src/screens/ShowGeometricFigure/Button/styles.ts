import { Image, TouchableOpacity } from "react-native"
import { styled } from "../../../hooks/theme"

interface ContainerProps {
    selected: boolean
}

export const Container = styled(TouchableOpacity) <ContainerProps>`
    background-color: white;
    opacity: ${({ selected }) => selected ? 1 : 0.1};
    padding: 8px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    margin: 4px;
`

export const ButtonImage = styled(Image)`
    width: 32px;
    height: 32px;
`