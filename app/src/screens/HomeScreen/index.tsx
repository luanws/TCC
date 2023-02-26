import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'

interface Props {
}

const HomeScreen: React.FC<Props> = (props) => {
  const navigation = useNavigation()

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen