import React from "react";
import useForm from "../utils/useForms";
import { Button } from "./Buttons";
import { styled } from "../styled";
import { Flex, Box } from "@rebass/grid";
import { SchemaDropdown } from "./SchemaDropdown";

const Input = styled.input`
  background-color: ${(p) => p.theme.themeColors.inputBackgroundColor};
  color: ${(p) => p.theme.themeColors.lightText};
  border: ${(p) => p.theme.themeColors.inputBorder};
  padding: 15px 9px 15px 10px;
  width: 100%;
  max-width: 600px;
  margin-top: ${(p) => p.theme.sizes.small12};
  margin-bottom: ${(p) => p.theme.sizes.small12};
`;

const Error = styled.p`
  color: ${(p) => p.theme.themeColors.errorText};
`;

export default ({ onSubmit, error, presetOptions }) => {
  const setSchema = async (preset) => {
    if (preset) {
      await onSubmit("", preset);
      return;
    }
    await onSubmit(values.schema);
  };

  const { values, handleChange, handleSubmit, loading }: any = useForm(
    setSchema
  );

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
              placeholder="Add your public GraphQL endpoint"
            />
          </Box>
          {error && <Error>{error}</Error>}
          <Flex
            style={{ marginTop: "20px" }}
            alignItems="center"
            justifyContent="flex-start"
            flexWrap="wrap"
          >
            <Flex pb={20}>
              <Button style={{ marginRight: "15px" }} type="submit">
                {loading
                  ? "Sending messenger pigeons..."
                  : "Visualize my schema"}
              </Button>
            </Flex>
            <Flex width={[1, 1 / 2]} alignItems="center" pb={20}>
              or
              <SchemaDropdown onSelect={setSchema} options={presetOptions} />
            </Flex>
          </Flex>
        </Flex>
      </form>
    </div>
  );
};
