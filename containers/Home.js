import React from 'react'
import { View, FlatList, StyleSheet, RefreshControl, Text, AsyncStorage } from 'react-native'
import _ from 'lodash'
import ListItem from '../components/ListItem'

const HeaderComponent = (props) => (
  <View style={styles.listHeader}>
    <Text style={styles.headerText}>Currency</Text>
    <Text style={styles.headerText}>24H Volume</Text>
    <Text style={styles.headerText}>24H Change</Text>
  </View>
)

export default class Home extends React.Component {
  state = {
    all: {},
    allKeys: [],
    refreshing: false,
    favorites: []
  }

  static navigationOptions = {
    title: 'Home'
  }

  async componentDidMount() {
    const favoritesString = await AsyncStorage.getItem('favorites') || ''
    const favorites = favoritesString.split(',')
    if (Array.isArray(favorites)) {
      this.setState({ favorites })
    }
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

  setFavorite = (pairing_id) => {
    const index = this.state.favorites.indexOf(pairing_id)
    let favorites = [...this.state.favorites]
    if (index === -1) {
      favorites.unshift(pairing_id)
    } else {
      favorites.splice(index, 1)
      favorites.unshift(pairing_id)
    }
    return () => {
      this.setState({ favorites })
      const favoritesString = favorites.join(',')
      AsyncStorage.setItem('favorites', favoritesString)
    }
  }

  render() {
    let sortedKeys = _.union(this.state.favorites, this.state.allKeys)
    return (
      <View style={styles.container}>
        <HeaderComponent />
        <FlatList 
          style={styles.list} 
          data={sortedKeys}
          extraData={this.state}
          renderItem={id => {
            return <ListItem
                    {...this.state.all[id.item]}
                    navigation={this.props.navigation}
                    setFavorite={this.setFavorite(id.item)} />
          }}
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
  },
  headerText: {
    flex: 1,
    textAlign: 'center'
  }
})