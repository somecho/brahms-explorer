import { Center, Spinner as ChakraSpinner } from "@chakra-ui/react";
import { FC } from "react";

interface SpinnerProps {
	isLoading: boolean
}

const Spinner: FC<SpinnerProps> = ({ isLoading }) => (
	<>
		{isLoading &&
			<Center>
				<ChakraSpinner color="red.500" size="lg" />
			</Center>
		}
	</>
)

export default Spinner;
