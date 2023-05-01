import { FC } from "react";
import SimpleModal from "./Modal";
import { ModalProps } from "../../types/ModalProps";

const NotAdminModal: FC<ModalProps> = ({ isOpen, onClose }) => (
	<SimpleModal
		isOpen={isOpen}
		onClose={onClose}
		header="Not enough permissions"
		body="Only admins can modify the database. 
							Reach out if you want to become an admin.
							If you are an admin and you are seeing this, your session has expired.
							Please logout and login again."

	/>
)
export default NotAdminModal

