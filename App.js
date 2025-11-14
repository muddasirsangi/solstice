import "react-native-gesture-handler";
import "react-native-reanimated";
import { useMemo, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold
} from "@expo-google-fonts/poppins";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold
} from "@expo-google-fonts/inter";
import { Nunito_400Regular, Nunito_600SemiBold } from "@expo-google-fonts/nunito";
import { HomeScreen } from "./src/screens/HomeScreen";
import { MenuScreen } from "./src/screens/MenuScreen";
import { RecipesScreen } from "./src/screens/RecipesScreen";
import { BlogScreen } from "./src/screens/BlogScreen";
import { AboutScreen } from "./src/screens/AboutScreen";
import { ContactScreen } from "./src/screens/ContactScreen";
import { SplashScreen } from "./src/components/SplashScreen";
import { ErrorBoundary } from "./src/components/ErrorBoundary";
import { HiddenMarketing } from "./src/components/HiddenMarketing";
import { colors } from "./src/theme";

const Tab = createMaterialTopTabNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent"
  }
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Nunito_400Regular,
    Nunito_600SemiBold
  });
  const [showSplash, setShowSplash] = useState(true);

  const tabBarOptions = useMemo(
    () => ({
      tabBarStyle: styles.tabBar,
      tabBarIndicatorStyle: styles.tabIndicator,
      tabBarLabelStyle: styles.tabLabel,
      tabBarActiveTintColor: colors.deep,
      tabBarInactiveTintColor: colors.textSoft,
      tabBarPressColor: "transparent",
      tabBarScrollEnabled: true,
      animationEnabled: true,
      swipeEnabled: true
    }),
    []
  );

  if (!fontsLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.saffron} />
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        {showSplash && (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        )}
        <NavigationContainer theme={navigationTheme}>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
              ...tabBarOptions,
              sceneContainerStyle: { backgroundColor: "transparent" }
            }}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Menu" component={MenuScreen} />
            <Tab.Screen name="Recipes" component={RecipesScreen} />
            <Tab.Screen name="Blog" component={BlogScreen} />
            <Tab.Screen name="About" component={AboutScreen} />
            <Tab.Screen name="Contact" component={ContactScreen} />
          </Tab.Navigator>
          <HiddenMarketing />
        </NavigationContainer>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.cream
  },
  tabBar: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 24,
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: "rgba(255,255,255,0.65)",
    borderWidth: 1,
    borderColor: colors.glassBorder
  },
  tabIndicator: {
    backgroundColor: colors.saffron,
    height: 3,
    borderRadius: 999
  },
  tabLabel: {
    fontFamily: "Inter_600SemiBold",
    textTransform: "capitalize",
    fontSize: 14,
    letterSpacing: 0.5
  }
});

