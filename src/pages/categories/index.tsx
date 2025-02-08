import { useParams } from "react-router-dom";

const Category = () => {
  const { category } = useParams();

  return <div>Category is {category}</div>;
};

export default Category;
