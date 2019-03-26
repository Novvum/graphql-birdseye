import React from "react";
import useForm from "../utils/useForms";
import { Button } from "./Buttons";
import { styled } from "../styled";
import { Flex, Box } from "@rebass/grid";

const Input = styled.input`
  background-color: ${p => p.theme.themeColors.inputBackgroundColor};
  color: ${p => p.theme.themeColors.lightText};
  border: ${p => p.theme.themeColors.inputBorder};
  padding: 15px 9px 15px 10px;
  width: 100%;
  max-width: 600px;
  margin-top: ${p => p.theme.sizes.small12};
  margin-bottom: ${p => p.theme.sizes.small12};
`;

export default ({ onSubmit, error }) => {
  const setSchema = async () => {
    await onSubmit(values.schema);
  };

  const { values, handleChange, handleSubmit, loading }: any = useForm(
    setSchema
  );

  console.log(loading);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          style={{ minWidth: "100%" }}
        >
          <Box width={[1]}>
            <Input
              name="schema"
              value={values.schema}
              onChange={handleChange}
              placeholder="Add url to introspect schema"
            />
          </Box>
          <Button style={{ marginTop: "20px" }} type="submit">
            {loading ? "Sending messenger pigeons..." : "Visualize my schema"}
          </Button>
        </Flex>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};
