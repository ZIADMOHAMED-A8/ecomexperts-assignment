import { Minus, Plus } from 'lucide-react'

export function Stepper({ count, onMinus, onPlus }) {
  return (
    <div className="inline-grid grid-cols-[22px_24px_22px] items-center justify-items-center gap-1 whitespace-nowrap">
      <button
        className="grid h-[22px] w-[22px] place-items-center rounded-[5px] border-0 bg-[#edf3fa] text-[#2a3340] disabled:cursor-default disabled:opacity-45"
        type="button"
        onClick={onMinus}
        disabled={count === 0}
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      <span className="text-sm font-bold">{count}</span>
      <button
        className="grid h-[22px] w-[22px] place-items-center rounded-[5px] border-0 bg-[#edf3fa] text-[#2a3340]"
        type="button"
        onClick={onPlus}
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  )
}
