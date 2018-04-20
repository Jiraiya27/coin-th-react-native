import React from 'react'
import { View, FlatList, Text, StyleSheet, RefreshControl } from 'react-native'
import PropTypes from 'prop-types'
import { formatNumber } from '../helper/bx_helper'

const HeadComponent = props => {
  const { primary_currency, secondary_currency } = props
  return (
    <View style={[styles.paddingSides, styles.headStyle]}>
      <Text style={{ flex: 1, textAlign: 'left' }} adjustsFontSizeToFit numberOfLines={1}>Rate</Text>
      <Text style={{ flex: 1, textAlign: 'center' }} adjustsFontSizeToFit numberOfLines={1}>Volume ({secondary_currency})</Text>
      <Text style={{ flex: 1, textAlign: 'right' }} adjustsFontSizeToFit numberOfLines={1}>Volume ({primary_currency})</Text>
    </View>
  )
}

export default class LatestTrades extends React.Component {
  constructor(props) {
    super(props)

    const { pairing_id, primary_currency, secondary_currency, type } = props

    this.state = {
      pairing_id,
      primary_currency,
      secondary_currency,
      type,
      bids: [],
      asks: [],
      refreshing: false,
    }
  }
  static propTypes = {
    pairing_id: PropTypes.number.isRequired,
    primary_currency: PropTypes.string.isRequired,
    secondary_currency: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['bids', 'asks']).isRequired
  }
  componentDidMount() {
    this.getOrderbook()
  }
  getOrderbook = async () => {
    try {
      const response = await fetch(`https://bx.in.th/api/orderbook/?pairing=${this.state.pairing_id}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          Accepts: 'application/json'
        }
      })
      const { bids, asks } = await response.json()
      this.setState({ bids, asks, refreshing: false })
    } catch (error) {
      console.log(error)
    }
  }
  onRefresh = () => {
    this.setState({ refreshing: true })
    this.getOrderbook()
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    )
  }
  render() {
    const { secondary_currency, primary_currency, type, bids, asks } = this.state
    const data = type === 'bids' ? bids : asks
    console.log('Orders data:', data)
    return (
      <View style={styles.container}>
        <HeadComponent secondary_currency={secondary_currency} primary_currency={primary_currency}/>
        <FlatList
          style={[styles.paddingSides, styles.list]}
          data={data.length > 0 ? data : null}
          renderItem={({ item: row}) => {
            const rate = row[0]
            const amount = row[1]
            const primary_amount = formatNumber(Number(rate * amount), 2, '.', ',')
            return (
              <View style={styles.listItem}>
                <Text style={{ flex: 1, textAlign: 'left' }} adjustsFontSizeToFit numberOfLines={1}>{Number(rate).toPrecision(8)}</Text>
                <Text style={{ flex: 1, textAlign: 'center' }} adjustsFontSizeToFit numberOfLines={1}>{amount}</Text>
                <Text style={{ flex: 1, textAlign: 'right' }} adjustsFontSizeToFit numberOfLines={1}>{primary_amount}</Text>
              </View>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}/>
          }
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  paddingSides: {
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  headStyle: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ebf1f4',
    paddingTop: 10,
    paddingBottom: 10,
  },
  list: {
    width: '100%',
    // paddingTop: 10,
    // marginBottom: 10
  },
  listItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  }
})
