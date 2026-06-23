import type { BabyAgeInfo, UserProfile, DailyTask } from '@/types'

export function generateDailyTasks(ageInfo: BabyAgeInfo, profile: UserProfile): DailyTask[] {
  const tasks: DailyTask[] = []

  if (ageInfo.phase === 'pregnancy') {
    const days = ageInfo.daysUntilDue ?? 999
    tasks.push({
      id: 'preg-rest',
      title: '今日は体を休めましょう',
      description: '妊娠後期は疲れやすい時期。無理しないで横になる時間を作って。',
      category: 'mama',
      priority: 'high',
    })
    if (days <= 35) {
      tasks.push({
        id: 'preg-bag',
        title: '入院バッグを確認しましょう',
        description: 'いつ陣痛が来てもいいように準備を整えておきましょう。',
        category: 'admin',
        priority: 'high',
      })
    }
    if (days <= 14) {
      tasks.push({
        id: 'preg-contact',
        title: 'パートナーへの連絡方法を確認',
        description: '緊急時にすぐ連絡できるよう、連絡先を手元に用意しておきましょう。',
        category: 'admin',
        priority: 'high',
      })
    }
    tasks.push({
      id: 'preg-water',
      title: '水分補給を忘れずに',
      description: '1日1.5〜2リットルを目安に、こまめに水を飲みましょう。',
      category: 'health',
      priority: 'medium',
    })
    return tasks
  }

  const month = ageInfo.ageInMonths ?? 0

  // Universal tasks
  if (profile.feedingMethod !== '未定') {
    tasks.push({
      id: 'feed-record',
      title: '授乳・ミルクを記録しましょう',
      description: '回数と量を記録すると、赤ちゃんのリズムがつかめます。',
      category: 'feeding',
      priority: 'high',
    })
  }
  tasks.push({
    id: 'diaper-record',
    title: 'おむつ替えを記録しましょう',
    description: 'おしっこ・うんちの回数は健康のバロメーターです。',
    category: 'health',
    priority: 'high',
  })
  tasks.push({
    id: 'mama-rest',
    title: 'ママも15分休む時間を取りましょう',
    description: '赤ちゃんが寝たら、一緒に横になって。育児は長距離走です。',
    category: 'mama',
    priority: 'high',
  })

  // Month-specific tasks
  if (month === 0) {
    tasks.push({
      id: 'birth-cert',
      title: '出生届の提出（14日以内）',
      description: '赤ちゃんが生まれて14日以内に市区町村へ提出が必要です。',
      category: 'admin',
      priority: 'high',
    })
    tasks.push({
      id: 'jaundice-check',
      title: '黄疸の様子を確認',
      description: '白目や肌が黄色くなっていないか確認しましょう。心配な場合は産院へ。',
      category: 'health',
      priority: 'medium',
    })
  }

  if (month === 1) {
    tasks.push({
      id: 'one-month-checkup',
      title: '1ヶ月健診の予約を確認',
      description: '生後1ヶ月健診は赤ちゃんの成長確認に大切な健診です。',
      category: 'health',
      priority: 'high',
    })
  }

  if (month === 2) {
    tasks.push({
      id: 'vaccine-2m',
      title: '予防接種の予約（ヒブ・肺炎球菌等）',
      description: '生後2ヶ月から予防接種が始まります。かかりつけ医に相談を。',
      category: 'health',
      priority: 'high',
    })
    tasks.push({
      id: 'tummy-time',
      title: 'うつぶせ練習（タミータイム）',
      description: '起きている時間に監視しながら1〜2分から。首の筋肉を鍛えます。',
      category: 'development',
      priority: 'medium',
    })
  }

  if (month === 3) {
    tasks.push({
      id: 'smile-record',
      title: '笑顔を引き出す遊びを試してみて',
      description: 'この時期は社会的な笑いが出てきます。顔を近づけて話しかけて。',
      category: 'development',
      priority: 'medium',
    })
  }

  if (month === 4) {
    tasks.push({
      id: 'roll-prep',
      title: '寝返りの準備サインを確認',
      description: '4〜5ヶ月頃から寝返りの練習が始まります。ベッドから落ちないよう注意。',
      category: 'development',
      priority: 'medium',
    })
  }

  if (month === 5) {
    tasks.push({
      id: 'weaning-prep',
      title: '離乳食の開始を検討しましょう',
      description: '首がすわり、食べ物に興味を示し始めたら離乳食スタートのサインです。',
      category: 'feeding',
      priority: 'high',
    })
  }

  if (month >= 5 && month <= 6) {
    tasks.push({
      id: 'weaning-start',
      title: '離乳食を1日1回試してみましょう',
      description: '10倍がゆ小さじ1からスタート。食べる練習が目的です。',
      category: 'feeding',
      priority: 'high',
    })
  }

  if (month === 6) {
    tasks.push({
      id: 'half-year-checkup',
      title: '6〜7ヶ月健診の予約確認',
      description: '発育・発達の確認と、離乳食の進め方を相談できます。',
      category: 'health',
      priority: 'medium',
    })
  }

  if (month >= 9 && month <= 11) {
    tasks.push({
      id: 'weaning-3',
      title: '離乳食を1日3回に進めましょう',
      description: '9ヶ月頃から3回食へ。家族と同じテーブルで食べると食欲が増します。',
      category: 'feeding',
      priority: 'medium',
    })
    tasks.push({
      id: 'walk-prep',
      title: 'つかまり立ちの練習をサポート',
      description: 'テーブルや家具の角は保護し、転倒しても安全な環境を整えて。',
      category: 'development',
      priority: 'medium',
    })
  }

  if (month === 12) {
    tasks.push({
      id: 'one-year',
      title: '1歳の健診の予約を確認しましょう',
      description: '1歳健診では発育・発達の総合チェックが行われます。',
      category: 'health',
      priority: 'high',
    })
  }

  return tasks
}
