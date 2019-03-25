import { useState } from "react";

const useForm = callback => {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    if (event) event.preventDefault();
    setLoading(true);
    await callback();
    setLoading(false);
  };

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    loading,
    setLoading
  };
};

export default useForm;
