import React from 'react'
import { ToastAndroid } from 'react-native'
import { GeometricFigureService } from '../../services/geometric-figure'
import { Button, ButtonText, Container } from './styles'

const ExportDatasetScreen: React.FC = () => {
  async function handleExportDataset() {
    await GeometricFigureService.saveBackupInFirebaseRTDB()
    ToastAndroid.show('Dados exportados com sucesso!', ToastAndroid.SHORT)
  }

  return (
    <Container>
      <Button activeOpacity={0.7} onPress={handleExportDataset}>
        <ButtonText>Exportar para Firebase RTDB</ButtonText>
      </Button>
    </Container>
  )
}

export default ExportDatasetScreen