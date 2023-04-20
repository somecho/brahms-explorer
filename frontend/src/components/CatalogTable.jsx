import InfiniteScroll from "react-infinite-scroll-component";
import { Center, Container, Show, Text } from "@chakra-ui/react";
import CatalogTableMobile from "./CatalogTableMobile";
import CatalogTableFull from "./CatalogTableFull";

const CatalogTable = (props) => {
  return (
    <>
      {props.pieces.length > 0 || props.isLoading ? (
        <InfiniteScroll
          dataLength={props.pieces.length}
          next={() => props.next()}
          hasMore={props.hasMore}
        >
          <Container maxW="container.xl">
            <Show above="sm">
        <CatalogTableFull pieces={props.pieces} resultsSize={props.resultsSize}/>
            </Show>
            <Show below="sm">
        <CatalogTableMobile pieces={props.pieces} resultsSize={props.resultsSize}/>
            </Show>
          </Container>
        </InfiniteScroll>
      ) : (
        <Center>
          <Text>No results found...</Text>
        </Center>
      )}
    </>
  );
};

export default CatalogTable;
