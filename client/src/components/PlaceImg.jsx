export default function PlaceImg({ place, className = null, index = 0 }) {
  if (!place.photos.length) return "";

  if (!className) {
    className = "object-cover";
  }
  return (
    <img
      className={className}
      src={"http://localhost:4153/uploads/" + place.photos[index]}
      alt=""
    />
  );
}
