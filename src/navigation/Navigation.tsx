import * as React from 'react';
import HomePage from '../screens/HomePage';
import DetailedPage from '../screens/DetailedPage';
import VideoCallPage from '../screens/VideoCallPage';
import Authentication from '../screens/Authentication';
import OnBoardingPages from '../screens/OnBoardingPages';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloClient, InMemoryCache, ApolloProvider, } from '@apollo/client';

const RootStack = createNativeStackNavigator();

function Navigator() {
    const client = new ApolloClient({
        uri: 'http://192.168.0.105:8000/graphql',
        cache: new InMemoryCache(),
        credentials: 'include', // or 'same-origin' depending on your server setup
    });
    
    return (
        <ApolloProvider client={client}>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                {/* <RootStack.Screen name={'Login'} component={Login} /> */}
                <RootStack.Screen name="OnBoardingPages" component={OnBoardingPages} options={{ headerShown: false }} />
                <RootStack.Screen name="Home Page" component={HomePage} options={{ headerShown: false }} />
                <RootStack.Screen name="Detailed Page" component={DetailedPage} options={{ headerShown: true }} />
                <RootStack.Screen name="VideoCallPage" component={VideoCallPage} options={{ headerShown: false }} />
                <RootStack.Screen name="Authentication" component={Authentication} options={{ headerShown: false }} />
            </RootStack.Navigator>
        </ApolloProvider>
    );
}

export default Navigator;