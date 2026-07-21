import { useMemo, useState } from 'react'
import { BuilderAccordion } from './components/BuilderAccordion'
import { ReviewPanel } from './components/ReviewPanel'
import bundle from './data/bundle.json'
import { money } from './utils/format'
import { getInitialSelection, STORAGE_KEY } from './utils/storage'

export default function App() {
  const [openStep, setOpenStep] = useState('cameras')
  const [savedNotice, setSavedNotice] = useState('')
  const [selection, setSelection] = useState(getInitialSelection)

  const allItems = useMemo(
    () => bundle.steps.flatMap((step) => step.items.map((item) => ({ ...item, stepId: step.id, category: step.category }))),
    [],
  )

  const reviewLines = useMemo(() => {
    return allItems.flatMap((item) => {
      if (item.variants?.length) {
        return item.variants
          .map((variant) => {
            const key = `${item.id}:${variant.id}`
            return { ...item, key, quantity: selection.quantities[key] || 0, variant }
          })
          .filter((line) => line.quantity > 0)
      }

      const quantity = selection.quantities[item.id] || 0
      return quantity > 0 ? [{ ...item, key: item.id, quantity }] : []
    })
  }, [allItems, selection.quantities])

  const totals = useMemo(() => {
    const subtotal = reviewLines.reduce((sum, line) => sum + line.compareAt * line.quantity, 0)
    const total = reviewLines.reduce((sum, line) => sum + line.price * line.quantity, 0)
    return { subtotal, total, savings: subtotal - total }
  }, [reviewLines])

  function setQuantity(key, delta, category) {
    setSelection((current) => ({
      ...current,
      quantities: updateQuantity(current.quantities, key, delta, category),
    }))
  }

  function setVariant(itemId, variantId) {
    setSelection((current) => ({
      ...current,
      activeVariants: { ...current.activeVariants, [itemId]: variantId },
    }))
  }

  function quantityFor(item) {
    const key = item.variants?.length ? `${item.id}:${selection.activeVariants[item.id] || item.variants[0].id}` : item.id
    return { key, count: selection.quantities[key] || 0 }
  }

  function selectedCount(step) {
    return step.items.filter((item) => {
      if (item.variants?.length) return item.variants.some((variant) => (selection.quantities[`${item.id}:${variant.id}`] || 0) > 0)
      return (selection.quantities[item.id] || 0) > 0
    }).length
  }

  function saveSystem(event) {
    event.preventDefault()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selection))
    setSavedNotice('Saved')
    window.setTimeout(() => setSavedNotice(''), 1800)
  }

  function checkout() {
    window.alert(`Prototype checkout: ${money(totals.total)} today, plus ${money(9.99)}/mo for Cam Unlimited.`)
  }

  return (
    <main className="mx-auto my-7 grid w-full max-w-[760px] grid-cols-1 items-start gap-0 text-[#14141b] min-[1181px]:my-11 min-[1181px]:w-[min(1280px,calc(100vw-48px))] min-[1181px]:max-w-none min-[1181px]:grid-cols-[minmax(0,1fr)_360px] min-[1181px]:gap-7 min-[1451px]:w-[min(1240px,calc(100vw-96px))] min-[1451px]:grid-cols-1">
      <BuilderAccordion
        steps={bundle.steps}
        openStep={openStep}
        onOpenStep={setOpenStep}
        selectedCount={selectedCount}
        quantityFor={quantityFor}
        selection={selection}
        onVariantChange={setVariant}
        onQuantityChange={setQuantity}
      />
      <ReviewPanel
        lines={reviewLines}
        totals={totals}
        onQuantity={setQuantity}
        onSave={saveSystem}
        savedNotice={savedNotice}
        onCheckout={checkout}
      />
    </main>
  )
}

function updateQuantity(quantities, key, delta, category) {
  const nextQuantity = Math.max(0, (quantities[key] || 0) + delta)

  if (category === 'Plan' && nextQuantity > 1) {
    return quantities
  }

  return {
    ...quantities,
    [key]: nextQuantity,
  }
}
