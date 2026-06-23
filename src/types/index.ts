export type DeliveryMethod = '未定' | '自然分娩' | '帝王切開'
export type FeedingMethod = '未定' | '母乳' | 'ミルク' | '混合'
export type AppPhase = 'pregnancy' | 'postnatal'
export type PregnancyPhase = '1ヶ月前' | '2週間前' | '1週間前' | '入院直前' | '退院直後'

export interface UserProfile {
  babyName: string
  birthDate: string | null
  dueDate: string | null
  deliveryMethod: DeliveryMethod
  feedingMethod: FeedingMethod
  notificationsEnabled: boolean
  onboardingCompleted: boolean
  createdAt: string
}

export interface BabyAgeInfo {
  phase: AppPhase
  ageInDays: number | null
  ageInWeeks: number | null
  ageInMonths: number | null
  weeksPregnant: number | null
  daysUntilDue: number | null
  pregnancyPhase: PregnancyPhase | null
}

export type RecordType =
  | '授乳' | 'ミルク' | 'おむつ' | '睡眠'
  | '体温' | '体重' | '身長' | '離乳食'
  | 'メモ' | 'ママの体調' | 'ママの気分'

export interface BaseRecord {
  id: string
  type: RecordType
  timestamp: string
  note?: string
}

export interface NursingRecord extends BaseRecord {
  type: '授乳'
  side: '左' | '右' | '両方'
  durationMinutes: number
}

export interface FormulaRecord extends BaseRecord {
  type: 'ミルク'
  amountMl: number
}

export interface DiaperRecord extends BaseRecord {
  type: 'おむつ'
  diaperType: '小' | '大' | '両方'
}

export interface SleepRecord extends BaseRecord {
  type: '睡眠'
  startTime: string
  endTime: string | null
  durationMinutes: number | null
}

export interface TemperatureRecord extends BaseRecord {
  type: '体温'
  celsius: number
}

export interface WeightRecord extends BaseRecord {
  type: '体重'
  grams: number
}

export interface HeightRecord extends BaseRecord {
  type: '身長'
  cm: number
}

export interface WeaningRecord extends BaseRecord {
  type: '離乳食'
  amountLevel: '少し' | '半分' | 'だいたい' | '全部'
  foodsEaten?: string
}

export interface MemoRecord extends BaseRecord {
  type: 'メモ'
  content: string
}

export interface MamaConditionRecord extends BaseRecord {
  type: 'ママの体調'
  condition: '良い' | '普通' | '疲れた' | '辛い'
}

export interface MamaMoodRecord extends BaseRecord {
  type: 'ママの気分'
  mood: '😊' | '😐' | '😢' | '😤' | '😴'
}

export type AnyRecord =
  | NursingRecord | FormulaRecord | DiaperRecord | SleepRecord
  | TemperatureRecord | WeightRecord | HeightRecord | WeaningRecord
  | MemoRecord | MamaConditionRecord | MamaMoodRecord

export interface ChecklistItemData {
  id: string
  text: string
  note?: string
  priority: 'high' | 'medium' | 'low'
  tags?: string[]
}

export interface ChecklistCategory {
  id: string
  title: string
  icon: string
  items: ChecklistItemData[]
}

export interface ChecklistState {
  checkedItems: Record<string, boolean>
  lastUpdated: string
}

export interface QAItem {
  id: string
  question: string
  answer: string
  tags?: string[]
  relatedMonths?: number[]
  urgent?: boolean
}

export interface QACategory {
  id: string
  title: string
  icon: string
  items: QAItem[]
}

export interface Milestone {
  text: string
  isOptional?: boolean
}

export interface VaccineEntry {
  name: string
  timing: string
  mandatory: boolean
}

export interface MonthlyContent {
  month: number
  title: string
  subtitle: string
  milestones: Milestone[]
  feeding: {
    summary: string
    frequency: string
    tips: string[]
  }
  sleep: {
    summary: string
    totalHours: string
    tips: string[]
  }
  diaper: {
    dailyCount: string
    notes: string[]
  }
  play: {
    ideas: string[]
    developmentFocus: string
  }
  mamaBody: {
    changes: string[]
    tips: string[]
  }
  preparations: string[]
  vaccines: VaccineEntry[]
  qaIds: string[]
}

export interface PregnancyPhaseContent {
  phase: PregnancyPhase
  title: string
  description: string
  checklist: string[]
  tips: string[]
  urgentSigns?: string[]
}

export type WeaningStage = '開始前' | '初期' | '中期' | '後期' | '完了期'

export interface FoodItem {
  name: string
  allowed: boolean
  note?: string
  allergyRisk?: boolean
}

export interface FoodCategory {
  category: string
  items: FoodItem[]
}

export interface WeeklyMenuItem {
  day: string
  breakfast?: string
  lunch?: string
  dinner?: string
}

export interface WeaningStageContent {
  stage: WeaningStage
  ageRange: string
  frequency: string
  texture: string
  amount: string
  foods: FoodCategory[]
  allergyFoods: string[]
  sampleMenu: WeeklyMenuItem[]
  wontEatTips: string[]
  tips: string[]
}

export interface MamaCareSection {
  id: string
  title: string
  icon: string
  content: string
  bulletPoints?: string[]
  doctorVisitSigns?: string[]
  deliveryMethodSpecific?: DeliveryMethod[]
}

export interface DailyTask {
  id: string
  title: string
  description?: string
  category: 'feeding' | 'health' | 'development' | 'admin' | 'mama'
  priority: 'high' | 'medium' | 'low'
}

export interface DailyMessage {
  id: string
  text: string
  phase?: AppPhase
  monthRange?: [number, number]
}
