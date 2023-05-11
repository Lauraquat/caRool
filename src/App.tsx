import { Redirect, Route } from 'react-router-dom';
import {  IonApp, IonIcon, IonButton, IonRouterOutlet,  IonTabBar,  IonTabButton,  IonTabs,  IonHeader,  IonToolbar,  setupIonicReact,  IonImg} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calendar, square, home, personCircleOutline} from 'ionicons/icons';
import Event from './pages/Event';
import EventDetail from './pages/EventDetail';
import Location from './pages/Location';
import Scan from './pages/Scan';
import Register from './pages/Register';
import Home from './pages/Home';
import User from './pages/User';
import ScanOptions from './pages/ScanOptions';
import ResaConfirmation from './pages/ResaConfirmation';
import MesResa from './pages/MesResa';
import ScanFailed from './pages/ScanFailed';
import ScanValid from './pages/ScanValid';


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
import RetourVelo from './pages/RetourVelo';

setupIonicReact();

const App: React.FC = () => {

  const user = useCurrentUser();

  if(user === null){
    return(
      <IonApp >
      <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/register">
              <Register />
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
            <a  href='./event'>
              <IonImg class='logo' src='../../assets/icon/logo.svg' alt='logo ça Rool'></IonImg>           
            </a>
            {/* <a  href='./user'>
              <svg className='logoUser' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#203533" d="M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm126.42 327.25a4 4 0 01-6.14-.32 124.27 124.27 0 00-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.24 124.24 0 00-32.35 29.58 4 4 0 01-6.14.32A175.32 175.32 0 0180 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 01-46.68 119.25z"/><path fill="#203533" d="M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144z"/></svg>
            </a> */}
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
            <Route path="/user">
              <User/>
            </Route>
            <Route path="/mesresa">
              <MesResa/>
            </Route>
            <Route path="/location">
              <Location />
            </Route>
            <Route path="/scan">
              <Scan />
            </Route>
            <Route path="/scanOptions">
              <ScanOptions />
            </Route>
            <Route path="/scanValid">
              <ScanValid />
            </Route>
            <Route path="/scanFailed">
              <ScanFailed />
            </Route>
            <Route path="/retourVelo">
              <RetourVelo />
            </Route>
            <Route path="/resaConfirmation">
              <ResaConfirmation />
            </Route>
            <Route exact path="/register">
              <Redirect to="/event" />
            </Route>
            <Route exact path="/login">
              <Redirect to="/event" />
            </Route>
            <Route exact path="/home">
              <Redirect to="/event" />
            </Route>
            <Route exact path="/">
              <Redirect to="/event" />
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
            <IonTabButton tab="user" href="/user">
              <IonIcon icon={personCircleOutline} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
    )
  }

export default App;
