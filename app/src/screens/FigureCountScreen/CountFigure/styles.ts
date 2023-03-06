import { Text, View } from "react-native"
import { styled } from "../../../hooks/theme"

export const Container = styled(View)`
    flex-direction: row;
    align-items: center;
    padding: 16px;
`

export const CountContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    align-items: center;
    margin-left: 16px;
`

export const CountText = styled(Text)`
    font-size: 40px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text1};
`