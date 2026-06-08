import { makeAutoObservable, runInAction } from "mobx";
import api from "../services/api";

class CarStore {
  cars = [];
  selectedCars = [];
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
