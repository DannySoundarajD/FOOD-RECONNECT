import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import HomePage from './components/HomePage';
import ChatbotAssistant from './components/ChatBotAssistant';
import DonatePage from './components/DonatePage';
import MyHistoryPage from './components/MyHistoryPage';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="signup" component={SignUpPage} />
        <Stack.Screen name = "Home" component={HomePage}/>
        <Stack.Screen name="chatbot" component={ChatbotAssistant}/>
        <Stack.Screen name = "donate" component={DonatePage}/>
        <Stack.Screen name = "history" component={MyHistoryPage}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}