import { makeAutoObservable, runInAction } from "mobx";
import api from "../services/api";

class CarStore {
  cars = [];
  selectedCars = [];
  likedCars = [];
  lookingFor = "";
  recommendation = null;
  isLoading = false;
  error = "";

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

  resetSelections() {
    this.selectedCars = [];
    this.likedCars = [];
    this.lookingFor = "";
    this.recommendation = null;
  }

  async loadCars() {
    this.isLoading = true;
    this.error = "";
    try {
      const response = await api.get("/Car");
      const cars = Array.isArray(response.data)
        ? response.data
        : response.data?.cars || [];

      runInAction(() => {
        this.cars = cars;
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error.response?.data?.message ||
          "Automobile trenutačno nije moguće učitati.";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export const carStore = new CarStore();
