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
import {
	ErrorIcon,
	SuccessIcon,
	WarningIcon,
} from '../../../utilities/imageLogoImports';

const Modal: React.FC<IModalProps> = ({
	eventType = 'success',
	openModal,
	headerKey,
	bodyKey,
	backdropDismiss = false,
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

	const getDesiredIcon = () => {
		const iconProps = {
			style: { fontSize: 60 },
			className: 'opacity-60',
			color: eventType,
		};

		switch (eventType) {
			case 'warning':
				return <WarningIcon {...iconProps} />;
			case 'success':
				return <SuccessIcon {...iconProps} />;
			case 'error':
				return <ErrorIcon {...iconProps} />;
		}
	};

	return (
		<div>
			<Dialog
				open={openModal}
				handler={setOpen}
				size={size}
				dismiss={{
					enabled: backdropDismiss,
					escapeKey: false,
				}}
				animate={{
					mount: { scale: 1 },
					unmount: { scale: 0.9 },
				}}
			>
				<DialogHeader className="justify-center">
					<div className="text-center">
						{getDesiredIcon()}
						<div className="mt-2">{translate(headerKey)}</div>
					</div>
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
