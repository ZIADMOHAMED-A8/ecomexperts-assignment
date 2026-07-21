import { Camera, ChevronDown, ChevronUp, RadioTower, Shield, ShieldCheck } from 'lucide-react'
import { ProductCard } from './ProductCard'

const stepIcons = {
  cameras: Camera,
  plan: Shield,
  sensors: RadioTower,
  protection: ShieldCheck,
}

export function BuilderAccordion({
  steps,
  openStep,
  onOpenStep,
  selectedCount,
  quantityFor,
  selection,
  onVariantChange,
  onQuantityChange,
}) {
  return (
    <section className="min-w-0" aria-label="Bundle builder">
      <h1 className="mb-6 text-center text-[32px] leading-none font-extrabold min-[1181px]:text-[34px]">Let's get started!</h1>
      {steps.map((step, index) => (
        <StepSection
          key={step.id}
          step={step}
          index={index}
          nextStep={steps[index + 1]}
          isOpen={openStep === step.id}
          selectedCount={selectedCount(step)}
          onOpenStep={onOpenStep}
          quantityFor={quantityFor}
          selection={selection}
          onVariantChange={onVariantChange}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </section>
  )
}

function StepSection({
  step,
  index,
  nextStep,
  isOpen,
  selectedCount,
  onOpenStep,
  quantityFor,
  selection,
  onVariantChange,
  onQuantityChange,
}) {
  const Icon = stepIcons[step.id]

  return (
    <section className="border-t border-[#7f858d] last:border-b">
      <button
        className="grid min-h-[70px] w-full grid-cols-[1fr_auto] border-0 bg-transparent px-[15px] py-3 pb-4 text-left min-[761px]:px-3.5"
        onClick={() => onOpenStep(isOpen ? '' : step.id)}
        type="button"
      >
        <span className="col-span-full text-[11px] tracking-[2px] text-[#3f4650]">STEP {index + 1} OF 4</span>
        <span className="inline-flex items-center gap-3 text-xl font-extrabold min-[761px]:text-[25px]">
          <Icon className="text-[#7a8491]" size={28} strokeWidth={1.5} />
          {step.title}
        </span>
        <span className="inline-flex items-center gap-1.5 self-center whitespace-nowrap text-[15px] text-[#5130e8]">
          {isOpen && selectedCount > 0 ? `${selectedCount} selected` : ''}
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {isOpen && (
        <div className="bg-[#edf5ff] px-5 py-3.5 min-[761px]:rounded-b-lg min-[761px]:p-4">
          <div className="grid grid-cols-1 justify-items-center gap-3.5 min-[761px]:grid-cols-2 min-[1451px]:grid-cols-5 min-[1451px]:items-stretch">
            {step.items.map((item) => {
              const activeVariant = item.variants?.length ? selection.activeVariants[item.id] || item.variants[0].id : null

              return (
                <ProductCard
                  key={item.id}
                  item={item}
                  activeVariant={activeVariant}
                  quantity={quantityFor(item)}
                  onVariantChange={onVariantChange}
                  onQuantityChange={onQuantityChange}
                />
              )
            })}
          </div>
          <button
            className="mx-auto mt-4 mb-0.5 block min-w-[250px] rounded-[7px] border border-[#5130e8] bg-transparent px-4.5 py-2.5 font-bold text-[#5130e8]"
            type="button"
            onClick={() => onOpenStep(nextStep?.id || step.id)}
          >
            Next: {nextStep?.title.toLowerCase() || 'review your system'}
          </button>
        </div>
      )}
    </section>
  )
}
