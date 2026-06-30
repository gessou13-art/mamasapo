'use client'

import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'

type EventItem = {
  id: string
  icon: string
  title: string
  timing: string
  description: string
  tips: string[]
  color: 'pink' | 'mint' | 'lavender' | 'beige'
}

const EVENTS: EventItem[] = [
  {
    id: 'oshichiya',
    icon: '📝',
    title: 'お七夜',
    timing: '生後7日目',
    description: '赤ちゃんの名前を披露する命名式。命名書を書いて神棚や床の間に飾る風習があります。家族で赤ちゃんの誕生を祝う最初のお祝いです。',
    tips: ['命名書は手書きでも市販のものでもOK', '出産後の体が優先。無理せず家族だけで小さく祝っても'],
    color: 'pink',
  },
  {
    id: 'omiyamairi',
    icon: '⛩️',
    title: 'お宮参り',
    timing: '生後30〜33日頃（地域差あり）',
    description: '氏神様に赤ちゃんの誕生を報告し、健やかな成長を祈る行事。男の子は31〜32日目、女の子は32〜33日目が目安ですが、体調や季節に合わせて柔軟にOK。',
    tips: ['赤ちゃんと母体の体調を最優先に。時期はずらしても大丈夫', '祝い着（掛け着）はレンタルが便利'],
    color: 'beige',
  },
  {
    id: 'hatsunanoka',
    icon: '🎎',
    title: '初節句（女の子・ひな祭り）',
    timing: '生まれて最初の3月3日',
    description: '女の子の健やかな成長を願う行事。ひな人形を飾り、ちらし寿司やはまぐりのお吸い物などでお祝いします。生後すぐの3月3日は翌年にずらすことも多いです。',
    tips: ['ひな人形は早めに出し、3月3日を過ぎたら早めに片付けて', '両家でどちらが用意するか事前に相談を'],
    color: 'pink',
  },
  {
    id: 'hatsusekku-boy',
    icon: '🎏',
    title: '初節句（男の子・こどもの日）',
    timing: '生まれて最初の5月5日',
    description: '男の子の健やかな成長と強さを願う行事。兜や五月人形を飾り、こいのぼりを揚げてお祝いします。柏餅やちまきを食べる風習があります。',
    tips: ['こいのぼりは屋外用と室内用がある', '五月人形は3月中旬〜4月に準備するのがスムーズ'],
    color: 'mint',
  },
  {
    id: 'okuizome',
    icon: '🍱',
    title: 'お食い初め',
    timing: '生後100日頃',
    description: '「一生食べ物に困らないように」と願う儀式。鯛・赤飯・煮物・香の物・歯固め石を用意し、食べるマネをさせます。',
    tips: ['自宅でも料亭・ホテルの個室でも。最近はお食い初めセットの宅配も', '歯固め石は神社の境内から拾うか、専用のものを用意して'],
    color: 'beige',
  },
  {
    id: 'half-birthday',
    icon: '🎂',
    title: 'ハーフバースデー',
    timing: '生後6ヶ月',
    description: '1歳の半分（6ヶ月）を記念する行事。欧米発祥で近年日本でも広まっています。0が6に変わる成長を写真で残したり、小さなお祝いをする家族が増えています。',
    tips: ['ケーキ型の帽子などフォトプロップスを使った記念撮影が人気', 'まだ離乳食前なのでケーキは飾り用に'],
    color: 'lavender',
  },
  {
    id: 'first-birthday',
    icon: '🎉',
    title: '1歳誕生日（一升餅・選び取り）',
    timing: '満1歳',
    description: '1歳の誕生日には「一升餅」と「選び取り」の風習があります。一升餅（約2kg）を背負わせて健康と丈夫な体を願い、選び取りでは筆・お金・本などを並べて子どもが選んだものでその子の将来を占います。',
    tips: ['一升餅は重くて転ぶのが良いとされている', '選び取りカードは手作りでもOK。カメラの準備を忘れずに'],
    color: 'pink',
  },
  {
    id: 'shichigosan-3',
    icon: '👘',
    title: '七五三（3歳）',
    timing: '3歳の11月15日頃',
    description: '男女ともに3歳で行う「髪置きの儀」に由来する行事。それまで剃っていた髪を伸ばし始める節目のお祝いです。神社で祈祷を受け、千歳飴を持って記念撮影するのが定番。11月15日前後の週末に行う家族が多いです。',
    tips: ['着物レンタル＋写真館のセットプランが人気', '10〜11月は予約が混み合うので早めに'],
    color: 'lavender',
  },
  {
    id: 'shichigosan-5',
    icon: '👘',
    title: '七五三（5歳・男の子）',
    timing: '5歳の11月15日頃',
    description: '男の子が初めて袴を着ける「袴着の儀」に由来する行事。羽織袴姿で神社に参拝し、健やかな成長に感謝します。',
    tips: ['袴は着付けが必要。着付けができる写真館やスタジオを早めに予約', '当日は長時間の外出になるため子どもの体調管理を'],
    color: 'beige',
  },
  {
    id: 'shichigosan-7',
    icon: '👘',
    title: '七五三（7歳・女の子）',
    timing: '7歳の11月15日頃',
    description: '女の子が本式の帯を締め始める「帯解きの儀」に由来する行事。華やかな着物姿で神社に参拝します。3歳のお参りよりも式典らしい雰囲気になります。',
    tips: ['前撮り（9〜10月）にすると当日が楽', '着物・帯・髪飾りなど準備物が多いので早めに確認を'],
    color: 'pink',
  },
]

export default function EventsPage() {
  return (
    <div>
      <PageHeader title="赤ちゃんの行事" backHref="/" />

      <div className="bg-gradient-to-b from-pastel-pink to-pastel-cream px-4 py-5">
        <p className="text-pink-700 text-sm leading-relaxed">
          生まれてから七五三まで、一般的なお祝い行事をまとめました。地域や家庭によって異なる部分もありますので、参考程度にご覧ください。
        </p>
      </div>

      <div className="px-4 py-4 space-y-0">
        {EVENTS.map((event, index) => (
          <div key={event.id} className="relative">
            {/* Timeline line */}
            {index < EVENTS.length - 1 && (
              <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gray-200 z-0" />
            )}

            <div className="relative z-10 flex gap-4 mb-4">
              {/* Icon circle */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-pastel-pink flex items-center justify-center text-2xl shadow-sm">
                {event.icon}
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <div className="mb-1">
                  <span className="text-xs font-medium text-pink-500 bg-pastel-pink rounded-full px-2 py-0.5">
                    {event.timing}
                  </span>
                </div>
                <Card color={event.color}>
                  <h3 className="font-bold text-gray-800 text-base mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{event.description}</p>
                  {event.tips.length > 0 && (
                    <div className="border-t border-gray-100 pt-2 space-y-1">
                      {event.tips.map((tip, i) => (
                        <p key={i} className="text-xs text-gray-500 flex items-start gap-1">
                          <span className="text-pink-400 mt-0.5">💡</span>
                          {tip}
                        </p>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
