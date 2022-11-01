import { PlaceCard } from "@components/places";
import { Grid, Layout } from "@components/ui";
import { useLocalStorage } from "@hooks/index";
import { LocalStorageType } from "@model/local-storage-types";
import { Place } from "@model/place";

export default function Favorites() {
  const [favorites, setFavorites] = useLocalStorage<Place[]>(
    LocalStorageType.Favorites,
    []
  );

  return (
    <Layout>
      <h1 className="mb-2 text-3xl font-bold dark:text-white">Favorites</h1>
      <Grid className="my-4">
        {favorites.map((place) => (
          <PlaceCard
            place={place}
            key={place.link}
            btnText="Remove"
            toggleFavorite={() => {
              const newList = favorites.filter((f) => f.id !== place.id);
              setFavorites(newList);
            }}
          />
        ))}
      </Grid>
    </Layout>
  );
}
