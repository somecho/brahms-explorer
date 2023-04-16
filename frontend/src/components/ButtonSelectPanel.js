import { Button } from "@chakra-ui/react";
import { useState } from "react";

const ButtonSelectPanel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      {props.buttons.map((b, i) => (
        <Button
          colorScheme="red"
          borderRadius="50px"
          size="xs"
          key={i}
          variant={i === activeIndex ? "solid" : "outline"}
          onClick={() => {
            props.onClick(b.field);
            setActiveIndex(i);
          }}
          m="0.1em"
        >
          {b.text}
        </Button>
      ))}
    </>
  );
};

export default ButtonSelectPanel;
