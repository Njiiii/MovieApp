import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Button, TextInput } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';


//Stylesheet for the whole app
const styles = StyleSheet.create({

  /* Container is used in the main menu. It is style for the 'bottom' of the main menu layer cake. All the elements of the main menu, like the buttons, are added on top of the container.*/
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 40
  },

  /* Mainmenubuttons is used in the view that the button is wrapped inside. Buttons don't support styles so instead buttons are wrapped in a view that is then styled with this.*/ 
  mainmenubuttons: {
    backgroundColor: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    padding: 10,
  },
  
  /* This is for making the search textbox look nicer */
  textfield: {
    backgroundColor: 'white',
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,

  }
});



//Main menu screen
//Contains navigation buttons for different screens
class MainMenu extends React.Component {
  static navigationOptions = {
    title: "Main menu"
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error:  false,
      text: "",
      apikey: "3510d4eaa8f5a73f36046c09e64492de"
    }
  }

  componentDidMount = async () => {
    try {
      this.setState({loading: false}) 
    } catch (e) {
      this.setState({loading: false, error: true})
    }
  }

  render() {
    const {navigate} = this.props.navigation;

    //If menu is loading, show loading icon
    if(this.state.loading) {
      return ( 
        <View style={styles.container}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }

    //If error happens, show error text
    if (this.state.error) {
      return ( 
        <View>
          <Text>
            Failed to load menus
          </Text>
        </View>
      )
    }

    /* All the UI elements are wrapped in their own views, because otherwise
    they would be stuck together. We don't want that because it hurts
    usability of the app */
    return (
    <View style={styles.container}>
      
      <View style={styles.textfield}>
        <TextInput
          onChangeText={(text) => this.setState({text})} 
          placeholder="Search for a movie"
          />
      </View>

      <View style={styles.mainmenubuttons}>
        <Button title="Search" onPress={() => navigate('Search', {name: 'Search'})}/>
      </View>

      <View style={styles.mainmenubuttons}>
        <Button title='New releases' onPress={() => navigate('NewReleases', {name: 'NewReleases'})}/>
      </View>

      <View style={styles.mainmenubuttons}>
        <Button title='Popular' onPress={() => navigate('Popular', {name: 'Popular'})} />
      </View>
    </View>
    )

  }

}//class MainMenu



class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search results'
  };

  /* SearchScreenin stateihin pitäisi saada MainMenusta "text", johon on laitettu käyttäjän hakukenttään kirjoittama teksti
    sekä "apikey", jota tarvitaan haku-url:issa */
  constructor(props) {
    super(props)
  }

  componentDidMount = async () => {
    try {
      //Haetaan dataa TMDB:stä käyttäjän antaman leffan nimen perusteella
      const response = await fetch('URL') 
      const searchresults = await response.json()
      this.setState({loading: false, searchresults})
    
    } catch(e) {
      this.setState({loading: false, error: true})
    }
  }
  
  
  render() {
    const {navigate} = this.props.navigation;

    //If screen is loading, show loading icon
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator animating={true} />
        </View>
      )
    }

    //If there was an error while loading screen, show error notification
    if (this.state.error) {
      <View>
        <Text>
          Failed to load search screen
        </Text>
      </View>
    }

    //Show result of the search here
    return (
      <View>
        <Text>
          {}
        </Text>
      </View>
    )
  }

}





//New releases screen
//Here is listed some new movie releases
class NewReleasesScreen extends React.Component {
  static navigationOptions = {
    title: 'New releases'
  };

  state = {
    loading: true,
    error: false,
  }

  componentDidMount = async () => {
    try {
      this.setState({loading: false})
    } catch(e) {
      this.setState({loading:false, error: true})
    }
  }

  render() {
    const {navigate} = this.props.navigation;

    //If screen is loading, show loading icon
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator animating={true} />
        </View>
      )
    }

    //If there was an error while loading screen, show error notification
    if (this.state.error) {
      <View>
        <Text>
          Failed to load search screen
        </Text>
      </View>
    }

    return (
      <View>
        <Text>
          NEW RELEASE SCREEN
        </Text>
      </View>
    )
  }
}//class NewReleasesScreen



//Popular screen
//Here is listed some popular movies among the users of TMDB
class PopularScreen extends React.Component {
  static navigationOptions = {
    title: 'Popular'
  };

  state = {
    loading: true,
    error: false,
  }

  componentDidMount = async () => {
    try {
      this.setState({loading: false})
    } catch(e) {
      this.setState({loading:false, error: true})
    }
  }

  render() {
    const {navigate} = this.props.navigation;

    //If screen is loading, show loading icon
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator animating={true} />
        </View>
      )
    }

    //If there was an error while loading screen, show error notification
    if (this.state.error) {
      <View>
        <Text>
          Failed to load search screen
        </Text>
      </View>
    }

    return (
      <View>
        <Text>
          POPULAR SCREEN
        </Text>
      </View>
    )
  }
}//class PopularScreen'



const AppNavigator = createStackNavigator(
  {
    Menus: MainMenu,
    Search: SearchScreen,
    NewReleases: NewReleasesScreen,
    Popular: PopularScreen,
  },
  {
    initialRouteName: "Menus"
  }
);


//DON'T REMOVE THESE TWO!!!
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}