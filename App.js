import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Content, Container, Header, Text, Item, Icon, Input, Button, Card, CardItem, Body } from 'native-base';
import { AppLoading, Font } from 'expo';

const API_KEY = '8c49b7bcabc24d79b9c170756192702';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
      loading: true,
      searchValue: ''
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ loading: false });
  }

  renderItem = ({ item }) => {
    return (
      <Content padder>
        <Card>
          <CardItem header bordered>
            <Text>{item.date}</Text>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>{'Minimum Temperature: ' + item.mintempC + ' °C'}</Text>
              <Text>{'Maximum Temperature: ' + item.maxtempC + ' °C'}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    )
  }

  searchCityWeather = () => {
    return fetch(`http://api.worldweatheronline.com/premium/v1/weather.ashx?key=${API_KEY}&num_of_days=5&format=json&q=` + this.state.searchValue)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.data.weather)
        this.setState({ items: responseJson.data.weather })
      })
      .catch((error) => {
        alert(error)
      });
  }

  render() {
    if (this.state.loading) {
      return <AppLoading />;
    }
    return (
      <Container style={{backgroundColor: '#8EA8C3'}}>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input  placeholder="City name" onChangeText={inputValue => this.setState({ searchValue: inputValue })}/>
           <Button transparent onPress={this.searchCityWeather}>
            <Text>Search</Text>
          </Button>
          </Item>
        </Header>
        <FlatList data={this.state.items}  keyExtractor={(item, index) => index.toString()} renderItem={this.renderItem} />
      </Container>
    )
  }
}
