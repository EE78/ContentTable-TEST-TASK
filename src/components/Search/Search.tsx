import "./SearchStyles.css";

export const Search = ({ onChange }: any) => {
  return <input type="text" placeholder="Поиск" onChange={onChange} />;
};
