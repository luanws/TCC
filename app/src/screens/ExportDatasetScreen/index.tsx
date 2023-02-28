import React from 'react'
import { Button, ButtonText, Container } from './styles'

const ExportDatasetScreen: React.FC = () => {
  function handleExportDataset() {
    console.log('Export dataset')
  }

  return (
    <Container>
      <Button activeOpacity={0.7} onPress={handleExportDataset}>
        <ButtonText>Exportar dataset</ButtonText>
      </Button>
    </Container>
  )
}

export default ExportDatasetScreen