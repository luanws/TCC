import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { styled } from "../../hooks/theme"

export const Container = styled(TouchableOpacity)`
    margin: 8px 1px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.card.background};
`

export const Content = styled(View)`
    padding: 16px;
    padding-top: 8px;
`

export const Title = styled(Text)`
    font-weight: bold;
    color: ${({ theme }) => theme.colors.card.title};
`

export const ContainerTitle = styled(View)`
    flex-direction: row;
    align-items: center;
    padding: 16px;
`

export const Header = styled(View)`
    border-bottom-color: ${({ theme }) => theme.colors.card.divider};
    border-bottom-width: 1px;
    margin-bottom: 8px;
`

export const ContainerIcon = styled(View)`
    margin-right: 8px;
`

const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 1,
    },
})

export const CardComponents = {
    Content: styled(View)`
        margin-bottom: -8px;
    `,
    Text: styled(Text)`
        color: ${({ theme }) => theme.colors.card.text};
        margin-bottom: 8px
    `,
    Button: styled(TouchableOpacity)`
        background-color: ${({ theme }) => theme.colors.card.button};
        padding: 16px;
        border-radius: 5px;
        margin: 8px 0px;
    `,
    ButtonText: styled(Text)`
        color: ${({ theme }) => theme.colors.card.buttonText};
        font-size: 14px;
        text-transform: uppercase;
        text-align: center;
        font-weight: bold;
    `,
}


export default styles