import { makeAutoObservable, runInAction } from "mobx";
import api from "../services/api";

class CarStore {
  cars = [];
  selectedCars = [];
  likedCars = [];
  lookingFor = "";
  recommendation = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  toggleSelection(carId) {
    if (this.selectedCars.includes(carId)) {
      this.selectedCars = this.selectedCars.filter((id) => id !== carId);
    } else if (this.selectedCars.length < 5) {
      this.selectedCars.push(carId);
    }
  }

  toggleLikeCar(carId) {
    if (this.likedCars.includes(carId)) {
      this.likedCars = this.likedCars.filter((id) => id !== carId);
    } else if (this.likedCars.length < 5) {
      this.likedCars.push(carId);
    }
  }

  setLookingFor(text) {
    this.lookingFor = text;
  }

  getLikedObjects() {
    return this.cars.filter((car) => this.likedCars.includes(car.id));
  }

  get isSelectionComplete() {
    return this.selectedCars.length === 5;
  }

  async loadCars() {
    this.isLoading = true;
    try {
      const response = await api.get("/Car");

      runInAction(() => {
        this.cars = response.data;
      });
    } catch (error) {
      console.error("Greška pri dohvaćanju auta: ", error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export const carStore = new CarStore();
