import { customers } from "../../assets/CustomerData";

const Castomers = () => {
  return (
    <>
      <h1>
        {customers.map(({ id, name, industry }) => {
          console.log(industry);

          return <p key={id}>{name}</p>;
        })}
      </h1>
    </>
  );
};

export default Castomers;
