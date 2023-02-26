import { Text, View } from "react-native"
import { styled } from "../../hooks/theme"

export const Container = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
`

interface LabelTextProps {
    enabled: boolean
}

export const LabelText = styled(Text) <LabelTextProps>`
    font-size: 16px;
    color: ${({ enabled, theme }) => enabled ? theme.colors.accentLight : theme.colors.disabled};
`