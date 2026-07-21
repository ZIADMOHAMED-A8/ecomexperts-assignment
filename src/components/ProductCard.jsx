import { money } from '../utils/format'
import { Stepper } from './Stepper'

export function ProductCard({ item, activeVariant, quantity, onVariantChange, onQuantityChange }) {
  return (
    <article
      className={`relative grid min-h-[158px] w-full grid-cols-[116px_minmax(0,1fr)] grid-rows-[1fr_auto] rounded-lg border-2 bg-white p-2.5 min-[761px]:[&:nth-child(5)]:col-span-full min-[761px]:[&:nth-child(5)]:max-w-[390px] min-[1451px]:min-h-[330px] min-[1451px]:max-w-none min-[1451px]:grid-cols-1 min-[1451px]:grid-rows-[150px_auto_1fr_auto] min-[1451px]:[&:nth-child(5)]:col-auto ${
        quantity.count > 0 ? 'border-[#7b61ff]' : 'border-transparent'
      }`}
    >
      {item.badge && (
        <span className="absolute top-2.5 left-2.5 z-10 rounded-full bg-[#5130e8] px-2 py-1 text-xs font-bold text-white">
          {item.badge}
        </span>
      )}
      <img
        className="self-center mix-blend-multiply h-[104px] w-[106px] object-contain min-[1451px]:h-[150px] min-[1451px]:w-full"
        src={item.image || '/favicon.svg'}
        alt=""
      />
      <div>
        <h2 className="mb-1 text-[17px] leading-[1.1] font-bold">{item.name}</h2>
        <p className="m-0 text-[13px] leading-tight text-[#5d6270]">
          {item.description}{' '}
          <a className="font-medium text-[#0000ee] underline" href="https://www.wyze.com/" target="_blank">
            Learn More
          </a>
        </p>
        {!!item.variants?.length && (
          <div className="mt-2.5 flex flex-wrap gap-1.5" aria-label={`${item.name} variants`}>
            {item.variants.map((variant) => (
              <button
                className={`inline-flex h-7 items-center gap-1 rounded-[2px] border px-2 text-xs ${
                  activeVariant === variant.id ? 'border-[#77e1cf] bg-[#f2fffd]' : 'border-[#d8dde5] bg-white'
                }`}
                key={variant.id}
                onClick={() => onVariantChange(item.id, variant.id)}
                type="button"
              >
                <span className="h-3.5 w-3.5 rounded-[2px] border border-[#d5d8de]" style={{ background: variant.swatch }} />
                {variant.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <CardFooter
        count={quantity.count}
        compareAt={item.compareAt}
        price={item.price}
        onMinus={() => onQuantityChange(quantity.key, -1)}
        onPlus={() => onQuantityChange(quantity.key, 1)}
      />
    </article>
  )
}

function CardFooter({ count, compareAt, price, onMinus, onPlus }) {
  return (
    <div className="col-start-2 mt-2 flex items-center justify-between gap-2.5 min-[1451px]:col-start-1">
      <Stepper count={count} onMinus={onMinus} onPlus={onPlus} />
      <div className="grid justify-items-end gap-0.5 text-[15px] text-[#606773]">
        {compareAt !== price && <s className="text-[#e5483b]">{money(compareAt)}</s>}
        <strong className="font-bold text-[#5130e8]">{money(price)}</strong>
      </div>
    </div>
  )
}
