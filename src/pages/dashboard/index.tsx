import { useEffect, useState, useContext } from "react";
import { Container } from "../../components/container";
import { DashboardHeader } from "../../components/painelheader";
import { FiCalendar, FiMapPin, FiTrash2 } from "react-icons/fi";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { AuthContext } from "../../contexts/AuthContext";
import { BiTachometer } from "react-icons/bi";

interface CarProps {
  id: string;
  name: string;
  model: string;
  year: string;
  uid: string;
  price: string | number;
  city: string;
  km: string;
  images: CarImageProps[];
}

interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}

export function Dashboard() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    function loadCars() {
      if (!user?.uid) {
        return;
      }

      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, where("uid", "==", user.uid));

      getDocs(queryRef).then((snapshot) => {
        const listCars = [] as CarProps[];

        snapshot.forEach((doc) => {
          listCars.push({
            id: doc.id,
            name: doc.data().name,
            year: doc.data().year,
            model: doc.data().model,
            km: doc.data().km,
            city: doc.data().city,
            price: doc.data().price,
            images: doc.data().images,
            uid: doc.data().uid,
          });
        });

        setCars(listCars);
      });
    }

    loadCars();
  }, [user]);

  async function handleDeleteCar(id: string) {
    const docRef = doc(db, "cars", id);
    await deleteDoc(docRef);
    setCars(cars.filter((car) => car.id !== id));
  }

  return (
    <Container>
      <DashboardHeader />

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <section key={car.id} className="w-full bg-white rounded-lg relative">
            <button
              className="absolute bg-white w-14 h-14 rounded-full flex items-center justify-center right-2 top-2 drop-shadow cursor-pointer"
              onClick={() => handleDeleteCar(car.id)}
            >
              <FiTrash2 size={26} color="#000" />
            </button>
            <img
              className="w-full rounded-lg mb-2 max-h-78"
              src={car.images[0].url}
              alt="Imagem do carro"
            />
            <p className="font-bold mt-1 px-2 mb-2">{car.name}</p>
            <div className="flex flex-col px-2">
              <span className="text-zinc-700 flex items-center gap-1">
                <FiCalendar /> {car.year} | <BiTachometer /> {car.km} km
              </span>
              <strong className="text-black font-bold mt-4">R$ 632.900</strong>
            </div>
            <div className="w-full h-px bg-slate-200 my-2"></div>
            <div className="px-2 pb-2">
              <span className="text-zinc-700 flex items-center gap-2">
                <FiMapPin /> {car.city}
              </span>
            </div>
          </section>
        ))}
      </main>
    </Container>
  );
}
