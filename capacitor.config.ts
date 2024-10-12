import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'emi.calculator.app',
  appName: 'Emi Calculator',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#000000",
      showSpinner: false,
      androidSpinnerStyle: "small",
      iosSpinnerStyle: "small",
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
