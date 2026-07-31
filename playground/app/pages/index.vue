<script setup lang="ts">
const email = ref('')
const amount = ref('')
const plan = ref('스탠다드')
const method = ref('간편결제')
const agreed = ref(true)
const push = ref(true)
const progress = ref(72)

const blueScale = [
  'bg-toss-blue-50', 'bg-toss-blue-100', 'bg-toss-blue-200', 'bg-toss-blue-300', 'bg-toss-blue-400',
  'bg-toss-blue-500', 'bg-toss-blue-600', 'bg-toss-blue-700', 'bg-toss-blue-800', 'bg-toss-blue-900'
]

const greyScale = [
  'bg-toss-grey-50', 'bg-toss-grey-100', 'bg-toss-grey-200', 'bg-toss-grey-300', 'bg-toss-grey-400',
  'bg-toss-grey-500', 'bg-toss-grey-600', 'bg-toss-grey-700', 'bg-toss-grey-800', 'bg-toss-grey-900'
]

const semanticScale = [
  'bg-toss-red-500', 'bg-toss-orange-500', 'bg-toss-yellow-500', 'bg-toss-green-500',
  'bg-toss-teal-500', 'bg-toss-purple-500'
]

const surfaces = [
  { label: 'default', class: 'bg-default' },
  { label: 'muted', class: 'bg-muted' },
  { label: 'elevated', class: 'bg-elevated' },
  { label: 'accented', class: 'bg-accented' }
]

const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] as const
const variants = ['solid', 'outline', 'soft', 'subtle', 'ghost', 'link'] as const

const toast = useToast()

const toastPresets = {
  primary: { title: '송금을 완료했어요', description: '김토스님께 30,000원을 보냈어요.', icon: 'i-lucide-send' },
  success: { title: '이자를 받았어요', description: '오늘의 이자 4,120원이 입금됐어요.', icon: 'i-lucide-circle-check' },
  warning: { title: '인증이 곧 만료돼요', description: '5분 안에 인증을 완료해 주세요.', icon: 'i-lucide-triangle-alert' },
  error: { title: '송금하지 못했어요', description: '잔액이 부족해요. 계좌를 확인해 주세요.', icon: 'i-lucide-circle-x' }
} as const

function showToast(color: keyof typeof toastPresets) {
  toast.add({ ...toastPresets[color], color })
}

function showActionToast() {
  toast.add({
    title: '거래 내역이 준비됐어요',
    description: '최근 3개월 내역을 내려받을 수 있어요.',
    icon: 'i-lucide-file-down',
    color: 'neutral',
    actions: [{ label: '내려받기', color: 'neutral', variant: 'outline' }]
  })
}

const transactions = [
  { name: '스타벅스 강남점', date: '7월 28일', amount: -5600 },
  { name: '김토스', date: '7월 27일', amount: 30000 },
  { name: '토스페이먼츠', date: '7월 26일', amount: -12900 },
  { name: '이자 받기', date: '7월 25일', amount: 4120 }
]

const menuItems = [
  [{ label: '내 계좌', icon: 'i-lucide-wallet' }, { label: '카드', icon: 'i-lucide-credit-card' }],
  [{ label: '설정', icon: 'i-lucide-settings' }, { label: '로그아웃', icon: 'i-lucide-log-out', color: 'error' as const }]
]

const tabItems = [
  { label: '계좌', icon: 'i-lucide-wallet', content: '연결된 계좌 3개의 잔액을 한눈에 볼 수 있어요.' },
  { label: '카드', icon: 'i-lucide-credit-card', content: '이번 달 카드 사용액은 482,000원이에요.' },
  { label: '투자', icon: 'i-lucide-trending-up', badge: 'N', content: '보유 종목의 수익률은 +12.4%예요.' }
]

const accordionItems = [
  { label: '이자는 언제 받나요?', icon: 'i-lucide-calendar', content: '매일 원할 때 받을 수 있어요. 하루만 맡겨도 이자가 쌓여요.' },
  { label: '수수료가 있나요?', icon: 'i-lucide-receipt', content: '타행 이체 수수료는 무료예요. ATM 출금도 수수료가 없어요.' },
  { label: '한도는 얼마인가요?', icon: 'i-lucide-shield', content: '1일 최대 500만원까지 보낼 수 있어요.' }
]
</script>

<template>
  <UContainer class="py-10 space-y-12">
    <div>
      <h1 class="text-3xl font-bold text-highlighted">
        토스 테마 확인용 페이지
      </h1>
      <p class="mt-2 text-muted">
        TDS 컬러 토큰이 라이트/다크에서 어떻게 적용되는지 확인해 보세요. 헤더의 색상모드 버튼으로 전환할 수 있습니다.
      </p>
    </div>

    <!-- 팔레트 -->
    <section class="space-y-4">
      <h2 class="text-xl font-bold text-highlighted">
        팔레트
      </h2>

      <div class="space-y-3">
        <div>
          <p class="mb-1.5 text-xs text-muted">
            Blue 50 → 900
          </p>
          <div class="flex gap-1">
            <div
              v-for="c in blueScale"
              :key="c"
              :class="c"
              class="h-10 flex-1 rounded-sm"
            />
          </div>
        </div>

        <div>
          <p class="mb-1.5 text-xs text-muted">
            Grey 50 → 900
          </p>
          <div class="flex gap-1">
            <div
              v-for="c in greyScale"
              :key="c"
              :class="c"
              class="h-10 flex-1 rounded-sm"
            />
          </div>
        </div>

        <div>
          <p class="mb-1.5 text-xs text-muted">
            Red / Orange / Yellow / Green / Teal / Purple 500
          </p>
          <div class="flex gap-1">
            <div
              v-for="c in semanticScale"
              :key="c"
              :class="c"
              class="h-10 flex-1 rounded-sm"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 표면과 텍스트 -->
    <section class="space-y-4">
      <h2 class="text-xl font-bold text-highlighted">
        표면 · 텍스트
      </h2>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          v-for="surface in surfaces"
          :key="surface.label"
          :class="surface.class"
          class="rounded-lg p-4 ring ring-default"
        >
          <p class="text-sm font-semibold text-highlighted">
            {{ surface.label }}
          </p>
        </div>
      </div>

      <div class="rounded-lg bg-default p-5 shadow-sm space-y-1">
        <p class="text-highlighted font-semibold">
          highlighted — 제목에 쓰는 색
        </p>
        <p class="text-default">
          default — 본문에 쓰는 색
        </p>
        <p class="text-muted">
          muted — 보조 설명
        </p>
        <p class="text-dimmed">
          dimmed — 가장 옅은 텍스트
        </p>
      </div>
    </section>

    <!-- 버튼 -->
    <section class="space-y-4">
      <h2 class="text-xl font-bold text-highlighted">
        버튼
      </h2>

      <div
        v-for="variant in variants"
        :key="variant"
        class="flex flex-wrap items-center gap-2"
      >
        <UBadge
          :label="variant"
          color="neutral"
          variant="soft"
          class="w-16 justify-center"
        />
        <UButton
          v-for="color in colors"
          :key="color"
          :label="color"
          :color="color"
          :variant="variant"
        />
      </div>

      <div class="flex flex-wrap items-center gap-2 pt-2">
        <UButton
          label="xs"
          size="xs"
        />
        <UButton
          label="sm"
          size="sm"
        />
        <UButton
          label="md"
          size="md"
        />
        <UButton
          label="lg"
          size="lg"
        />
        <UButton
          label="xl"
          size="xl"
        />
        <UButton
          label="로딩 중"
          loading
        />
        <UButton
          label="비활성"
          disabled
        />
        <UButton
          icon="i-lucide-arrow-right"
          size="xl"
        />
      </div>

      <UButton
        label="토스로 계속하기"
        size="xl"
        block
      />
    </section>

    <!-- 배지 · 알럿 -->
    <section class="space-y-4">
      <h2 class="text-xl font-bold text-highlighted">
        배지 · 알럿
      </h2>

      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="color in colors"
          :key="color"
          :label="color"
          :color="color"
        />
      </div>

      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="color in colors"
          :key="color"
          :label="color"
          :color="color"
          variant="soft"
        />
      </div>

      <div class="grid gap-3 sm:grid-cols-2">
        <UAlert
          title="송금이 완료됐어요"
          description="김토스님께 30,000원을 보냈어요."
          icon="i-lucide-circle-check"
          color="success"
          variant="soft"
        />
        <UAlert
          title="잔액이 부족해요"
          description="연결된 계좌의 잔액을 확인해 주세요."
          icon="i-lucide-circle-alert"
          color="error"
          variant="soft"
        />
      </div>
    </section>

    <!-- 카드 · 폼 -->
    <section class="space-y-4">
      <h2 class="text-xl font-bold text-highlighted">
        카드 · 입력
      </h2>

      <div class="grid gap-4 lg:grid-cols-2">
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <p class="font-semibold text-highlighted">
                토스뱅크 통장
              </p>
              <UBadge
                label="주계좌"
                color="primary"
                variant="soft"
                size="sm"
              />
            </div>
          </template>

          <p class="text-3xl font-bold text-highlighted">
            1,284,000<span class="text-lg font-semibold text-muted">원</span>
          </p>
          <p class="mt-1 text-sm text-muted">
            이번 달 이자 4,120원을 받았어요
          </p>

          <UProgress
            v-model="progress"
            class="mt-5"
          />
          <p class="mt-2 text-xs text-muted">
            이번 달 목표 금액의 {{ progress }}%
          </p>

          <template #footer>
            <div class="flex gap-2">
              <UButton
                label="송금"
                block
              />
              <UButton
                label="내역 보기"
                color="neutral"
                variant="soft"
                block
              />
            </div>
          </template>
        </UCard>

        <UCard>
          <template #header>
            <p class="font-semibold text-highlighted">
              입력 요소
            </p>
          </template>

          <div class="space-y-4">
            <UFormField label="이메일">
              <UInput
                v-model="email"
                placeholder="toss@example.com"
                class="w-full"
              />
            </UFormField>

            <UFormField
              label="보낼 금액"
              help="하루 최대 500만원까지 보낼 수 있어요"
            >
              <UInput
                v-model="amount"
                placeholder="0"
                trailing
                class="w-full"
              >
                <template #trailing>
                  <span class="text-sm text-muted">원</span>
                </template>
              </UInput>
            </UFormField>

            <UFormField label="요금제">
              <USelect
                v-model="plan"
                :items="['라이트', '스탠다드', '프리미엄']"
                class="w-full"
              />
            </UFormField>

            <URadioGroup
              v-model="method"
              legend="결제 수단"
              :items="['간편결제', '계좌이체', '신용카드']"
            />

            <USwitch
              v-model="push"
              label="입출금 알림 받기"
              description="거래가 생기면 바로 알려드려요"
            />

            <UCheckbox
              v-model="agreed"
              label="약관에 모두 동의합니다"
            />
          </div>
        </UCard>
      </div>
    </section>

    <!-- 토스트 -->
    <section class="space-y-4">
      <h2 class="text-xl font-bold text-highlighted">
        토스트
      </h2>

      <div class="flex flex-wrap gap-2">
        <UButton
          label="송금 완료"
          color="primary"
          @click="showToast('primary')"
        />
        <UButton
          label="성공"
          color="success"
          @click="showToast('success')"
        />
        <UButton
          label="경고"
          color="warning"
          @click="showToast('warning')"
        />
        <UButton
          label="실패"
          color="error"
          @click="showToast('error')"
        />
        <UButton
          label="액션 포함"
          color="neutral"
          variant="soft"
          @click="showActionToast()"
        />
      </div>
    </section>

    <!-- 오버레이 -->
    <section class="space-y-4">
      <h2 class="text-xl font-bold text-highlighted">
        오버레이
      </h2>

      <div class="flex flex-wrap items-center gap-2">
        <UModal
          title="30,000원을 보낼까요?"
          description="김토스 · 토스뱅크 1000-0000-0000"
        >
          <UButton
            label="모달"
            color="neutral"
            variant="soft"
          />

          <template #body>
            <p class="text-muted">
              보내고 나면 취소할 수 없어요. 받는 분과 금액을 다시 한번 확인해 주세요.
            </p>
          </template>

          <template #footer="{ close }">
            <div class="flex w-full gap-2">
              <UButton
                label="취소"
                color="neutral"
                variant="soft"
                block
                @click="close"
              />
              <UButton
                label="보내기"
                block
                @click="close"
              />
            </div>
          </template>
        </UModal>

        <USlideover
          title="거래 내역"
          description="최근 3개월 내역이에요"
        >
          <UButton
            label="슬라이드오버"
            color="neutral"
            variant="soft"
          />

          <template #body>
            <div class="divide-y divide-default">
              <div
                v-for="tx in transactions"
                :key="tx.name"
                class="flex items-center justify-between py-3"
              >
                <div>
                  <p class="font-medium text-highlighted">
                    {{ tx.name }}
                  </p>
                  <p class="text-sm text-muted">
                    {{ tx.date }}
                  </p>
                </div>
                <p
                  class="font-semibold"
                  :class="tx.amount > 0 ? 'text-primary' : 'text-highlighted'"
                >
                  {{ tx.amount > 0 ? '+' : '' }}{{ tx.amount.toLocaleString() }}원
                </p>
              </div>
            </div>
          </template>
        </USlideover>

        <UPopover>
          <UButton
            label="팝오버"
            color="neutral"
            variant="soft"
          />

          <template #content>
            <div class="w-64 p-4">
              <p class="font-semibold text-highlighted">
                이자는 매일 받아요
              </p>
              <p class="mt-1 text-sm text-muted">
                하루만 맡겨도 이자를 드려요. 매일 원할 때 받을 수 있어요.
              </p>
            </div>
          </template>
        </UPopover>

        <UTooltip
          text="단축키로 빠르게 열 수 있어요"
          :kbds="['meta', 'K']"
        >
          <UButton
            label="툴팁"
            color="neutral"
            variant="soft"
          />
        </UTooltip>

        <UDropdownMenu :items="menuItems">
          <UButton
            label="드롭다운"
            color="neutral"
            variant="soft"
            trailing-icon="i-lucide-chevron-down"
          />
        </UDropdownMenu>
      </div>
    </section>

    <!-- 내비게이션 · 데이터 -->
    <section class="space-y-4">
      <h2 class="text-xl font-bold text-highlighted">
        탭 · 아코디언
      </h2>

      <UTabs
        :items="tabItems"
        class="w-full"
      />

      <UAccordion :items="accordionItems" />
    </section>

    <!-- 기타 -->
    <section class="space-y-4">
      <h2 class="text-xl font-bold text-highlighted">
        아바타 · 기타
      </h2>

      <div class="flex flex-wrap items-center gap-6">
        <UAvatarGroup>
          <UAvatar text="김" />
          <UAvatar text="이" />
          <UAvatar text="박" />
          <UAvatar text="+5" />
        </UAvatarGroup>

        <UChip
          color="error"
          text="3"
          size="2xl"
        >
          <UAvatar
            icon="i-lucide-bell"
            size="lg"
          />
        </UChip>

        <div class="flex items-center gap-1">
          <UKbd value="meta" />
          <UKbd value="K" />
        </div>
      </div>

      <USeparator label="또는" />

      <div class="flex items-center gap-3">
        <USkeleton class="size-12 rounded-full" />
        <div class="flex-1 space-y-2">
          <USkeleton class="h-4 w-1/3" />
          <USkeleton class="h-4 w-1/2" />
        </div>
      </div>
    </section>
  </UContainer>
</template>
