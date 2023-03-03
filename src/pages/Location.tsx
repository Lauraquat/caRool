import React, { useEffect, useState } from "react";
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
import { useHistory } from "react-router-dom";

import { db } from "../firebaseConfig";
import { dataReservations } from "../dataBdd";
import "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore/lite";

const Location: React.FC = () => {
  const now = moment().format("YYYY-MM-DD");
  const later = moment().add(3, "months").format("YYYY-MM-DD");
  const navigate = useHistory();
  const {
    handleSubmit,
    control,
    setValue,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // number: "1",
      gender: "homme",
      type: "vtt",
      date: now,
    },
  });

  // console.log(errors);
  // console.log(getValues());

  /**
   *
   * @param data
   */
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data, null, 2)); 
    navigate.push("/resaConfirmation");
    addReservations();
  };

  const [reservations, setReservations] = useState<dataReservations[]>([]);
  const [genre, setGenre] = useState("homme");
  const [startDate, setStartDate] = useState(now);
  const [endDate, setEndDate] = useState("");
  const [typeBike, setTypeBike] = useState("vtt");
  const [hashResa, setHashResa] = useState(hashRandom().toString());
  const [hashEnter, setHashEnter] = useState(hashString("Nous avons bien pris en compte votre demande").toString());

  async function getReservations() {
    const resaCol = collection(db, "reservation");
    const resaSnapshot = await getDocs(resaCol);
    const resaLists = resaSnapshot.docs.map((doc) => {
      const reservation = doc.data() as dataReservations;
      reservation.id = doc.id;
      return reservation;
    });
    return resaLists;
  }
  useEffect(() => {
    async function fetchUsers() {
      const reservations = await getReservations();
      setReservations(reservations);
    }
    fetchUsers();
  }, []);

  async function addReservations() {
    try {
      const docRef = await addDoc(collection(db, "reservation"), {
        genre,
        quantite: 1,
        startDate,
        endDate,
        typeBike,
        rendu: false,
        hashResa,
        hashEnter,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

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
              presentation="date"
              defaultValue={getValues("date")}
              onIonChange={(e: any) => {
                setStartDate(e.target.value);
                setValue("date", e.detail.value as string);
              }}
            ></IonDatetime>

            {/* SELECT DU NOMBRE DE VELO */}
            {/* <IonItem>
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
              </IonItem> */}

            {/* SELECT DU GENRE */}
            <IonItem>
              <IonLabel style={{ fontWeight: "bold" }}>Pour qui ?</IonLabel>
              <Controller
                render={({ field }) => (
                  <IonSelect
                    value={field.value}
                    onIonChange={(e) => {
                      setGenre(e.target.value);
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
                    value={typeBike}
                    style={{ display: "flex", width: "100%" }}
                    // {...register("type", { required: true })}
                    // defaultValue={getValues("type")}

                    onIonChange={(e) => {
                      // setValue("type", e.detail.value);
                      setTypeBike(e.target.value);
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
                      <IonRadio slot="end" value="vtt" />
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
