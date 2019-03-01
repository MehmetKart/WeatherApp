import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Content, Container, Header, Text, Item, Icon, Input, Button, Card, CardItem, Body } from 'native-base';
import { AppLoading, Font } from 'expo';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
      searchValue: '',
      loading: true,
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
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

  searchWeather = () => {
    return fetch('http://api.worldweatheronline.com/premium/v1/weather.ashx?key=8c49b7bcabc24d79b9c170756192702&num_of_days=5&format=json&q=' + this.state.searchValue)
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
            <Input placeholder="City name" onChangeText={inputValue => this.setState({ searchValue: inputValue })}
            />
          </Item>
          <Button transparent onPress={this.searchWeather}>
            <Text>Search</Text>
          </Button>
        </Header>
        <FlatList data={this.state.items}  keyExtractor={(item, index) => index.toString()} renderItem={this.renderItem} />
      </Container>
    )
  }
}
