import { Permissions, Notifications, Constants } from "expo";
import api from "../services/api";
import env from "../env";

const PUSH_ENDPOINT = env.PUSH_ENDPOINT;

export async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();

  const [first, id] = token.split(/\[|\]/);

  const data = {
    secretCode: env.PUSH_SECRET_CODE,
    tokenDevice: token,
    appName: env.PUSH_APP_NAME,
    userPhone: JSON.stringify(await Constants.platform)
  };

  // const resServerPush = await fetch(PUSH_ENDPOINT, {
  //   method: "POST",
  //   body: JSON.stringify(data), //formData,
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json"
  //   }
  // });
  // const dataServerPush = await resServerPush.json();

  await api.createWithFullLink({
    link: `users/${id}`,
    id,
    data
  });
}
