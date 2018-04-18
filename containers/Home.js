import React from 'react'
import { View, FlatList, StyleSheet, RefreshControl, Text } from 'react-native'
import ListItem from '../components/ListItem'

const HeaderComponent = (props) => (
  <View style={styles.listHeader}>
    <Text style={{ flex: 1, textAlign: 'center' }}>Currency</Text>
    <Text style={{ flex: 1, textAlign: 'center' }}>24H Volume</Text>
    <Text style={{ flex: 1, textAlign: 'center' }}>24H Change</Text>
  </View>
)

export default class Home extends React.Component {
  state = {
    all: {},
    allKeys: [],
    refreshing: false
  }

  static navigationOptions = {
    title: 'Home'
  }

  componentDidMount() {
    this.getAllBxData()
  }

  getAllBxData = async () => {
    try {
      const response = await fetch('https://bx.in.th/api/', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
          Accepts: 'application/json'
        }
      })
      const json = await response.json()
      const keys = Object.keys(json)
      this.setState({ all: json, allKeys: keys, refreshing: false })
    } catch (error) {
      console.log(error)
    }
  }

  onRefresh = () => {
    this.setState({ refreshing: true })
    this.getAllBxData()
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderComponent />
        <FlatList 
          style={styles.list} 
          data={this.state.allKeys}
          renderItem={id => <ListItem {...this.state.all[id.item]} navigation={this.props.navigation} />}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl 
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    flex: 1
  },
  list: {
    width: '100%',
    paddingTop: 10,
    marginBottom: 10
  },
  listHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'aliceblue',
    paddingTop: 5,
    paddingBottom: 5
  }
})