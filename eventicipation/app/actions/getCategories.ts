import categories from "../components/categories";

export default function getCategories(label: string) {
  return categories.find((cat) => cat.label == label);
}
