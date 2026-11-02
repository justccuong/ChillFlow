import React from 'react';

export interface LayoutOption {
  id: string;
  label: string;
  wireframeType: 'split' | 'centered' | 'grid-3' | 'timeline' | 'masonry' | 'accordion' | 'row' | 'cards' | 'form';
  description: string;
  croTip: string;
}

export interface SectionLayoutMeta {
  title: string;
  layouts: LayoutOption[];
}

const SECTION_LAYOUTS: Record<string, SectionLayoutMeta> = {
  hero: {
    title: 'Hero Banner',
    layouts: [
      {
        id: 'hero-split',
        label: 'Chia đôi (Split 2 Cột)',
        wireframeType: 'split',
        description: 'Văn bản và CTA kêu gọi bên trái, hình ảnh & đếm ngược vé bên phải',
        croTip: 'Tăng 18% tỷ lệ bấm nút đăng ký trên màn hình máy tính',
      },
      {
        id: 'hero-centered',
        label: 'Căn giữa (Centered Focus)',
        wireframeType: 'centered',
        description: 'Tiêu đề lớn ở trung tâm, tập trung thị giác vào đồng hồ đếm ngược FOMO',
        croTip: 'Hiệu quả tối đa cho sự kiện mở bán vé sớm (Early Bird)',
      },
    ],
  },
  trustBar: {
    title: 'Nhà tài trợ & Đối tác',
    layouts: [
      {
        id: 'trust-marquee',
        label: 'Dải Logo Trượt Ngang',
        wireframeType: 'row',
        description: 'Hàng logo đối tác lướt nhẹ nhàng tăng độ tin cậy xã hội (Social Proof)',
        croTip: 'Giảm 35% tỉ lệ thoát trang ngay trong 5 giây đầu tiên',
      },
    ],
  },
  benefits: {
    title: 'Quyền lợi & Lợi ích',
    layouts: [
      {
        id: 'benefits-grid',
        label: 'Lưới Bento 3 Cột (Grid)',
        wireframeType: 'grid-3',
        description: 'Phân bổ đều 3 giá trị cốt lõi, dễ quét mắt trên mọi thiết bị',
        croTip: 'Khách hàng nắm bắt giá trị sự kiện nhanh hơn 2.5 lần',
      },
      {
        id: 'benefits-cards',
        label: 'Thẻ Nổi Bật (Featured Cards)',
        wireframeType: 'cards',
        description: 'Các thẻ lớn với thanh tiến độ hoàn thành và biểu tượng nổi bật',
        croTip: 'Thúc đẩy động lực hành động qua hiệu ứng hoàn thành mục tiêu',
      },
    ],
  },
  categorySection: {
    title: 'Nội dung Chuyên ngành',
    layouts: [
      {
        id: 'category-showcase',
        label: 'Showcase Đa Phương Tiện',
        wireframeType: 'split',
        description: 'Khối hiển thị đặc thù (Code Sandbox, Demo 3D, Giáo trình hoặc Pitch Deck)',
        croTip: 'Chứng minh năng lực thực tế, tăng độ uy tín với chuyên gia',
      },
    ],
  },
  speaker: {
    title: 'Diễn giả & Khách mời',
    layouts: [
      {
        id: 'speaker-grid',
        label: 'Lưới Thẻ Diễn Giả (Speaker Cards)',
        wireframeType: 'cards',
        description: 'Chân dung tròn, chức danh và tiểu sử ngắn gọn của dàn diễn giả',
        croTip: 'Tăng thẩm quyền (Authority Score) trong mắt người tham dự',
      },
      {
        id: 'speaker-spotlight',
        label: 'Tiêu điểm Keynote (Spotlight)',
        wireframeType: 'split',
        description: 'Tập trung vào 1 diễn giả VIP chủ chốt của sự kiện',
        croTip: 'Phù hợp khi sự kiện có diễn giả đầu ngành uy tín cao',
      },
    ],
  },
  agenda: {
    title: 'Lịch trình sự kiện',
    layouts: [
      {
        id: 'agenda-timeline',
        label: 'Trục Thời Gian Laser (Laser Timeline)',
        wireframeType: 'timeline',
        description: 'Dòng thời gian zíc-zắc dọc với điểm sáng laser nối các khung giờ',
        croTip: 'Tạo cảm giác hành trình sự kiện rõ ràng, cuốn hút người xem cuộn tiếp',
      },
      {
        id: 'agenda-accordion',
        label: 'Bảng Khung Giờ (Table / Accordion)',
        wireframeType: 'accordion',
        description: 'Các khối giờ phân chia rõ ràng các phiên tham luận và nghỉ giải lao',
        croTip: 'Dễ tra cứu nhanh trên di động cho người bận rộn',
      },
    ],
  },
  testimonials: {
    title: 'Đánh giá & Cảm nhận',
    layouts: [
      {
        id: 'testimonials-cards',
        label: 'Lưới Review (Review Cards)',
        wireframeType: 'cards',
        description: 'Các trích dẫn thực tế từ khách tham dự mùa trước kèm số sao đánh giá',
        croTip: 'Tâm lý bầy đàn (Bandwagon effect) kích thích quyết định mua vé',
      },
    ],
  },
  gallery: {
    title: 'Bento Gallery ảnh',
    layouts: [
      {
        id: 'gallery-bento',
        label: 'Bento Grid Không Gian',
        wireframeType: 'masonry',
        description: 'Sắp xếp ảnh không gian hội trường theo tỷ lệ bất đối xứng hiện đại',
        croTip: 'Gợi mở trải nghiệm thực tế sống động của sự kiện',
      },
    ],
  },
  faq: {
    title: 'Câu hỏi thường gặp',
    layouts: [
      {
        id: 'faq-accordion',
        label: 'Hỏi Đáp Đóng Mở (Accordion)',
        wireframeType: 'accordion',
        description: 'Danh sách các câu hỏi thường gặp, click để mở rộng nội dung giải đáp',
        croTip: 'Xóa bỏ mọi băn khoăn chần chừ cuối cùng trước khi mua vé',
      },
    ],
  },
  registration: {
    title: 'Form đăng ký vé',
    layouts: [
      {
        id: 'registration-form',
        label: 'Form Chuyển Đổi Trực Diện (High-CRO Form)',
        wireframeType: 'form',
        description: 'Form đăng ký tinh gọn, thanh tiến độ giữ chỗ và huy hiệu bảo mật vé',
        croTip: 'Tối ưu độ ngắn của form để giảm tối đa tỷ lệ bỏ rơi giữa chừng',
      },
    ],
  },
};

export function getSectionLayoutMetadata(sectionKey: string): SectionLayoutMeta {
  if (SECTION_LAYOUTS[sectionKey]) {
    return SECTION_LAYOUTS[sectionKey];
  }
  return {
    title: 'Khối nội dung',
    layouts: [
      {
        id: `${sectionKey}-default`,
        label: 'Bố cục tiêu chuẩn',
        wireframeType: 'centered',
        description: 'Bố cục mặc định được tối ưu chuyển đổi',
        croTip: 'Thiết kế chuẩn responsive trên mọi thiết bị',
      },
    ],
  };
}

interface SectionWireframePreviewProps {
  wireframeType: LayoutOption['wireframeType'];
  className?: string;
}

export const SectionWireframePreview: React.FC<SectionWireframePreviewProps> = ({
  wireframeType,
  className = '',
}) => {
  return (
    <div
      className={`w-full h-16 rounded-lg bg-slate-100 dark:bg-slate-800/80 p-2 flex items-center justify-center border border-slate-200/80 dark:border-slate-700/60 overflow-hidden select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {wireframeType === 'split' && (
        <div className="w-full h-full flex items-center gap-2">
          <div className="flex-1 h-full flex flex-col justify-center gap-1">
            <div className="w-4/5 h-2 rounded bg-amber-500/70 dark:bg-amber-400/80" />
            <div className="w-3/5 h-1.5 rounded bg-slate-300 dark:bg-slate-600" />
            <div className="w-2/5 h-2 rounded bg-indigo-500/80 dark:bg-indigo-400/80 mt-1" />
          </div>
          <div className="w-12 h-10 rounded bg-slate-300 dark:bg-slate-700/90 border border-slate-300 dark:border-slate-600 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-slate-400/50 dark:bg-slate-500/50" />
          </div>
        </div>
      )}

      {wireframeType === 'centered' && (
        <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-center">
          <div className="w-1/2 h-2 rounded bg-amber-500/70 dark:bg-amber-400/80" />
          <div className="w-2/3 h-1.5 rounded bg-slate-300 dark:bg-slate-600" />
          <div className="w-1/4 h-2 rounded bg-indigo-500/80 dark:bg-indigo-400/80" />
        </div>
      )}

      {wireframeType === 'grid-3' && (
        <div className="w-full h-full flex items-center gap-1.5">
          <div className="flex-1 h-10 rounded bg-slate-200/90 dark:bg-slate-700/80 p-1 flex flex-col gap-1 justify-center">
            <div className="w-3 h-3 rounded bg-amber-500/60" />
            <div className="w-3/4 h-1 rounded bg-slate-400/70" />
          </div>
          <div className="flex-1 h-10 rounded bg-slate-200/90 dark:bg-slate-700/80 p-1 flex flex-col gap-1 justify-center">
            <div className="w-3 h-3 rounded bg-amber-500/60" />
            <div className="w-3/4 h-1 rounded bg-slate-400/70" />
          </div>
          <div className="flex-1 h-10 rounded bg-slate-200/90 dark:bg-slate-700/80 p-1 flex flex-col gap-1 justify-center">
            <div className="w-3 h-3 rounded bg-amber-500/60" />
            <div className="w-3/4 h-1 rounded bg-slate-400/70" />
          </div>
        </div>
      )}

      {wireframeType === 'timeline' && (
        <div className="w-full h-full flex items-center justify-between px-2 relative">
          <div className="absolute left-4 right-4 h-0.5 bg-indigo-500/40 dark:bg-indigo-400/40 top-1/2 -translate-y-1/2" />
          <div className="w-4 h-4 rounded-full bg-indigo-600 text-[8px] text-white flex items-center justify-center z-10 shadow-sm">1</div>
          <div className="w-4 h-4 rounded-full bg-indigo-600 text-[8px] text-white flex items-center justify-center z-10 shadow-sm">2</div>
          <div className="w-4 h-4 rounded-full bg-indigo-600 text-[8px] text-white flex items-center justify-center z-10 shadow-sm">3</div>
        </div>
      )}

      {wireframeType === 'masonry' && (
        <div className="w-full h-full grid grid-cols-3 gap-1 p-0.5">
          <div className="col-span-2 h-full rounded bg-slate-300 dark:bg-slate-700" />
          <div className="col-span-1 h-full flex flex-col gap-1">
            <div className="flex-1 rounded bg-slate-300 dark:bg-slate-700" />
            <div className="flex-1 rounded bg-slate-300 dark:bg-slate-700" />
          </div>
        </div>
      )}

      {wireframeType === 'cards' && (
        <div className="w-full h-full flex items-center gap-1.5">
          <div className="flex-1 h-10 rounded bg-slate-200 dark:bg-slate-700/80 p-1.5 flex items-center gap-1">
            <div className="w-5 h-5 rounded-full bg-slate-400/70 shrink-0" />
            <div className="flex-1 flex flex-col gap-1">
              <div className="w-full h-1.5 rounded bg-slate-400/60" />
              <div className="w-2/3 h-1 rounded bg-slate-400/40" />
            </div>
          </div>
          <div className="flex-1 h-10 rounded bg-slate-200 dark:bg-slate-700/80 p-1.5 flex items-center gap-1">
            <div className="w-5 h-5 rounded-full bg-slate-400/70 shrink-0" />
            <div className="flex-1 flex flex-col gap-1">
              <div className="w-full h-1.5 rounded bg-slate-400/60" />
              <div className="w-2/3 h-1 rounded bg-slate-400/40" />
            </div>
          </div>
        </div>
      )}

      {wireframeType === 'accordion' && (
        <div className="w-full h-full flex flex-col justify-center gap-1 px-1">
          <div className="w-full h-3 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-between px-1.5">
            <div className="w-1/2 h-1 rounded bg-slate-400/70" />
            <div className="w-2 h-2 rounded-full bg-slate-400/60" />
          </div>
          <div className="w-full h-3 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-between px-1.5">
            <div className="w-2/3 h-1 rounded bg-slate-400/70" />
            <div className="w-2 h-2 rounded-full bg-slate-400/60" />
          </div>
          <div className="w-full h-3 rounded bg-slate-200 dark:bg-slate-700 flex items-center justify-between px-1.5">
            <div className="w-1/3 h-1 rounded bg-slate-400/70" />
            <div className="w-2 h-2 rounded-full bg-slate-400/60" />
          </div>
        </div>
      )}

      {wireframeType === 'row' && (
        <div className="w-full h-full flex items-center justify-around px-2">
          <div className="w-6 h-4 rounded bg-slate-300 dark:bg-slate-700" />
          <div className="w-6 h-4 rounded bg-slate-300 dark:bg-slate-700" />
          <div className="w-6 h-4 rounded bg-slate-300 dark:bg-slate-700" />
          <div className="w-6 h-4 rounded bg-slate-300 dark:bg-slate-700" />
        </div>
      )}

      {wireframeType === 'form' && (
        <div className="w-full h-full flex flex-col justify-center items-center gap-1 px-4">
          <div className="w-full h-2 rounded bg-slate-300 dark:bg-slate-600" />
          <div className="w-full h-2 rounded bg-slate-300 dark:bg-slate-600" />
          <div className="w-1/2 h-2.5 rounded bg-emerald-500/80 dark:bg-emerald-400/80" />
        </div>
      )}
    </div>
  );
};
