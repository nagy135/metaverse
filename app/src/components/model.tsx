import { useParams } from "react-router-dom";

export default () => {
  const { id } = useParams();
  console.log(id);

  return <h1 className="text-3xl font-bold underline">Model</h1>;
};
