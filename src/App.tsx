import { Redirect, Route } from 'react-router-dom';
import {  IonApp,  IonIcon,  IonRouterOutlet,  IonTabBar,  IonTabButton,  IonTabs,  IonHeader,  IonToolbar,  setupIonicReact,  IonImg} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calendar, square, home, keySharp } from 'ionicons/icons';
import Home from './pages/Home';
import Event from './pages/Event';
import EventDetail from './pages/EventDetail';
import Location from './pages/Location';
import Scan from './pages/Scan';
import Register from './pages/Register';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { userInfo } from 'os';

setupIonicReact();

export const hideTabBar = (): void => {
  const tabBar = document.getElementById('app-tab-bar');
  const headerBar = document.getElementById('app-header-bar');
  if (tabBar !== null && headerBar!== null) {
    tabBar.style.display = 'none';
    headerBar.style.display = 'none';
  }
};
export const showTabBar = (): void => {
  const tabBar = document.getElementById('app-tab-bar');
  const headerBar = document.getElementById('app-header-bar');

  if (tabBar !== null && headerBar!== null) {
    tabBar.style.display = 'flex';
    headerBar.style.display = 'flex';
  }
};

const App: React.FC = () => (
  <IonApp>
    <IonHeader id="app-header-bar">
        <IonToolbar>
          <IonImg class='logo' src='../../assets/icon/logo.svg' alt='logo ça Rool'></IonImg>
        </IonToolbar>
      </IonHeader>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home/>
          </Route>
          <Route exact path="/event">
            <Event />
          </Route>
          <Route path="/event/:id">
            <EventDetail/>
          </Route>
          <Route path="/location">
            <Location />
          </Route>
          <Route path="/scan">
            <Scan />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar id="app-tab-bar" slot="bottom">
          <IonTabButton tab="home" href="/event">
            <IonIcon icon={home} />
          </IonTabButton>
          <IonTabButton tab="location" href="/location">
            <IonIcon icon={calendar} />
          </IonTabButton>
          <IonTabButton tab="scan" href="/scan">
            <IonIcon icon={square} />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
