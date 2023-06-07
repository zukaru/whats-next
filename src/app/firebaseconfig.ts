import { firebaseui, firebase } from "firebaseui-angular";

firebaseui

export const firebaseUiAuthConfig: firebaseui.auth.Config = {
    signInFlow: 'popup',
    signInOptions: [
      {
        requireDisplayName: false,
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
      },
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl: '<your-tos-link>',
    // privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
    // credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
  };
