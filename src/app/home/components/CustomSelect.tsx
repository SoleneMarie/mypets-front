"use client";

import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

type Option = {
  label: string;
  value: string | number;
};

type Props = {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: Option[];
  width: string;
};

export default function CustomSelect({
  label,
  value,
  onChange,
  options,
  width,
}: Props) {
  const selected =
    options.find((option) => option.value === value) || options[0];

  return (
    <div className={`text-sm mb-2 flex`}>
      <label
        htmlFor="specie"
        className="text-sm font-medium mt-0.5 opacity-90 mr-2 mt-1"
      >
        {label}
      </label>
      <Listbox value={value} onChange={onChange}>
        <div className={`relative ${width}`}>
          <Listbox.Button className="bg-[var(--background)] text-[var(--foreground)] w-full cursor-pointer rounded-xl py-1 px-3 text-center shadow-lg font-semibold flex items-center justify-between text-sm">
            <span className="w-full truncate text-center">
              {selected.label}
            </span>
            <ChevronDown className="w-4 h-4" />
          </Listbox.Button>

          <Listbox.Options className="hide-scrollbar text-[var(--foreground)] font-medium absolute mt-2 max-h-30 w-full overflow-auto rounded-xl bg-[var(--background)] py-1 shadow-lg border border-gray-200 z-10">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  `cursor-pointer select-none py-2 ${
                    active ? "bg-gray-100" : ""
                  }`
                }
              >
                <div className="w-full flex justify-center items-center gap-2 truncate">
                  <span className="text-sm">{option.label}</span>
                </div>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
