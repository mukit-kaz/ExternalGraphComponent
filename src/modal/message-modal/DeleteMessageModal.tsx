import { Modal } from "rsuite";
import rectangleTrashIcon from "../../assets/icons/rectangle_trash_icon.svg";
import { CgClose } from "react-icons/cg";
import React from "react"

export type ExtraButton = {
  buttonText?: string;
  buttonCallback: () => void;
};

type MessageModalProps = {
  title: string | React.JSX.Element;
  message: string | React.JSX.Element;
  okButtonCallback: () => void;
  cancelButtonCallback: () => void;
  isOpen: boolean;
  okButtonText?: string;
  okButtonTooltip?: string | React.JSX.Element;
  cancelButtonText?: string;
  cancelButtonTooltip?: string | React.JSX.Element;
  disableCloseBtn?: boolean;
  extraButtons?: ExtraButton[];
  extraButtonTooltip?: string | React.JSX.Element;
  isOkDisabled?: boolean;
};

export default function DeleteMessageModal(props: MessageModalProps) {
  return (
    <Modal
      open={props.isOpen}
      onClose={props.cancelButtonCallback}
      backdrop="static"
      size="28.125rem"
      className="custom-modal"
    >
      <Modal.Body>
          {/* Modal Body Content */}
          <div className="relative flex flex-col items-center justify-center gap-7 px-7 pt-10 pb-4">
            {/* Close Button */}
            {!props.disableCloseBtn && (
              <button
                className="absolute top-4 right-4 w-8 h-8 reg-icon-button reg-button-transparent"
                onClick={props.cancelButtonCallback}
              >
                <CgClose className="h-5 w-5 text-reg-gray-500" />
              </button>
            )}

            {/* Icon */}
            <img className="w-6.25" src={rectangleTrashIcon} alt="delete Modal Icon" />

            {/* Text Section */}
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-reg-gray-950 text-18-semibold text-center">
                {props.title}
              </h3>
              <p className="text-center text-reg-gray-600 text-14-regular">
                {props.message}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-center items-start gap-3 py-5 pr-7 pl-7 w-full">
            <button
              className="reg-tertiary-button-neutral button-medium"
              onClick={props.cancelButtonCallback}
            >
              {props.cancelButtonText || "Cancel"}
            </button>
            <button
              className="reg-danger-button button-medium"
              onClick={props.okButtonCallback}
            >
              {props.okButtonText || "Delete"}
            </button>
          </div>
      </Modal.Body>
    </Modal>
  );
}

