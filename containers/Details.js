import React from 'react'
import { View, StyleSheet, Dimensions, Text, TouchableWithoutFeedback } from 'react-native'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view'
import { getNameFromSymbol } from '../helper/bx_helper'
import LatestTrades from '../components/LatestTrades'
import Orders from '../components/Orders'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width
}

export default class Details extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'trade', title: 'Latest Trades' },
      { key: 'buy', title: 'Buy Orders' },
      { key: 'sell', title: 'Sell Orders' },
    ],
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    const title = getNameFromSymbol(params.secondary_currency)
    return { title }
  }

  onIndexChange = index => this.setState({ index })

  renderSingleLineText = (props) => {
    const unFocusedcolor = 'rgb(134,134,134)'
    const focusedColor = 'rgb(104,104,104)'
    const color = props.focused ? focusedColor : unFocusedcolor
    return <Text style={{ color, fontWeight: 'bold' }} adjustsFontSizeToFit numberOfLines={1}>{props.route.title}</Text>
  }

  renderHeader = props => {
    return <TabBar
            {...props}
            renderLabel={this.renderSingleLineText}
            style={{ backgroundColor: 'rgb(249,249,249)'}}
            indicatorStyle={{ backgroundColor: 'rgb(104,104,104)', height: 3 }} 
          />
  }

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'trade':
        return <LatestTrades
                  params={this.props.navigation.state.params}
                />
      default:
        return null
    }
  }
  
  render() {
    return (
      <TabViewAnimated
        navigationState={this.state}
        renderScene={this.renderScene}
        renderHeader={this.renderHeader}
        onIndexChange={this.onIndexChange}
        initialLayout={initialLayout}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
    flexDirection: 'row'
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'red',
  }
})