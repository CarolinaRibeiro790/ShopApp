import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { NotificationClickEvent, OneSignal } from "react-native-onesignal"

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { tagUserInfoCreate } from './src/notifications/notificationTags';

//Inicializar a integração, o que está dentro do () é o app id gerado no OneSignal
OneSignal.initialize("b34456b8-0c89-4312-8e6d-05d129b723f2");
OneSignal.Notifications.requestPermission(true);

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();

  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent): void => {
      const { actionId } = event.result;

      if (actionId === "1") {
        return console.log("Ver todos")
      }

      if (actionId === "2") {
        return console.log("Ver pedidos")

      }

      // switch (actionId) {
      //   case "1":
      //     console.log("Ver todos")
      //     break
      //   case "2":
      //     console.log("Ver pedidos")
      //     break
      //   default: console.log("Nenhum botão de ação selecionado")
      //     break
      // }
    }

    OneSignal.Notifications.addEventListener("click", handleNotificationClick);

    return () => OneSignal.Notifications.removeEventListener("click", handleNotificationClick)
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}