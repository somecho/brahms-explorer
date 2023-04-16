import {
  Card,
  CardBody,
  Heading,
  Text,
  Stack,
  Tag,
} from "@chakra-ui/react";

const CatalogTableMobile = ({ pieces, resultsSize }) => {
  return (
    <>
      {pieces.map((p,i) => (
        <Card variant="outline" my="0.5em" key={p.uuid}>
          <CardBody py='0.8em'>
            <Text fontSize='xs' my='0.2em' color='gray.400'>{i+1}/{resultsSize}</Text>
            <Heading size="md">{p.title}</Heading>
            <Text mt="0.5em" mb="0.5em">
              {p.subtitle}
            </Text>
            <Stack direction="row" pt="0.2em">
              <Tag colorScheme="gray" variant="subtle" size="sm" p="0.2em">
                {p.year}
              </Tag>
              <Tag variant="outline">{p.composer}</Tag>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default CatalogTableMobile;
