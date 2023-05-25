import React, { useEffect, useState } from "react";
import {
  IonApp,
  IonButton,
  IonDatetime,
  IonHeader,
  IonLabel,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonItem,
  IonRadioGroup,
  IonRadio,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import moment from "moment";
import "moment/locale/fr";
import { hashRandom, hashString } from "react-hash-string";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { db } from "../firebaseConfig";
import { dataBookings } from "../dataBdd";
import "firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { useCurrentUser } from "../hooks/UserHook";

import "./style.css";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

const Location: React.FC = () => {
  const now = moment().format("YYYY-MM-DD");
  const later = moment().add(3, "months").format("YYYY-MM-DD");

  const [bookings, setBookings] = useState<dataBookings[]>([]);
  const [startDate, setStartDate] = useState(now);
  const [genre, setGender] = useState("homme");
  const [typeBike, setTypeBike] = useState("vtt");
  const [hashResa] = useState(hashRandom().toString());
  const [hashEnter] = useState(
    hashString("Nous avons bien pris en compte votre demande").toString()
  );
  const [stock, setStock] = useState(0);
  const [numberOfBookings, setNumberOfBookings] = useState(0);
  const navigate = useHistory();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gender: "homme",
      type: "vtt",
      date: now,
    },
  });

  /**
   * @param data
   */
  const onSubmit = (data: any) => {
    //Si le nombre de vélos en stock (avec les critères demandés) est supérieur à 0 : validation de la réservation
    if (numberOfBikes > 0) {
      addBookings();
      navigate.push("/bookingConfirmation");
    } else {
      alert("Désolé, ce vélo n'est pas disponible pour la date choisie");
    }
  };

  useEffect(() => {
    const nbBikes = query(
      collection(db, "velo"),
      where("genre", "==", genre),
      where("type", "==", typeBike)
    );
    getDocs(nbBikes).then((querySnapshot) => {
      const stock = querySnapshot.docs[0].data().stock;
      setStock(stock);
    });

    //Récupération des réservations en cours avec les critères demandés
    const checkDispo = query(
      collection(db, "booking"),
      where("startDate", "==", startDate),
      where("rendu", "==", false),
      where("genre", "==", genre),
      where("typeBike", "==", typeBike)
    );
    getDocs(checkDispo).then((querySnapshot) => {
      setNumberOfBookings(querySnapshot.size);
    });
  }, [startDate, genre, typeBike]);

  const [numberOfBikes, setNumberOfBikes] = useState(0);

  //Calcul du nombre de vélos disponibles selon les critères demandés
  useEffect(() => {
    setNumberOfBikes(stock - numberOfBookings);
  }, [stock, numberOfBookings]);

  const user = useCurrentUser();

  async function getBookings() {
    const bookingCol = collection(db, "booking");
    const bookingSnapshot = await getDocs(bookingCol);
    const bookingLists = bookingSnapshot.docs.map((doc) => {
      const booking = doc.data() as dataBookings;
      booking.id = doc.id;
      return booking;
    });
    return bookingLists;
  }
  useEffect(() => {
    async function fetchUsers() {
      const bookings = await getBookings();
      setBookings(bookings);
    }
    fetchUsers();
  }, []);

  //Enregistrement de la réservation dans la BDD
  async function addBookings() {
    try {
      const docRef = await addDoc(collection(db, "booking"), {
        genre,
        quantite: 1,
        startDate,
        typeBike,
        rendu: false,
        userId: user?.uid,
        hashResa,
        hashEnter,
      });
    } catch (e) {
      alert("Erreur lors de l'enregistrement de la réservation");
    }
  }

  return (
    //Formulaire de réservation
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Formulaire de réservation</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <form className="form-location" onSubmit={handleSubmit(onSubmit)}>
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
              value={startDate}
              onIonChange={(e: any) => {
                setStartDate(e.target.value);
                setValue("date", e.detail.value as string);
              }}
            ></IonDatetime>

            {/* SELECT DU GENRE */}
            <IonItem>
              <IonLabel style={{ fontWeight: "bold" }}>Pour qui ?</IonLabel>
              <Controller
                render={({ field }) => (
                  <IonSelect
                    value={genre}
                    onIonChange={(e) => {
                      setGender(e.target.value);
                      setValue("gender", e.detail.value);
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
                    onIonChange={(e) => {
                      setTypeBike(e.target.value);
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

            <p className="bike-dispo">
              Nombre de vélo(s) disponible(s) pour ces critères :{" "}
              <b>{numberOfBikes}</b>
            </p>

            {/* SOUMISSION DU FORMULAIRE */}
            <div>
              <IonButton
                type="submit"
                onClick={() => {
                  setGender("homme");
                  setTypeBike("vtt");
                  setStartDate(now);
                }}
              >
                Valider
              </IonButton>
            </div>
          </form>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Location;
