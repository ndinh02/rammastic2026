import { Star, Sparkles, Mic } from 'lucide-react'
import { CreativePricing } from '@/components/ui/creative-pricing'

const ticketTiers = [
  {
    name: 'Full Experience Pass',
    icon: <Sparkles className="w-6 h-6" />,
    price: 59,
    description: 'Tham gia toàn bộ chương trình Trại hè (giá Early Bird từ ngày 19/6 - 30/6)',
    color: 'blue',
    popular: true,
    features: [
      { text: <>Tham gia Cuộc thi <strong>SIVIHACK</strong></> },
      { text: <><strong>SIVITOUR</strong> - khám phá trải nghiệm Frankfurt</> },
      { text: <><strong>SIVITA</strong> - Gala trao giải và cuộc thi âm nhạc</> },
      { text: <>Tham gia Workshop của <strong>NVIDIA</strong> và có cơ hội nhận được chứng chỉ trị giá <strong>90 USD</strong></> },
      { text: <>Bao gồm <strong>Áo Trại sinh</strong>, quà tặng <strong>Welcome Bag</strong>, <strong>02 bữa ăn trưa</strong> và <strong>01 bữa ăn tối</strong></> },
    ],
  },
  {
    name: 'Day Pass',
    icon: <Star className="w-6 h-6" />,
    price: 19,
    description: 'Trải nghiệm chương trình Day 3 của Trại hè',
    color: 'amber',
    features: [
      { text: 'Theo dõi trận Chung kết cuộc thi SiviHack 2026' },
      { text: 'Tham gia SiviTour - chuyến du lịch khám phá Frankfurt và giao lưu, kết bạn mới.' },
      { text: 'Tham dự Đêm Gala SIVITA và gặp gỡ hàng trăm du học sinh tại Đức.' },
      { text: '01 bữa trưa và Áo Trại sinh' },
    ],
  },
  {
    name: 'Dự thi SiviTa',
    icon: <Mic className="w-6 h-6" />,
    description: 'Trải nghiệm chương trình Day 3 của Trại hè',
    color: 'purple',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSfM3kZ6b9P6ZdE3Ioaq4LRmY1s82gUhkmw1XBAwRww7D_3ctQ/viewform?pli=1',
    features: [
      { text: ' ⁠Thí sinh gửi video dự thi theo hướng dẫn của Ban Tổ chức.' },
      { text: ' ⁠⁠Sau khi kết thúc thời gian nhận bài, các tiết mục hợp lệ sẽ được đăng tải trên Fanpage SIVIDUC để tiến hành bình chọn trực tuyến.' },
      { text: 'Các thí sinh/nhóm thí sinh được lựa chọn từ Vòng Sơ khảo sẽ biểu diễn trực tiếp trên sân khấu Vòng Chung kết' },
    ],
  },
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