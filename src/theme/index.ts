/**
 * 솔리드(채움) 버튼 계열의 다크모드 글자색 보정.
 *
 * Nuxt UI 는 `text-inverted` 로 채움 버튼의 글자색을 정하는데, 다크모드에서는
 * 이 값이 어두운 색(#17171c)이 된다. TDS 는 다크모드에서도 채움 버튼 글자를
 * 흰색으로 유지하므로 색상 계열에만 흰색을 다시 지정한다.
 * (노랑은 TDS 와 동일하게 어두운 글자를 쓴다)
 */
const solidTextOnBrand = [
  { color: 'primary', variant: 'solid', class: 'dark:text-white' },
  { color: 'secondary', variant: 'solid', class: 'dark:text-white' },
  { color: 'success', variant: 'solid', class: 'dark:text-white' },
  { color: 'info', variant: 'solid', class: 'dark:text-white' },
  { color: 'error', variant: 'solid', class: 'dark:text-white' },
  { color: 'warning', variant: 'solid', class: 'text-[#191f28] dark:text-[#191f28]' }
]

/**
 * TDS 프리셋. 모듈이 `nuxt.options.appConfig.ui` 에 병합하며,
 * 소비자의 `app/app.config.ts` 가 항상 이 값을 덮어쓸 수 있다.
 */
export const tossUiTheme = {
  colors: {
    primary: 'toss-blue',
    secondary: 'toss-purple',
    success: 'toss-green',
    info: 'toss-teal',
    warning: 'toss-yellow',
    error: 'toss-red',
    neutral: 'toss-grey'
  },

  button: {
    slots: {
      // 토스 버튼은 항상 semibold, 크기도 한 단계 넉넉하다
      base: 'font-semibold transition-colors duration-150'
    },
    variants: {
      size: {
        xs: { base: 'px-2.5 py-1 text-xs gap-1' },
        sm: { base: 'px-3 py-1.5 text-xs gap-1.5' },
        md: { base: 'px-3.5 py-2 text-sm gap-1.5' },
        lg: { base: 'px-4 py-2.5 text-sm gap-2' },
        xl: { base: 'px-5 py-3.5 text-base gap-2' }
      }
    },
    compoundVariants: [
      ...solidTextOnBrand,
      // 투명도 대신 한 단계 진한 색으로 눌리는 TDS 방식
      { color: 'primary', variant: 'solid', class: 'hover:bg-primary-600 active:bg-primary-700' },
      { color: 'secondary', variant: 'solid', class: 'hover:bg-secondary-600 active:bg-secondary-700' },
      { color: 'success', variant: 'solid', class: 'hover:bg-success-600 active:bg-success-700' },
      { color: 'info', variant: 'solid', class: 'hover:bg-info-600 active:bg-info-700' },
      { color: 'warning', variant: 'solid', class: 'hover:bg-warning-600 active:bg-warning-700' },
      { color: 'error', variant: 'solid', class: 'hover:bg-error-600 active:bg-error-700' },
      // TDS 의 dark fill 버튼 (#4e5968 / #4d4d59)
      {
        color: 'neutral',
        variant: 'solid',
        class: 'text-white dark:text-white bg-toss-grey-700 hover:bg-toss-grey-800 active:bg-toss-grey-800 dark:bg-toss-grey-300 dark:hover:bg-toss-grey-400 dark:active:bg-toss-grey-400'
      }
    ]
  },

  badge: {
    compoundVariants: [...solidTextOnBrand]
  },

  alert: {
    compoundVariants: [...solidTextOnBrand]
  },

  // 토스 카드: 테두리 없이 옅은 그림자, 다크에서는 layered 표면색
  card: {
    variants: {
      variant: {
        outline: {
          root: 'ring-0 shadow-sm bg-default dark:bg-muted'
        }
      }
    }
  },

  // 토스 입력 필드는 테두리 없는 회색 채움이 기본
  input: {
    defaultVariants: { variant: 'soft' }
  },
  inputNumber: {
    defaultVariants: { variant: 'soft' }
  },
  inputMenu: {
    defaultVariants: { variant: 'soft' }
  },
  textarea: {
    defaultVariants: { variant: 'soft' }
  },
  select: {
    defaultVariants: { variant: 'soft' }
  },
  selectMenu: {
    defaultVariants: { variant: 'soft' }
  },

  // 떠 있는 표면(모달/드롭다운)은 테두리 대신 그림자 + float 배경색
  modal: {
    slots: {
      content: 'ring-0 shadow-xl dark:bg-elevated'
    }
  },
  slideover: {
    slots: {
      content: 'sm:ring-0 sm:shadow-xl dark:bg-elevated'
    }
  },
  popover: {
    slots: {
      content: 'ring-0 shadow-lg dark:bg-elevated'
    }
  },
  dropdownMenu: {
    slots: {
      content: 'ring-0 shadow-lg dark:bg-elevated'
    }
  }
}
