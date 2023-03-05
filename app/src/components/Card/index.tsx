import React, { PropsWithChildren } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { StyledComponentBase } from 'styled-components'
import { useTheme } from '../../hooks/theme'
import Icon from '../Icon'
import styles, { CardComponents, Container, ContainerIcon, ContainerTitle, Content, Header, Title } from './styles'

interface Props extends PropsWithChildren {
  title?: string
  icon?: string
  hide?: boolean
  onPress?: () => void
}

interface CardType extends React.FC<Props> {
  Content: StyledComponentBase<typeof View, any, {}>
  Text: StyledComponentBase<typeof Text, any, {}>
  Button: StyledComponentBase<typeof TouchableOpacity, any, {}>
  ButtonText: StyledComponentBase<typeof Text, any, {}>
}

const Card: CardType = (props: Props) => {
  const { hide, icon, title, onPress, children } = props
  const theme = useTheme()

  if (hide) return null

  return (
    <Container
      style={styles.container}
      activeOpacity={0.9}
      onPress={onPress}
    >
      {title && (
        <Header>
          <ContainerTitle>
            {icon && (
              <ContainerIcon>
                <Icon
                  icon={icon}
                  color={theme.colors.card.title}
                />
              </ContainerIcon>
            )}
            <Title>{title}</Title>
          </ContainerTitle>
        </Header>
      )}
      <Content>
        {children}
      </Content>
    </Container>
  )
}

Card.Content = CardComponents.Content
Card.Text = CardComponents.Text
Card.Button = CardComponents.Button
Card.ButtonText = CardComponents.ButtonText

export default Card