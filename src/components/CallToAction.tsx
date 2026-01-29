import { useState } from "react"
import { HighlightedText } from "./HighlightedText"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Icon from "@/components/ui/icon"

export function CallToAction() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setSubmitStatus('success')
    setFormData({ name: '', phone: '', address: '', comment: '' })

    setTimeout(() => setSubmitStatus('idle'), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-32 md:py-29 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-8">Бесплатный замер</p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tight mb-6 text-balance">
              Закажите
              <br />
              <HighlightedText>бесплатный замер</HighlightedText>
            </h2>

            <p className="text-primary-foreground/70 text-lg leading-relaxed max-w-xl mx-auto">
              Оставьте заявку, и наш специалист приедет в удобное время с образцами тканей
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ваше имя *"
                required
                className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 h-12"
              />
            </div>

            <div>
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Телефон *"
                required
                className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 h-12"
              />
            </div>

            <div>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Адрес для замера *"
                required
                className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 h-12"
              />
            </div>

            <div>
              <Textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Комментарий (количество окон, пожелания по времени)"
                rows={4}
                className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50"
              />
            </div>

            {submitStatus === 'success' && (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <Icon name="CheckCircle" size={20} />
                <span>Заявка отправлена! Мы свяжемся с вами в ближайшее время.</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-foreground text-foreground hover:bg-primary-foreground/90 h-12 text-base font-medium"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Icon name="Loader2" className="animate-spin" size={20} />
                  Отправка...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Заказать бесплатный замер
                  <Icon name="ArrowRight" size={20} />
                </span>
              )}
            </Button>

            <p className="text-primary-foreground/50 text-xs text-center">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}