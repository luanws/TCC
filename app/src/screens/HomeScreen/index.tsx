import { NavigationProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { AppStackParamList } from '../../routes/app.routes'
import NavigateButton from './NavigateButton'
import { Container, NavigateButtonsContainer, Scroll } from './styles'

interface Props {
}

const HomeScreen: React.FC<Props> = (props) => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  return (
    <Scroll>
      <Container>
        <NavigateButtonsContainer>
          <NavigateButton
            icon='FontAwesome/camera'
            title='Criação do dataset'
          />
          <NavigateButton
            icon='FontAwesome/database'
            title='Visualização do dataset'
          />
          <NavigateButton
            icon='MaterialIcons/settings'
            title='Configurações'
            onPress={() => navigation.navigate('Settings')}
          />
        </NavigateButtonsContainer>
      </Container>
    </Scroll>
  )
}

export default HomeScreen