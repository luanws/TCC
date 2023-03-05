import * as Updates from 'expo-updates'
import React, { useEffect, useState } from 'react'
import Card from '../../../components/Card'

interface Props {
}

const UpdateCheckerCard: React.FC<Props> = (props) => {
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false)

  useEffect(() => {
    checkUpdate()
  }, [])

  async function checkUpdate() {
    if (__DEV__) return
    const update = await Updates.checkForUpdateAsync()
    setUpdateAvailable(update.isAvailable)
  }

  async function handleUpdate() {
    await Updates.fetchUpdateAsync()
    await Updates.reloadAsync()
  }

  if (!updateAvailable) return null

  return (
    <Card
      icon='MaterialIcons/update'
      title='Atualização disponível'
      onPress={handleUpdate}
    >
      <Card.Content>
        <Card.Text>
          Uma nova versão do aplicativo está disponível.
          Clique no botão abaixo para atualizar.
        </Card.Text>
        <Card.Button onPress={handleUpdate}>
          <Card.ButtonText>Atualizar</Card.ButtonText>
        </Card.Button>
      </Card.Content>
    </Card>
  )
}

export default UpdateCheckerCard