import React from 'react'
import { StyleProp, TextStyle } from 'react-native'
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  Fontisto,
  FontAwesome,
  FontAwesome5,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from '@expo/vector-icons'

interface Props {
  icon: string | JSX.Element
  size?: number
  color?: string
  style?: StyleProp<TextStyle>
}

const getIcon = (icon: string, size: number, color: string, style: StyleProp<TextStyle>) => {
  const [source, name] = icon.split('/').map(x => x as any)
  switch (source) {
    case 'AntDesign':
      return <AntDesign style={style} name={name} size={size} color={color} />
    case 'Entypo':
      return <Entypo style={style} name={name} size={size} color={color} />
    case 'EvilIcons':
      return <EvilIcons style={style} name={name} size={size} color={color} />
    case 'Feather':
      return <Feather style={style} name={name} size={size} color={color} />
    case 'Fontisto':
      return <Fontisto style={style} name={name} size={size} color={color} />
    case 'FontAwesome':
      return <FontAwesome style={style} name={name} size={size} color={color} />
    case 'FontAwesome5':
      return <FontAwesome5 style={style} name={name} size={size} color={color} />
    case 'Foundation':
      return <Foundation style={style} name={name} size={size} color={color} />
    case 'Ionicons':
      return <Ionicons style={style} name={name} size={size} color={color} />
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons style={style} name={name} size={size} color={color} />
    case 'MaterialIcons':
      return <MaterialIcons style={style} name={name} size={size} color={color} />
    case 'Octicons':
      return <Octicons style={style} name={name} size={size} color={color} />
    case 'SimpleLineIcons':
      return <SimpleLineIcons style={style} name={name} size={size} color={color} />
    case 'Zocial':
      return <Zocial style={style} name={name} size={size} color={color} />
    default:
      return null
  }
}

const Icon: React.FC<Props> = (props) => {
  const icon = props.icon
  const size = props.size ? props.size : 24
  const color = props.color ? props.color : 'black'
  const style = props.style
  if (typeof icon === 'string') {
    return getIcon(icon, size, color, style)
  } else {
    return icon
  }
}

export default Icon