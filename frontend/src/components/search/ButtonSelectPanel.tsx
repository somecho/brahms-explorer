import { Button as ChakraButton } from "@chakra-ui/react";
import { useState, FC } from "react";
import { Button } from "../../types/Button"
import { Ordering } from "../../types/Ordering";

interface ButtonSelectPanelProps {
	buttons: Button[],
	onClick: Ordering
}

const ButtonSelectPanel: FC<ButtonSelectPanelProps> = ({ buttons, onClick }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	return (
		<>
			{buttons.map((b: Button, i: number) => (
				<ChakraButton
					colorScheme="red"
					borderRadius="50px"
					size="xs"
					key={i}
					variant={i === activeIndex ? "solid" : "outline"}
					onClick={() => {
						onClick(b.field);
						setActiveIndex(i);
					}}
					m="0.1em"
				>
					{b.text}
				</ChakraButton>
			))}
		</>
	);
};

export default ButtonSelectPanel;
