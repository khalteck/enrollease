/* eslint-disable react/prop-types */
import { HiCheck } from "react-icons/hi";
import { Toast } from "flowbite-react";

export default function RegSuccessToast({ message }) {
  return (
    <Toast className="absolute z-10 top-5 right-5 border border-[#10b981]">
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#10b981] text-white dark:bg-cyan-800 dark:text-cyan-200">
        <HiCheck className="h-5 w-5" />
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <Toast.Toggle />
    </Toast>
  );
}
