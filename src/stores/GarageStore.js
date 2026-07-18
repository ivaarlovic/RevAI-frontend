import { makeAutoObservable } from "mobx";
import { getCarId, serializeCar } from "../utils/carUtils";

class GarageStore {
  cars = [];
  userKey = "guest";

  constructor() {
    makeAutoObservable(this);
  }

  get storageKey() {
    return `revai_garage_${this.userKey}`;
  }

  initialize(userId) {
    const nextKey = userId ? String(userId) : "guest";
    if (nextKey === this.userKey && this.cars.length > 0) return;

    this.userKey = nextKey;
    this.load();
  }

  load() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      this.cars = stored ? JSON.parse(stored) : [];
    } catch {
      this.cars = [];
    }
  }

  persist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cars));
  }

  has(carId) {
    return this.cars.some((car) => String(getCarId(car)) === String(carId));
  }

  add(car) {
    const carId = getCarId(car);
    if (!carId || this.has(carId)) return false;

    this.cars.push(serializeCar(car));
    this.persist();
    return true;
  }

  remove(carId) {
    const initialLength = this.cars.length;
    this.cars = this.cars.filter(
      (car) => String(getCarId(car)) !== String(carId),
    );
    this.persist();
    return this.cars.length !== initialLength;
  }

  toggle(car) {
    const carId = getCarId(car);
    if (this.has(carId)) {
      this.remove(carId);
      return false;
    }

    this.add(car);
    return true;
  }

  clear() {
    this.cars = [];
    this.persist();
  }
}

export const garageStore = new GarageStore();
