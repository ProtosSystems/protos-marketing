import { RiCheckLine, RiCircleLine, RiTimelineView } from '@remixicon/react'
import {
  ArrowPathIcon,
  CircleStackIcon,
  ClockIcon,
  DocumentCheckIcon,
  LinkIcon,
} from '@heroicons/react/20/solid'
import { Orbit } from '@/components/orbit'

export function ArcheOrbitVisual() {
  return (
    <div aria-hidden="true">
      <Orbit
        durationSeconds={55}
        radiusPx={140}
        keepUpright
        orbitingObjects={[
        <div key="obj1" className="relative flex items-center justify-center">
          <ArrowPathIcon className="z-10 size-5 text-gray-900" />
          <div className="absolute size-10 rounded-full bg-white shadow-lg ring-1 ring-black/10"></div>
          <div className="absolute -top-5 left-4">
            <div className="flex gap-1">
              <div className="flex items-center justify-center rounded-l-full bg-red-500 p-1 text-xs ring-1 ring-gray-200">
                <RiCircleLine className="size-3 shrink-0 text-white" />
              </div>
              <div className="rounded-r-full bg-white py-0.5 pr-1.5 pl-1 text-sm font-normal whitespace-nowrap text-[#0B1220] ring-1 ring-gray-300 dark:bg-[#0B1F3B] dark:text-[#F1F5F9]">
                Restated
              </div>
            </div>
          </div>
          <div
            style={{
              animationDelay: '1s',
            }}
            className="absolute size-10 animate-[ping_7s_ease_infinite] rounded-full ring-1 ring-[#0B1F3B]/35 dark:ring-white/25"
          ></div>
        </div>,

        <div key="obj2" className="relative flex items-center justify-center">
          <ClockIcon className="z-10 size-5 text-gray-900" />
          <div className="absolute size-10 rounded-full bg-white shadow-lg ring-1 ring-black/10"></div>
          <div className="absolute -top-5 left-4">
            <div className="flex gap-1">
              <div className="flex items-center justify-center rounded-l-full bg-gray-500 p-1 text-xs ring-1 ring-gray-200">
                <RiTimelineView className="size-3 shrink-0 text-white" />
              </div>
              <div className="rounded-r-full bg-white py-0.5 pr-1.5 pl-1 text-xs font-normal leading-4 whitespace-nowrap text-[#0B1220] ring-1 ring-gray-300 dark:bg-[#0B1F3B] dark:text-[#F1F5F9]">
                Temporal
              </div>
            </div>
          </div>
          <div
            style={{
              animationDelay: '4s',
            }}
            className="absolute size-10 animate-[ping_7s_ease_infinite] rounded-full ring-1 ring-[#0B1F3B]/35 dark:ring-white/25"
          ></div>
        </div>,

        <div key="obj3" className="relative flex items-center justify-center">
          <CircleStackIcon className="z-10 size-5 text-gray-900" />
          <div className="absolute size-10 rounded-full bg-white shadow-lg ring-1 ring-black/10"></div>
          <div
            style={{
              animationDelay: '2s',
            }}
            className="absolute size-10 animate-[ping_7s_ease_infinite] rounded-full ring-1 ring-[#0B1F3B]/35 dark:ring-white/25"
          ></div>
        </div>,
        <div key="obj4" className="relative flex items-center justify-center">
          <DocumentCheckIcon className="z-10 size-5 text-gray-900" />
          <div className="absolute size-10 rounded-full bg-white shadow-lg ring-1 ring-black/10"></div>
          <div className="absolute -top-5 left-4">
            <div className="flex gap-1">
              <div className="flex items-center justify-center rounded-l-full bg-emerald-500 p-1 text-xs ring-1 ring-gray-200">
                <RiCheckLine className="size-3 shrink-0 text-white" />
              </div>
              <div className="rounded-r-full bg-white py-0.5 pr-1.5 pl-1 text-sm font-normal text-[#0B1220] ring-1 ring-gray-300 dark:bg-[#0B1F3B] dark:text-[#F1F5F9]">
                Reconciled
              </div>
            </div>
          </div>

          <div
            style={{
              animationDelay: '6s',
            }}
            className="absolute size-10 animate-[ping_7s_ease_infinite] rounded-full ring-1 ring-[#0B1F3B]/35 dark:ring-white/25"
          ></div>
        </div>,
        <div key="obj5" className="relative flex items-center justify-center">
          <LinkIcon className="z-10 size-5 text-gray-900" />
          <div className="absolute size-10 rounded-full bg-white shadow-lg ring-1 ring-black/10"></div>
          <div
            style={{
              animationDelay: '3s',
            }}
            className="absolute size-10 animate-[ping_7s_ease_infinite] rounded-full ring-1 ring-[#0B1F3B]/35 dark:ring-white/25"
          ></div>
        </div>,
        ]}
      >
        <div className="relative flex h-48 w-48 items-center justify-center">
          <div className="rounded-full p-1 ring-1 ring-black/10">
            <div className="relative z-10 flex size-20 items-center justify-center rounded-full bg-white shadow-[inset_0px_-15px_20px_rgba(0,0,0,0.1),0_7px_10px_0_rgba(0,0,0,0.15)] ring-1 ring-black/20 dark:bg-[color:var(--color-primary)] dark:ring-white/15">
              <span className="h3 font-regular text-2xl tracking-tight text-[color:var(--color-primary)] dark:text-white">
                arche
              </span>
            </div>
            <div className="absolute inset-12 animate-[spin_8s_linear_infinite] rounded-full bg-linear-to-t from-transparent via-[#0B1F3B]/40 to-transparent blur-lg dark:via-white/25" />
          </div>
        </div>
      </Orbit>
    </div>
  )
}
