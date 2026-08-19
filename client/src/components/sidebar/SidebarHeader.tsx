import type { SidebarProps } from "./Sidebar"

const SidebarHeader = ({ collapsed, onToggle }: SidebarProps) => {
  return (
    <div
          className={`
            flex
            h-16
            shrink-0
            items-center
            border-b
            border-neutral-800
            transition-all
            duration-300
            ${collapsed ? "justify-center px-0" : "gap-3 px-5"}
          `}
        >

          {/* LOGO - ALWAYS VISIBLE */}
          <button
            onClick={onToggle}
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-white
              font-bold
              text-black
              transition
              hover:bg-neutral-200
            "
          >
            H
          </button>


          {/* APP NAME - ONLY EXPANDED */}
          <span
            className={`
              whitespace-nowrap
              font-semibold
              transition-all
              duration-200
              ${
                collapsed
                  ? "w-0 overflow-hidden opacity-0"
                  : "w-auto opacity-100"
              }
            `}
          >
            Hive
          </span>

        </div>
  )
}

export default SidebarHeader