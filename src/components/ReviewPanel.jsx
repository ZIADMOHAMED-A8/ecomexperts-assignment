import { CreditCard, Shield, Truck } from 'lucide-react'
import { money } from '../utils/format'
import { Stepper } from './Stepper'

const REVIEW_GROUPS = ['Cameras', 'Sensors', 'Accessories', 'Plan']

export function ReviewPanel({ lines, totals, onQuantity, onSave, savedNotice, onCheckout }) {
  return (
    <aside
      className="static rounded-none bg-[#edf5ff] p-5 min-[1181px]:sticky min-[1181px]:top-5 min-[1181px]:rounded-lg min-[1451px]:static min-[1451px]:grid min-[1451px]:grid-cols-[minmax(0,1fr)_520px] min-[1451px]:gap-x-12 min-[1451px]:p-8 min-[1451px]:px-14"
      aria-label="Your security system"
    >
      <div className="grid grid-cols-[92px_minmax(0,1fr)] content-start items-center gap-3.5 min-[1451px]:col-start-2 min-[1451px]:row-start-1 min-[1451px]:row-span-4 min-[1451px]:self-start">
        <div className="grid h-[82px] w-[82px] -rotate-12 place-items-center rounded-full bg-[#5130e8] text-center text-[10px] leading-[1.05] font-bold text-white">
          100%
          <br />
          Wyze
          <br />
          satisfaction
          <br />
          guarantee
        </div>
        <div className="hidden gap-3 text-[13px] leading-tight min-[761px]:grid">
          <strong className="text-lg">30-day hassle-free returns</strong>
          <span>If you're not totally in love with the product, we will refund you 100%.</span>
        </div>
        <div className="col-span-full flex flex-col items-end gap-1.5">
          <span className="rounded-[3px] bg-[#5130e8] px-2 py-1 text-xs text-white">as low as $19.19/mo</span>
          <div className="flex items-baseline gap-2">
            <s className="text-[#69717c]">{money(totals.subtotal)}</s>
            <strong className="text-[26px] font-extrabold text-[#5130e8]">{money(totals.total)}</strong>
          </div>
        </div>

        <p className="col-span-full my-2 mt-3 text-center text-xs font-bold text-[#00a886]">
          Congrats! You're saving {money(totals.savings)} on your security bundle!
        </p>
        <button
          className="col-span-full inline-flex h-12 w-full items-center justify-center gap-2 rounded bg-[#5130e8] text-[17px] font-extrabold text-white"
          type="button"
          onClick={onCheckout}
        >
          <CreditCard size={18} />
          Checkout
        </button>
        <a className="col-span-full mt-2.5 block text-center text-[13px] text-[#6c6f77] italic underline" href="/" onClick={onSave}>
          Save my system for later
        </a>
        {savedNotice && <span className="col-span-full mt-1.5 block text-center text-xs font-bold text-[#00a886]">{savedNotice}</span>}
      </div>

      <span className="mt-5 mb-0 block text-[11px] tracking-[2px] text-[#3f4650] min-[1181px]:hidden">REVIEW</span>
      <h2 className="mt-1 mb-1 text-2xl leading-[1.1] font-extrabold min-[1451px]:col-start-1 min-[1451px]:row-start-1 min-[1451px]:mt-5">Your security system</h2>
      <p className="m-0 leading-tight text-[#555c68] min-[1451px]:col-start-1 min-[1451px]:row-start-2">
        Review your personalized protection system designed to keep what matters most safe.
      </p>

      <div className="mt-3.5 border-t border-[#cfd7e1] min-[1451px]:col-start-1 min-[1451px]:row-start-3">
        {REVIEW_GROUPS.map((group) => {
          const groupLines = lines.filter((line) => line.category === group)
          if (!groupLines.length) return null

          return (
            <section className="border-b border-[#cfd7e1] py-3 pb-2.5" key={group}>
              <h3 className="mb-2 text-xs font-medium text-[#a7b0bd] uppercase">
                {group === 'Plan' ? (
                  <>
                    <span className="min-[1181px]:hidden">Home Monitoring Plan</span>
                    <span className="hidden min-[1181px]:inline">Plan</span>
                  </>
                ) : (
                  group
                )}
              </h3>
              {groupLines.map((line) => (
                <ReviewLine key={line.key} line={line} onQuantity={onQuantity} />
              ))}
            </section>
          )
        })}
      </div>

      <div className="flex items-center justify-between border-b border-[#cfd7e1] py-3.5 min-[1451px]:col-start-1 min-[1451px]:row-start-4">
        <span className="inline-flex items-center gap-2.5 text-sm">
          <Truck className="text-[#00a886]" size={30} />
          Fast Shipping
        </span>
        <span className="inline-flex items-center gap-2.5 text-sm">
          <s className="text-[#69717c]">$5.99</s>
          <strong className="font-bold text-[#5130e8]">FREE</strong>
        </span>
      </div>
    </aside>
  )
}

function ReviewLine({ line, onQuantity }) {
  const showStepper = line.category !== 'Plan'
  const priceColumnClass = showStepper
    ? 'col-start-3 row-span-2 row-start-1 min-[761px]:col-auto min-[761px]:row-auto'
    : 'col-start-3 row-span-2 row-start-1 min-[761px]:col-start-4 min-[761px]:row-auto'

  return (
    <div className="grid min-h-12 grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-2.5 min-[761px]:grid-cols-[40px_minmax(0,1fr)_auto_58px]">
      <Thumb line={line} />
      <span className="min-w-0 text-sm leading-[1.1]">
        {line.category === 'Plan' ? (
          <>
            {line.name.split(' ')[0]}{' '}
            <span className="font-bold text-[#5130e8]">{line.name.split(' ').slice(1).join(' ')}</span>
          </>
        ) : (
          <>
            {line.name}
            {line.variant && line.variant.name !== 'White' ? ` - ${line.variant.name}` : ''}
          </>
        )}
      </span>
      {showStepper && (
        <div className="col-start-2 justify-self-start min-[761px]:col-auto min-[761px]:justify-self-auto">
          <Stepper count={line.quantity} onMinus={() => onQuantity(line.key, -1, line.category)} onPlus={() => onQuantity(line.key, 1, line.category)} />
        </div>
      )}
      <span className={`${priceColumnClass} grid justify-items-end gap-0.5 self-center text-xs text-[#606773]`}>
        {line.compareAt !== line.price && (
          <s className="text-[#69717c]">
            {money(line.compareAt * line.quantity)}
            {line.billing || ''}
          </s>
        )}
        <strong className="font-bold text-[#5130e8]">
          {money(line.price * line.quantity)}
          {line.billing || ''}
        </strong>
      </span>
    </div>
  )
}

function Thumb({ line }) {
  if (line.image) return <img className="h-[38px] w-[38px] rounded-[5px] bg-white object-contain mix-blend-multiply" src={line.image} alt="" />
  return (
    <span className="grid h-[38px] w-[38px] place-items-center rounded-[5px] bg-white text-[#5130e8]">
      <Shield size={22} />
    </span>
  )
}
