import { Menu } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const vibes = ["Professional", "Casual", "Funny"];

export default function DropDown({ vibe, setVibe }) {
  return (
    <Menu as="div" className="relative block text-left w-full">
      <div>
        <Menu.Button className="inline-flex w-full justify-between items-center rounded-md border border-gray-600 bg-gray-900 px-4 py-2 text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
          {vibe}
          <ChevronUpIcon
            className="-mr-1 ml-2 h-5 w-5 ui-open:hidden"
            aria-hidden="true"
          />
          <ChevronDownIcon
            className="-mr-1 ml-2 h-5 w-5 hidden ui-open:block"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Menu.Items className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-gray-900 shadow-lg ring-1 ring-gray-600 ring-opacity-5 focus:outline-none">
        <div>
          {vibes.map((vibeItem) => (
            <Menu.Item key={vibeItem}>
              {({ active }) => (
                <button
                  onClick={() => setVibe(vibeItem)}
                  className={classNames(
                    active ? "bg-gray-800 text-white" : "text-gray-300",
                    vibe === vibeItem ? "bg-gray-700" : "",
                    "px-4 py-2 text-sm w-full text-left flex items-center space-x-2 justify-between"
                  )}
                >
                  <span>{vibeItem}</span>
                  {vibe === vibeItem ? (
                    <CheckIcon className="w-4 h-4 text-bold" />
                  ) : null}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
}