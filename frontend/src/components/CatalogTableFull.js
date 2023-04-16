import { Table, Tbody, Tr, Td, Tag } from "@chakra-ui/react";

const CatalogTableFull = ({ pieces, resultsSize }) => {
  return (
    <Table variant="simple" size="sm">
      <Tbody>
        {pieces.map((p,i) => (
          <Tr
            key={p.uuid}
            _hover={{ background: "red.100" }}
            transition="0.25s"
          >
            <Td fontSize='xs' color='gray.400'>{i+1}/{resultsSize}</Td>
            <Td>{p.title}</Td>
            <Td>{p.subtitle}</Td>
            <Td>{p.composer}</Td>
            <Td>
              <Tag colorscheme="gray" variant="solid">
                {p.year}
              </Tag>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default CatalogTableFull;
