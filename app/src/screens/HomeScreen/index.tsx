import { NavigationProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { AppStackParamList } from '../../routes/app.routes'
import NavigateButton from './NavigateButton'
import { Container, NavigateButtonsContainer, Scroll } from './styles'

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  return (
    <Scroll>
      <Container>
        <NavigateButtonsContainer>
          <NavigateButton
            icon='FontAwesome/camera'
            title='Criação do dataset'
            onPress={() => navigation.navigate('CreateDataset')}
          />
          <NavigateButton
            icon='FontAwesome/database'
            title='Visualização do dataset'
            onPress={() => navigation.navigate('ShowDataset')}
          />
          <NavigateButton
            icon='FontAwesome/download'
            title='Exportação do dataset'
            onPress={() => navigation.navigate('ExportDataset')}
          />
          <NavigateButton
            icon='MaterialCommunityIcons/auto-fix'
            title='Corrigir dataset'
            onPress={() => navigation.navigate('DatasetFix')}
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