import React from 'react';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from '@material-tailwind/react';
import { IModalProps } from '../../../utilities/interface';
import { translate, useState } from '../../../utilities/commonImports';

const Modal: React.FC<IModalProps> = ({
	openModal,
	headerKey,
	bodyKey,
	size,
	onCancel = undefined,
	onConfirm = undefined,
}) => {
	const [open, setOpen] = useState(true);

	const cancel = () => {
		setOpen(false);
		if (onCancel) {
			onCancel();
		}
	};

	const ok = () => {
		setOpen(false);
		if (onConfirm) {
			onConfirm();
		}
	};

	return (
		<div>
			<Dialog
				open={openModal}
				handler={setOpen}
				size={size}
				animate={{
					mount: { scale: 1 },
					unmount: { scale: 0.9 },
				}}
			>
				<DialogHeader className="text-center">
					{translate(headerKey)}
				</DialogHeader>
				<DialogBody className="text-center">{translate(bodyKey)}</DialogBody>
				<DialogFooter>
					{onCancel && (
						<Button color="red" onClick={cancel}>
							{translate('modal.cancel')}
						</Button>
					)}
					{onConfirm && (
						<Button color="green" onClick={ok}>
							{translate('modal.ok')}
						</Button>
					)}
				</DialogFooter>
			</Dialog>
		</div>
	);
};

export default Modal;
