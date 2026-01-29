import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Индивидуальный подход",
    description:
      "Каждое окно уникально, как и ваш дом. Мы подбираем шторы под ваш стиль жизни, учитывая каждую деталь интерьера.",
  },
  {
    title: "Качественные ткани",
    description:
      "Работаем только с проверенными европейскими поставщиками. Натуральные материалы, которые служат годами.",
  },
  {
    title: "Точный замер и монтаж",
    description:
      "Бесплатный выезд замерщика и профессиональная установка. Шторы будут сидеть идеально.",
  },
  {
    title: "Гарантия 2 года",
    description: "Мы уверены в качестве своей работы и даем расширенную гарантию на все изделия и установку.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Title and image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Почему мы</p>
            <h2 className="text-6xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Шторы с
              <br />
              <HighlightedText>заботой</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="/images/exterior.png"
                alt="Образцы тканей для штор"
                className="opacity-90 relative z-10 w-auto"
              />
            </div>
          </div>

          {/* Right column - Description and Philosophy items */}
          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Шторы - это не просто ткань на окнах. Это атмосфера вашего дома, комфорт и стиль. Мы создаем уют, который хочется чувствовать каждый день.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}