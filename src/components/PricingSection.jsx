import { Star, Sparkles } from 'lucide-react'
import { CreativePricing } from '@/components/ui/creative-pricing'

const ticketTiers = [
  {
    name: 'Full Experience Ticket',
    icon: <Sparkles className="w-6 h-6" />,
    price: 45,
    description: 'Experience all 3 days of RAMmastic 2026',
    color: 'blue',
    popular: true,
    features: [
      'Full 3-day access',
      'Touring in Frankfurt',
      'Access to SiviTa',
      'All activities included',
    ],
  },
  {
    name: '1 Day Ticket',
    icon: <Star className="w-6 h-6" />,
    price: 20,
    description: 'Join us for the final day experience',
    color: 'amber',
    features: [
      'Touring in Frankfurt',
      'Access to SiviTa',
      'Community activities',
      'Perfect for short participation',
    ],
  },
]

export function PricingSection() {
  return (
    <CreativePricing
      tag="Giá vé RAMmastic 2026"
      title="Thử thách bản thân cùng chúng mình!"
      description="Chọn hành trình phù hợp và cùng khám phá Frankfurt với cộng đồng thanh niên Việt Nam tại châu Âu."
      tiers={ticketTiers}
    />
  )
}
