import React from 'react'
import { Alert, ToastAndroid } from 'react-native'
import { GeometricFigureService } from '../../services/geometric-figure'
import { Button, ButtonText, Container } from './styles'

const ImportDatasetScreen: React.FC = () => {
  async function importDataset() {
    const backupName = await GeometricFigureService.getLastBackupName()
    await GeometricFigureService.restoreBackupFromFirebaseRTDB(backupName)
    ToastAndroid.show('Dados importados com sucesso!', ToastAndroid.SHORT)
  }

  async function handleImportDataset() {
    Alert.alert(
      'Importar dados',
      'Deseja importar os dados do dataset? ' +
      'Todos os dados atuais serão perdidos.',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: importDataset },
      ],
    )
  }

  return (
    <Container>
      <Button activeOpacity={0.7} onPress={handleImportDataset}>
        <ButtonText>Importar de Firebase RTDB</ButtonText>
      </Button>
    </Container>
  )
}

export default ImportDatasetScreen