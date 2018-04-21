import React from 'React'
import { View, StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'
import { formatNumber } from '../helper/bx_helper'
import moment from 'moment'
moment.locale('th')

const Row = props => {
  const { children, style } = props
  return (
    <View style={[styles.row, style]}>{children}</View>
  )
}

const Item = props => {
  const { children, style } = props
  return (
    <View style={[styles.item, style]}>{children}</View>
  )
}

const TitleText = props => {
  const { children, style } = props
  return (
    <Text style={[styles.itemTitle, style]}>{children}</Text>
  )
}

const ItemContentText = props => {
  const { children, style } = props
  return (
    <Text style={[styles.itemContentText, style]}>{children}</Text>
  )
}

export default class Today extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pairing_id: props.pairing_id,
      last_price: props.last_price,
      orderbook: props.orderbook,
      data: {
        avg: '',
        high: '',
        low: '',
        volume: '',
        open: '',
        close: ''
      }
    }
  }
  static propTypes = {
    pairing_id: PropTypes.number.isRequired,
    last_price: PropTypes.number.isRequired,
    orderbook: PropTypes.shape({
      bids: PropTypes.shape({
        total: PropTypes.number,
        volume: PropTypes.number,
        highbid: PropTypes.number
      }),
      asks: PropTypes.shape({
        total: PropTypes.number,
        volume: PropTypes.number,
        highbid: PropTypes.number
      }).isRequired
    }),
  }
  static getDerivedStateFromProps(nextProps, prevProps) {
    if (nextProps === prevProps) return null

    const { pairing_id, last_price } = nextProps
    return { ...this.state, pairing_id, last_price }
  }
  componentDidMount() {
    this.getTradeHistory()
  }
  getTradeHistory = async () => {
    try {
      const date = moment().format('YYYY-MM-DD')
      const response = await fetch(`https://bx.in.th/api/tradehistory/?pairing=${this.state.pairing_id}&date=${date}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          Accepts: 'application/json'
        }
      })
      const { data } = await response.json()
      this.setState({ data, refreshing: false })
    } catch (error) {
      console.log(error)
    }
  }
  render() {

    const { open, close, high, low, volume } = this.state.data
    const formattedOpen = formatNumber(open, 2, '.', ',')
    const formattedClose = formatNumber(close, 2, '.', ',')
    const highFormatted = formatNumber(high, 2, '.' , ',')
    const lowFormatted = formatNumber(low, 2, '.' , ',')
    const volumeFormatted = formatNumber(volume, 2, '.' , ',')

    const cmcPrice = 0
    const diff = this.state.last_price - 0

    return (
      <View style={styles.container}>
        <View style={[styles.paddingSides, styles.container]}>
          <Row>
            <Text style={{ fontSize: 24 }}>Today</Text>
            <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Item>
                <TitleText style={{ color: '#3fb3f0', fontSize: 12 }}>Open</TitleText>
                <ItemContentText style={{ fontSize: 12 }}>{formattedOpen}</ItemContentText>
              </Item>
              <Item style={{ marginLeft: '2%' }}>
                <TitleText style={{ color: '#3fb3f0', fontSize: 12 }}>Close</TitleText>
                <ItemContentText style={{ fontSize: 12 }}>{formattedClose}</ItemContentText>
              </Item>
            </View>
          </Row>
          <Row style={{ justifyContent: 'space-around', marginTop: 10 }}>
            <Item>
              <TitleText style={{ color: '#63d4a2'}}>High</TitleText>
              <ItemContentText>{highFormatted}</ItemContentText>
            </Item>
            <Item>
              <TitleText style={{ color: '#f67888'}}>Low</TitleText>
              <ItemContentText>{lowFormatted}</ItemContentText>
            </Item>
            <Item>
              <TitleText>Volume</TitleText>
              <ItemContentText>{volumeFormatted}</ItemContentText>
            </Item>
            <Item>
              <TitleText>Market Cap</TitleText>
              <ItemContentText>{0.00}</ItemContentText>
            </Item>
          </Row>
        </View>

        <Row style={{
          justifyContent: 'space-between',
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: 'lightgray',
          paddingLeft: '5%',
          paddingRight: '5%'
        }}>
          <Item>
            <TitleText style={{ textAlign: 'left' }}>bx.in.th</TitleText>
            <ItemContentText style={{ color: '#3fb3f0', fontWeight: '600' }}>{this.state.last_price}</ItemContentText>
          </Item>
          <Item>
            <TitleText>coinmarketcap.com</TitleText>
            <ItemContentText style={{ color: '#3fb3f0', fontWeight: '600' }}>{cmcPrice}</ItemContentText>
          </Item>
          <Item>
            <TitleText style={{ textAlign: 'right' }} >diff</TitleText>
            <ItemContentText style={{ color: '#3fb3f0', fontWeight: '600' }}>{diff}</ItemContentText>
          </Item>
        </Row>

        {/** Add Row for showing % buy and sell*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  paddingSides: {
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: 10,
    paddingBottom: 10
  },
  container: {
    width: '100%'
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  item: {
    display: 'flex',
    flexDirection: 'column'
  },
  itemTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'rgb(134,134,134)'
  },
  itemContentText: {
    color: 'gray',
    textAlign: 'center'
  }
})