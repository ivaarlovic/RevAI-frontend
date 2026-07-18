const normalizeText = (value) =>
  value === null || value === undefined ? "" : String(value).trim();

export const getCarId = (car) => car?.id ?? car?.carId ?? car?.Id ?? null;
export const getCarBrand = (car) => normalizeText(car?.brand ?? car?.Brand);
export const getCarModel = (car) => normalizeText(car?.model ?? car?.Model);
export const getCarYear = (car) => Number(car?.year ?? car?.Year) || null;
export const getCarPrice = (car) => Number(car?.price ?? car?.Price) || null;
export const getCarFuel = (car) =>
  normalizeText(car?.fuelType ?? car?.fuel ?? car?.FuelType ?? car?.Fuel);
export const getCarBody = (car) =>
  normalizeText(
    car?.bodyType ?? car?.category ?? car?.BodyType ?? car?.Category,
  );
export const getCarImage = (car) =>
  normalizeText(car?.image ?? car?.imageUrl ?? car?.Image ?? car?.ImageUrl) ||
  "/preuzmi1.png";
export const getCarHorsePower = (car) =>
  Number(car?.horsePower ?? car?.horsepower ?? car?.power ?? car?.HorsePower) ||
  null;
export const getCarMatch = (car) => {
  const value = Number(car?.match ?? car?.matchPercentage ?? car?.Match);
  return Number.isFinite(value) ? Math.round(value) : null;
};

export const getCarName = (car) => {
  if (!car) return "Nepoznat automobil";

  const explicitName = normalizeText(car.name ?? car.Name);
  const brand = getCarBrand(car);
  let model = getCarModel(car);

  if (brand && model.toLowerCase().startsWith(brand.toLowerCase())) {
    model = model.slice(brand.length).trim();
  }

  const combined = `${brand} ${model}`.trim();
  return combined || explicitName || "Nepoznat automobil";
};

export const getCarSubtitle = (car) => {
  const explicit = normalizeText(car?.subtitle ?? car?.Subtitle);
  if (explicit) return explicit;

  return [getCarYear(car), getCarBody(car), getCarFuel(car)]
    .filter(Boolean)
    .join(" • ");
};

export const formatPrice = (price) => {
  const numericPrice = Number(price);
  if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
    return "Cijena nije dostupna";
  }

  return new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(numericPrice);
};

export const getUniqueOptions = (cars, getter) =>
  [...new Set(cars.map(getter).filter(Boolean))].sort((first, second) =>
    String(first).localeCompare(String(second), "hr"),
  );

const includesAny = (text, values) =>
  values.some((value) => text.includes(value));

export const matchesCategory = (car, category) => {
  if (!category) return true;

  const name = getCarName(car).toLowerCase();
  const body = getCarBody(car).toLowerCase();
  const fuel = getCarFuel(car).toLowerCase();
  const horsepower = getCarHorsePower(car) || 0;
  const combined = `${name} ${body} ${fuel}`;

  switch (category) {
    case "electric":
      return includesAny(combined, ["electric", "elektr", "bev", "struja"]);
    case "suv":
      return includesAny(combined, [
        "suv",
        "crossover",
        "teren",
        "off-road",
        "jeep",
        "džip",
      ]);
    case "sport":
      return (
        horsepower >= 250 ||
        includesAny(combined, [
          "sport",
          "coupe",
          "coupé",
          "roadster",
          "gt",
          "performance",
          "racing",
        ])
      );
    case "city":
      return includesAny(combined, [
        "hatchback",
        "city",
        "gradski",
        "compact",
        "mini",
      ]);
    default:
      return true;
  }
};

export const serializeCar = (car) => ({
  ...car,
  id: getCarId(car),
  brand: getCarBrand(car),
  model: getCarModel(car),
  year: getCarYear(car),
  price: getCarPrice(car),
  fuelType: getCarFuel(car),
  bodyType: getCarBody(car),
  imageUrl: getCarImage(car),
  name: getCarName(car),
  subtitle: getCarSubtitle(car),
  match: getCarMatch(car),
});
