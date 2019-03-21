import React from "react";
import useForm from "../utils/useForms";
import { Button } from "./Buttons";
import { styled } from "../styled";
import { Flex, Box } from "@rebass/grid";

const Input = styled.input`
  background-color: ${p => p.theme.themeColors.inputBackgroundColor};
  color: ${p => p.theme.themeColors.text};
  border: ${p => p.theme.themeColors.inputBorder};
  padding: 6px 9px 7px 10px;
  width: 100%;
  max-width: 600px;
`;

export default ({ onSubmit, error }) => {
  const setSchema = () => {
    onSubmit(values.schema);
  };

  const { values, handleChange, handleSubmit }: any = useForm(setSchema);

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
            />
          </Box>
          <Button style={{ marginTop: "20px" }} type="submit">
            Visualize my schema
          </Button>
        </Flex>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};
