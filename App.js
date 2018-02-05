import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList
} from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      todos: [],
      refresh: false
    };
  }

  handleButtonPress = () => {
    this.setState(prevState => {
      let { text, todos } = prevState;
      return {
        text: '',
        todos: [...todos, { key: text + todos.length, text, status: false }]
      };
    });
    //console.log(this.state.todos);
  };

  handleTextChange = text => {
    this.setState({ text });
  };

toggleStatus = (data) => {
//console.log('data', data);
this.setState({refresh: true});
  data.status = !data.status;
this.setState({refresh: false});
  console.log(data);
}

  render() {
    const statusCheck = this.state.status ? lineThrough:null;
    //console.log('statusCheck', statusCheck, this.state.status);

    
    return (
      <View style={container}>
        {this.state.todos.length === 0 ? (
          <Text style={textFont}>You're free</Text>
        ) : (
          <Text style={textFont}>You got stuff to do!</Text>
        )}
        <TextInput
          onChangeText={this.handleTextChange}
          value={this.state.text}
          placeholder="Add Todo"
        />
        <Button onPress={this.handleButtonPress} title="Add Todo" />
        <FlatList
          data={this.state.todos}
          extraData = {this.state}
          renderItem={({ item, key }) => {
            return (
              <View key={item.key}>
                <Text style={item.status ? styles.lineThrough:null} onPress={() => this.toggleStatus(item)}>
                  {item.text}
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 33
  },
  textFont: {
    fontSize: 28
  },
  lineThrough: {
    textDecorationLine: 'line-through',
    color: 'red'
  }
});

const { container, textFont } = styles;
