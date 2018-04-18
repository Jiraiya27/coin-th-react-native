import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Image, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { getNameFromSymbol, getCurrencyUnit, formatNumber } from '../helper/bx_helper'

const BASE_IMAGE_PATH = 'https://d2v7vc3vnopnyy.cloudfront.net/img/coins/'
const IMAGE_EXTENSION = '.png'

export default class CurrencyItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      primary_currency: props.primary_currency,
      secondary_currency: props.secondary_currency,
      change: props.change,
      last_price: props.last_price,
      volume_24hours: props.volume_24hours
    }
  }

  static propTypes = {
    "pairing_id": PropTypes.number,
    "primary_currency": PropTypes.string,
    "secondary_currency": PropTypes.string,
    "change": PropTypes.number,
    "last_price": PropTypes.number,
    "volume_24hours": PropTypes.number,
    // "orderbook": PropTypes.shape({
    //   "bids": PropTypes.shape({
    //     "total": PropTypes.number,
    //     "volume": PropTypes.number,
    //     "highbid": PropTypes.number
    //   }),
    //   "asks": PropTypes.shape({
    //     "total": PropTypes.number,
    //     "volume": PropTypes.number,
    //     "highbid": PropTypes.number
    //   })
    // })
  }

  static getDerivedStateFromProps(nextProps, prevProps) {
    if (nextProps === prevProps) return null

    return nextProps
  }

  onPress = () => {
    const { navigation, ...props } = this.props
    navigation.navigate('Details', props)
  }

  render() {
    const { change, last_price, primary_currency, secondary_currency, volume_24hours } = this.state
    const name = getNameFromSymbol(secondary_currency)
    const volume = formatNumber(Number(volume_24hours) * Number(last_price), 2, '.', ',') + " " + getCurrencyUnit(primary_currency)
    const latestPrice = last_price + " " + getCurrencyUnit(primary_currency)
    const changeText = change < 0
      ? <Text style={{ color: 'red' }}>{change}% <Icon name="arrow-down" /></Text>
      : <Text style={{ color: 'green' }}>{change}% <Icon name="arrow-up" /></Text>
    const imageSource = BASE_IMAGE_PATH + secondary_currency + IMAGE_EXTENSION

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={styles.container}>
          <View style={styles.childView}>
            <Image source={{ uri: imageSource }} style={{ width: 16, height: 16, marginRight: 5 }} />
            <View style={{ flex: 1 }}>
              <Text adjustsFontSizeToFit numberOfLines={1}>{name}</Text>
            </View>
          </View>
          <View style={styles.childView}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={{ width: '100%', textAlign: 'center' }} >{volume}</Text>
          </View>
          <View style={styles.childView}>
            <View style={styles.changeView}>
              <Text adjustsFontSizeToFit numberOfLines={1} >{latestPrice}</Text>
              {changeText}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '94%',
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    marginLeft: '3%',
    marginRight: '3%',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: 'red',
    alignItems: 'center'
  },
  childView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    // borderColor: 'green',
    // borderWidth: 0.5,
    height: '100%'
  },
  changeView: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly'
  }
})