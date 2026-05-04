export interface LocalNewsSource {
  id: string;
  name: string;
  region: string;
  lat: number;
  lon: number;
  color: string;
  apiPath: string;
}

export const LOCAL_NEWS_SOURCES: LocalNewsSource[] = [
  {
    id: "martinique",
    name: "France Antilles Martinique",
    region: "Martinique",
    lat: 14.6415,
    lon: -61.0242,
    color: "#f59e0b",
    apiPath: "/api/local-news/martinique",
  },
];
