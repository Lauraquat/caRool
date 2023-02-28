import React from 'react';
import {
  IonApp,
  IonBackButton,
  IonButtons,
  IonButton,
  IonDatetime,
  IonHeader,
  IonLabel,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonItem,
  IonInput,
  IonRadioGroup,
  IonRadio,
  IonSelect,
  IonSelectOption,
  IonText
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { apps, flash, send } from 'ionicons/icons';
import moment from 'moment';
import 'moment/locale/fr';

import './style.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { showTabBar } from '../App';

const Location: React.FC = () => {
  showTabBar();
  let now = moment().format('YYYY-MM-DD');
  let later = moment().add(3, 'months').format('YYYY-MM-DD'); 

  const {
    handleSubmit,
    control,
    setValue,
    register,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      genre: 'homme',
      type: 'VTT',
    },
  });

  console.log(errors);
  console.log(getValues());
  console.log(now);
  console.log(later);

  /**
   *
   * @param data
   */
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data, null, 2));
  };
  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>Formulaire de réservation</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <form onSubmit={handleSubmit(onSubmit)}>
          
          <IonItem>
            <div style={{marginRight:'20px', fontWeight: 'bold' }}>
              Combien de vélo(s) ?
            </div>
            <IonInput type="number" min="1" value="1"></IonInput>  
          </IonItem>
            {/* SELECT DU GENRE */}
            <IonItem>
              <IonLabel style={{ fontWeight: 'bold' }}>Pour qui ?</IonLabel>
              <Controller
                render={({ field }) => (
                  <IonSelect
                    value={field.value}
                    onIonChange={e => setValue('genre', e.detail.value)}
                  >
                    <IonSelectOption value="homme">Homme</IonSelectOption>
                    <IonSelectOption value="femme">Femme</IonSelectOption>
                    <IonSelectOption value="enfant">Enfant</IonSelectOption>
                  </IonSelect>
                )}
                control={control}
                name="genre"
                rules={{ required: 'Merci de renseigner ce champ' }}
              />
            </IonItem>
            <ErrorMessage
              errors={errors}
              name="genre"
              as={<div style={{ color: 'red' }} />}
            />

            {/* CHOIX DU TYPE DE VELO */}
            <IonItem>
              <IonText>
                <div style={{ padding: 8, paddingLeft: 0, fontWeight: 'bold' }}>
                  Quel type ?
                </div>
                <div>
                  <IonRadioGroup
                    style={{ display: 'flex', width: '100%' }}
                    {...register('type', { required: true })}
                    defaultValue={getValues('type')}
                    onIonChange={e => setValue('type', e.detail.value)}
                    >
                    <IonItem
                      lines="none"
                      style={{
                        flexGrow: 2
                      }}
                    >
                      <IonLabel position="fixed">VTT</IonLabel>
                      <IonRadio slot="end" value="VTT" />
                    </IonItem>
                    <IonItem style={{ flexGrow: 2 }} lines="none">
                      <IonLabel position="fixed">VTC</IonLabel>
                      <IonRadio slot="end" value="vtc" />
                    </IonItem>
                  </IonRadioGroup>
                </div>
              </IonText>
            </IonItem>
            {errors.type && (
              <span className="error-msg">Merci de renseigner ce champ</span>
            )}
            <IonItem>
              <div style={{ fontWeight: 'bold' }}>
                Pour quand ?
              </div>
              <IonDatetime
              //Restriction des dates du datepicker
                min={now}
                max={later}
                presentation="date"
              >
              </IonDatetime>
            </IonItem>
            <div>
              <IonButton type="submit">Valider</IonButton>
            </div>
          </form>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Location;