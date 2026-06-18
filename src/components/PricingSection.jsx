import { Star, Sparkles } from 'lucide-react'
import { CreativePricing } from '@/components/ui/creative-pricing'

const ticketTiers = [
  {
    name: 'Full Experience Pass',
    icon: <Sparkles className="w-6 h-6" />,
    price: 49,
    description: 'Tham gia toàn bộ chương trình Trại hè (giá Early Bird từ ngày 19/6 - 30/6)',
    color: 'blue',
    popular: true,
    features: [
      'Tham gia Cuộc thi SIVIHACK',
      'SIVITOUR - khám phá trải nghiệm Frankfurt',
      'SIVITA - Gala trao giải và cuộc thi âm nhạc',
      'Tham gia Workshop của NVIDIA và có cơ hội nhận được chứng chỉ trị giá 90 USD',
      'Bao gồm Áo Trại sinh, quà tặng Welcome Bag, 02 bữa ăn trưa và 01 bữa ăn tối',
    ],
  },
  // {
  //   name: 'Day Pass',
  //   icon: <Star className="w-6 h-6" />,
  //   price: 19,
  //   description: 'Trải nghiệm chương trình Day 3 của Trại hè',
  //   color: 'amber',
  //   features: [
  //     'Xem chung kết cuộc thi SIVIHACK',
  //     'SIVITOUR - khám phá trải nghiệm Frankfurt',
  //     'SIVITA - Gala trao giải và cuộc thi âm nhạc',
  //     'Bao gồm Áo Trại sinh và 01 bữa ăn trưa',
  //   ],
  // },
]

export function PricingSection() {
  return (
    <CreativePricing
      tag="Giá vé RAMmastic 2026"
      title="Your mission starts here..."
      description="Chọn hành trình phù hợp và cùng khám phá Frankfurt với cộng đồng thanh niên Việt Nam tại châu Âu."
      tiers={ticketTiers}
    />
  )
}
