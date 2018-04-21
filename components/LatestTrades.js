import React from 'react'
import { View, StyleSheet, Text, FlatList, RefreshControl } from 'react-native'

const HeadComponent = props => {
  return (
    <View style={[styles.padding, styles.headStyle]}>
      <Text style={{ flex: 1, textAlign: 'left' }}>Date/Time</Text>
      <Text style={{ flex: 1, textAlign: 'center' }}>Rate</Text>
      <Text style={{ flex: 1, textAlign: 'right' }}>Volume</Text>
    </View>
  )
}

export default class LatestTrades extends React.Component {
  state = {
    trades: {},
    lowask: {},
    highbid: {},
    params: {},
    refreshing: false
  }
  static getDerivedStateFromProps(nextProps, prevProps) {
    if (nextProps === prevProps) return null
    return nextProps
  }
  componentDidMount() {
    this.getBxData()
  }
  getBxData = async () => {
    try {
      const response = await fetch(`https://bx.in.th/api/trade/?pairing=${this.state.params.pairing_id}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          Accepts: 'application/json'
        }
      })
      const { trades, lowask, highbid } = await response.json()
      const sortedTrades = trades.sort((a, b) => {
        return a.seconds - b.seconds
      })
      this.setState({ trades: sortedTrades, lowask, highbid, refreshing: false })
    } catch (error) {
      console.log(error)
    }
  }
  onRefresh = () => {
    this.setState({ refreshing: true })
    this.getBxData()
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
  evalTimeText = seconds => {
    if (seconds < 60) {
      return `${seconds} sec ago`
    } else if (seconds < 3600) {
      const mins = Math.floor(seconds / 60)
      return `${mins} min ago` 
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600)
      return `${hours} hr ago`
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <HeadComponent />
        <FlatList 
          style={styles.list}
          data={this.state.trades.length > 0 ? this.state.trades : null}
          renderItem={({ item }) => {
            const { trade_date, seconds, rate, amount, trade_type } = item
            const timeText = this.evalTimeText(seconds)
            return (
              <View style={styles.item}>
                <Text style={{ flex: 1, textAlign: 'left'}} adjustsFontSizeToFit numberOfLines={1}>{timeText}</Text>
                <Text style={{ flex: 1, textAlign: 'center'}} adjustsFontSizeToFit numberOfLines={1}>{rate}</Text>
                <Text style={{ flex: 1, textAlign: 'right'}} adjustsFontSizeToFit numberOfLines={1}>{amount}</Text>
              </View>
            )
          }}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
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
    backgroundColor: '#f9f9f9'
  },
  padding: {
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: 10,
    paddingBottom: 10
  },
  headStyle: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ebf1f4'
  },
  list: {
    width: '100%',
    // paddingTop: 10,
    // marginBottom: 10
  },
  item: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: 10,
    paddingBottom: 10
  }
})