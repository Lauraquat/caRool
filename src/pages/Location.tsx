import React, { useState } from "react";
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
  IonText,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { apps, flash, send } from "ionicons/icons";
import moment from "moment";
import "moment/locale/fr";
import { hashRandom, hashString } from "react-hash-string";

import "./style.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const Location: React.FC = () => {
  let now = moment().format();
  let later = moment().add(3, "months").format();

  const {
    handleSubmit,
    control,
    setValue,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      number: "1",
      gender: "homme",
      type: "VTT",
      date: now,
    },
  });

  console.log(errors);
  console.log(getValues());

  /**
   *
   * @param data
   */
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data, null, 2));
    let hashAcces = hashString("Nous avons bien pris en compte votre demande");
    let hashResa = hashRandom();
    console.log(hashAcces);
    console.log(hashResa);
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
            {/* SELECT DE LA DATE */}
            <IonItem>
              <div style={{ fontWeight: "bold" }}>
                Pour quand voulez vous réserver ?
              </div>
            </IonItem>
            <IonDatetime
              //Restriction des dates du datepicker
              min={now}
              max={later}
              presentation="date-time"
              defaultValue={getValues("date")}
              onIonChange={(e) => {
                setValue("date", e.detail.value as string);
              }}
            >
              <span slot="time-label">Heure</span>
            </IonDatetime>

            {/* SELECT DU NOMBRE DE VELO */}
            <IonItem>
              <div style={{ marginRight: "20px", fontWeight: "bold" }}>
                Combien de vélo(s) ?
              </div>
              <IonInput
                type="number"
                min="1"
                value="1"
                onIonChange={(e) => {
                  setValue("number", e.detail.value as string);
                  //VERIFIER LE NOMBRE DE VELO RESTANTS A LA DATE DONNEE + alerte si pas assez
                }}
              ></IonInput>
            </IonItem>

            {/* SELECT DU GENRE */}
            <IonItem>
              <IonLabel style={{ fontWeight: "bold" }}>Pour qui ?</IonLabel>
              <Controller
                render={({ field }) => (
                  <IonSelect
                    value={field.value}
                    onIonChange={(e) => {
                      setValue("gender", e.detail.value);
                      //VERIFIER LE NOMBRE DE VELO RESTANTS POUR CE GENRE A LA DATE DONNEE + alerte si pas assez
                    }}
                  >
                    <IonSelectOption value="homme">Homme</IonSelectOption>
                    <IonSelectOption value="femme">Femme</IonSelectOption>
                    <IonSelectOption value="enfant">Enfant</IonSelectOption>
                  </IonSelect>
                )}
                control={control}
                name="gender"
                rules={{ required: "Merci de renseigner ce champ" }}
              />
            </IonItem>
            {/* <ErrorMessage
              errors={errors}
              name="gender"
              as={<div style={{ color: "red" }} />}
            /> */}

            {/* CHOIX DU TYPE DE VELO */}
            <IonItem>
              <IonText>
                <div style={{ padding: 8, paddingLeft: 0, fontWeight: "bold" }}>
                  Quel type ?
                </div>
                <div>
                  <IonRadioGroup
                    value="VTT"
                    style={{ display: "flex", width: "100%" }}
                    {...register("type", { required: true })}
                    defaultValue={getValues("type")}
                    onIonChange={(e) => {
                      setValue("type", e.detail.value);
                      //VERIFIER LE NOMBRE DE VELO RESTANTS  DE CE TYPE + alerte si pas assez
                    }}
                  >
                    <IonItem
                      lines="none"
                      style={{
                        flexGrow: 2,
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
            {/* {errors.type && (
              <span className="error-msg">Merci de renseigner ce champ</span>
            )} */}

            {/* SOUMISSION DU FORMULAIRE */}
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
