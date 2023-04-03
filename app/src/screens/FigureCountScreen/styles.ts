import { ScrollView, Text, View } from "react-native"
import { styled } from "../../hooks/theme"

export const Scroll = styled(ScrollView)`
`

export const Container = styled(View)`
`

export const TotalCountContainer = styled(View)`
    padding: 8px 24px;
    margin-top: 16px;
`

export const TotalCountText = styled(Text)`
    font-size: 16px;
    color: ${({ theme }) => theme.colors.text1};
`