import { latLngToCell } from "h3-js";

export interface CellsAtLevels {
  geoCellRes0: string;
  geoCellRes1: string;
  geoCellRes2: string;
  geoCellRes3: string;
  geoCellRes4: string;
  geoCellRes5: string;
  geoCellRes6: string;
  geoCellRes7: string;
  geoCellRes8: string;
  geoCellRes9: string;
  geoCellRes10: string;
  geoCellRes11: string;
  geoCellRes12: string;
  geoCellRes13: string;
  geoCellRes14: string;
  geoCellRes15: string;
}

export const latLngToAllCellLevels = (
  lat: number,
  lon: number
): CellsAtLevels | null => {
  if (!lat || !lon) return null;

  return {
    geoCellRes0: latLngToCell(lat, lon, 0),
    geoCellRes1: latLngToCell(lat, lon, 1),
    geoCellRes2: latLngToCell(lat, lon, 2),
    geoCellRes3: latLngToCell(lat, lon, 3),
    geoCellRes4: latLngToCell(lat, lon, 4),
    geoCellRes5: latLngToCell(lat, lon, 5),
    geoCellRes6: latLngToCell(lat, lon, 6),
    geoCellRes7: latLngToCell(lat, lon, 7),
    geoCellRes8: latLngToCell(lat, lon, 8),
    geoCellRes9: latLngToCell(lat, lon, 9),
    geoCellRes10: latLngToCell(lat, lon, 10),
    geoCellRes11: latLngToCell(lat, lon, 11),
    geoCellRes12: latLngToCell(lat, lon, 12),
    geoCellRes13: latLngToCell(lat, lon, 13),
    geoCellRes14: latLngToCell(lat, lon, 14),
    geoCellRes15: latLngToCell(lat, lon, 15),
  };
};
