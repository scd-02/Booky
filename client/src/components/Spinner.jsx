import ClipLoader from "react-spinners/ClipLoader";
export default function Spinner({ loading }) {
  return (
    <div className="h-screen  flex justify-center items-center">
      <ClipLoader size={70}
      color="#F5385D"/>
    </div>
  );
}
