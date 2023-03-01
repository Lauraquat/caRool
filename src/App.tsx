import { Redirect, Route } from 'react-router-dom';
import {  IonApp,  IonIcon,  IonRouterOutlet,  IonTabBar,  IonTabButton,  IonTabs,  IonHeader,  IonToolbar,  setupIonicReact,  IonImg} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calendar, square, home, keySharp } from 'ionicons/icons';
import Event from './pages/Event';
import EventDetail from './pages/EventDetail';
import Location from './pages/Location';
import Scan from './pages/Scan';
import Register from './pages/Register';
import Home from './pages/Home'

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
import { useCurrentUser } from './hooks/UserHook';
import Login from './pages/Home';

setupIonicReact();

const App: React.FC = () => {

  const user = useCurrentUser();
  console.log(user)
  if(user === null){
    return(
      <IonApp >
      <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/">
              <Home/>
            </Route>
            </IonRouterOutlet>
      </IonReactRouter>
      </IonApp >
    )
  }
    return (
    <IonApp >
      <IonHeader id="app-header-bar">
          <IonToolbar>
            <IonImg class='logo' src='../../assets/icon/logo.svg' alt='logo ça Rool'></IonImg>
          </IonToolbar>
        </IonHeader>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
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
              <Redirect to="/event" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar id="app-tab-bar" slot="bottom">
            <IonTabButton tab="home" href="/home">
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
    )
  }

export default App;
