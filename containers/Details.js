import React from 'react'
import { View } from 'react-native'
import { getNameFromSymbol } from '../helper/bx_helper'

export default class Details extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    const title = getNameFromSymbol(params.secondary_currency)
    return { title }
  }
  render() {
    return (
      <View></View>
    )
  }
}