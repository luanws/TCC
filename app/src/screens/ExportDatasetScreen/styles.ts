import { ScrollView, TouchableOpacity, View, Text } from "react-native"
import { styled } from "../../hooks/theme"

export const Scroll = styled(ScrollView)`
`

export const Container = styled(View)`
    flex: 1;
    padding: 16px;
`

export const Button = styled(TouchableOpacity)`
    background-color: ${props => props.theme.colors.primary};
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
`

export const ButtonText = styled(Text)`
    color: white;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
`