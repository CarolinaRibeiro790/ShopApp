import { OneSignal } from "react-native-onesignal";

export function tagUserInfoCreate(){
    OneSignal.User.addTags({
        user_name: "Rodrigo",
        user_email: "rodrigo@gmail.com"
    })
}