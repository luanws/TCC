import { TextInput, View } from "react-native"
import { styled } from "../../../hooks/theme"

export const Container = styled(View)`
`

interface TextInputStyledProps {
    isFocused: boolean
}

export const TextInputStyled = styled(TextInput) <TextInputStyledProps>`
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 8px;
    border: 1px solid ${({ theme, isFocused }) => isFocused ? theme.colors.accent : theme.colors.unfocused};
    color: ${({ theme }) => theme.colors.text1};
    font-size: 16px;
    margin-bottom: 10px;
    padding: 8px 14px;
    width: 100%;
`