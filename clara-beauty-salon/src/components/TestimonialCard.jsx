import { Star } from 'lucide-react'

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-clara-100 flex items-center justify-center shrink-0">
          <span className="text-clara-700 font-semibold text-sm">{testimonial.initial}</span>
        </div>
        <div>
          <p className="font-medium text-gray-800 text-sm">{testimonial.name}</p>
          <p className="text-xs text-gray-400">{testimonial.service}</p>
        </div>
        <div className="ml-auto flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < testimonial.rating
                  ? 'fill-clara-400 text-clara-400'
                  : 'text-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed italic">
        "{testimonial.comment}"
      </p>

      <p className="text-xs text-gray-400">{testimonial.date}</p>
    </div>
  )
}
