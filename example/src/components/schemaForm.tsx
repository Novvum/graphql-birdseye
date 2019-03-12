import React from "react";
import useForm from "../utils/useForms";

export default ({ onSubmit, error }) => {
  const setSchema = () => {
    onSubmit(values.schema);
  };

  const { values, handleChange, handleSubmit }: any = useForm(setSchema);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="schema" value={values.schema} onChange={handleChange} />
        <button type="submit">See my schema</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};
