import { Dimensions, TouchableOpacity, View } from 'react-native'
import { styled } from '../../hooks/theme'

const windowWidth = Dimensions.get('window').width
const defaultMargin = 16
const defaultSize = 60

interface ContainerProps {
    position: 'left' | 'right' | 'center'
    size?: number
    margin?: number
}

export const Container = styled(View) <ContainerProps>`
    position: absolute;
    background-color: blue;
    align-items: flex-end;
    justify-content: flex-end;
    border-radius: 1000px;
    z-index: 100;
    bottom: ${({ margin }) => margin || defaultMargin}px;
    ${({ position, size, margin }) => {
        const positionStyle = {
            left: {
                left: `${margin || defaultMargin}px`,
            },
            right: {
                right: `${margin || defaultMargin}px`,
            },
            center: {
                left: `${windowWidth / 2 - (size || defaultSize) / 2}px`,
            },
        }
        return positionStyle[position]
    }}
`

interface ButtonProps {
    size?: number
    backgroundColor?: string
}

export const Button = styled(TouchableOpacity) <ButtonProps>`
    background-color: ${({ theme, backgroundColor }) => backgroundColor || theme.colors.accent};
    border-radius: 1000px;
    align-items: center;
    justify-content: center;
    z-index: 100;
    width: ${({ size }) => (size || defaultSize)}px;
    height: ${({ size }) => (size || defaultSize)}px;
`