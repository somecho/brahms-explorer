import {
  Container,
  Center,
  FormControl,
  Input,
  IconButton,
  InputRightElement,
  InputGroup,
  Tag,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import ButtonSelectPanel from "./ButtonSelectPanel";

const SearchBar = (props) => {
  const [keywords, setKeywords] = useState(props.queryParams.keywords.replace(',',' ') || "");

  return (
    <Container p="0.5em">
      <Center p="0.2em">
        <FormControl py='0.25em'>
          <Flex >
            <InputGroup>
              <InputRightElement
                children={
                  <Tag size="sm" variant="outline" mr='5em' textAlign='right'>
                    {props.resultsSize} results
                  </Tag>
                }
              />
              <Input
                placeholder="search keywords..."
                id="search-input"
                name="search-input"
                htmlSize="64"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </InputGroup>
            <IconButton
              colorScheme="red"
              aria-label="Search database"
              icon={<SearchIcon />}
              onClick={() => props.onSearch(keywords)}
              isLoading={props.isLoading}
              mx='4px'
            />
          </Flex>
        </FormControl>
      </Center>
      <Flex justify="center" wrap="wrap" mb={['0.5em','0em']}>
        <ButtonSelectPanel buttons={props.sort} onClick={props.setSort} />
        <ButtonSelectPanel buttons={props.order} onClick={props.setOrder} />
      </Flex>
    </Container>
  );
};

export default SearchBar;
