import type { DictionaryExplorarVenue } from "@/i18n/dictionaries";

export type ExplorarActiveFilter =
  | { type: "all" }
  | { type: "category"; key: string }
  | { type: "location"; key: string; maxKm: number };

export function filterExplorarVenues(
  venues: DictionaryExplorarVenue[],
  activeFilter: ExplorarActiveFilter
): DictionaryExplorarVenue[] {
  if (activeFilter.type === "all") return venues;
  if (activeFilter.type === "category") {
    return venues.filter((v) => v.categoryKey === activeFilter.key);
  }
  return venues.filter((v) => v.distanceKm <= activeFilter.maxKm);
}
