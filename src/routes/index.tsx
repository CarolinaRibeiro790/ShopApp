import { useEffect, useState } from 'react';
import { useSafeArea, useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { OneSignal, NotificationWillDisplayEvent, OSNotification } from 'react-native-onesignal';

import { AppRoutes } from './app.routes';

import { Notification } from '../components/Notification';

//Configuração para navegação
const linking = {
  prefixes: ["igniteshoes://"],
  config: {
    screens: {
      details: {
        path: "/details/:productId",
        parse: {
          productId: (productId: string) => productId,
        },
      },
    },
  },
}


export function Routes() {
  const { colors } = useTheme();

  //guardar a notificação
  const [notification, setNotification] = useState<OSNotification>();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {

    const handleNotification = (event: NotificationWillDisplayEvent): void => {
      event.preventDefault();
      const response = event.getNotification();
      setNotification(response);
    }

    OneSignal.Notifications.addEventListener("foregroundWillDisplay", handleNotification);

    //Remover da memória 
    return () => OneSignal.Notifications.removeEventListener("foregroundWillDisplay", handleNotification);

  }, [])


  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />
      {notification?.title && (
        <Notification
          data={notification}
          onClose={() => setNotification(undefined)} />
      )}
    </NavigationContainer>
  );
}