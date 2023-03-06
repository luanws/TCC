import { NavigationProp, useNavigation } from '@react-navigation/native'
import React from 'react'
import { AppStackParamList } from '../../routes/app.routes'
import NavigateButton from './NavigateButton'
import { CardsContainer, NavigateButtonsContainer, Scroll } from './styles'
import UpdateCheckerCard from './UpdateCheckerCard'

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  return (
    <Scroll>
      <CardsContainer>
        <UpdateCheckerCard />
      </CardsContainer>
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
          icon='Ionicons/stats-chart-sharp'
          title='Contagem de figuras'
          onPress={() => navigation.navigate('FigureCount')}
        />
        <NavigateButton
          icon='MaterialCommunityIcons/auto-fix'
          title='Corrigir dataset'
          onPress={() => navigation.navigate('DatasetFix')}
        />
        <NavigateButton
          icon='MaterialIcons/backup'
          title='Exportação do dataset'
          onPress={() => navigation.navigate('ExportDataset')}
        />
        <NavigateButton
          icon='MaterialIcons/cloud-download'
          title='Importação do dataset'
          onPress={() => navigation.navigate('ImportDataset')}
        />
        <NavigateButton
          icon='MaterialIcons/settings'
          title='Configurações'
          onPress={() => navigation.navigate('Settings')}
        />
      </NavigateButtonsContainer>
    </Scroll>
  )
}

export default HomeScreen