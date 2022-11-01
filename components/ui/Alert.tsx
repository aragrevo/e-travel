import { FC, useEffect } from "react";

interface Props {
  title: string;
  message: string;
  show: boolean;
  onClose: () => void;
}

export const Alert: FC<Props> = ({ title, message, show, onClose }) => {
  useEffect(() => {
    const timeout =
      show &&
      setTimeout(() => {
        onClose();
      }, 5000);

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [show, onClose]);

  return (
    <div
      className={` absolute top-0 right-0 mb-4 -translate-x-0.5 rounded border-0 bg-red-500 px-6 py-4 text-white transition-all duration-300 ${
        show ? "translate-y-0.5" : "-translate-y-96"
      }`}
    >
      <span className="mr-5 inline-block align-middle text-xl">
        <i className="fas fa-bell" />
      </span>
      <span className="mr-8 inline-block align-middle">
        <b className="capitalize">{title}!</b> {message}
      </span>
      <button
        onClick={onClose}
        className="absolute right-0 top-0 mt-4 mr-6 bg-transparent text-2xl font-semibold leading-none outline-none focus:outline-none"
      >
        <span>×</span>
      </button>
    </div>
  );
};
