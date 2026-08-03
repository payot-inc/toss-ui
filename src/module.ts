import type { ModuleDependencies, Nuxt } from '@nuxt/schema'
import { createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'
import { tossUiTheme } from './theme'

/**
 * 웹폰트 로딩 전략.
 *
 * - `'subset'`  jsDelivr 의 unicode-range 서브셋 스타일시트를 그대로 쓴다.
 *               Pretendard 92 조각 / Tossface 12 조각 중 실제 쓰는 것만 내려받는다.
 * - `'bundled'` Pretendard 를 @nuxt/fonts 로 넘겨 자체 호스팅한다. 서브셋이 사라져
 *               단일 파일 2.06MB 를 통째로 받으므로 한글 서비스에는 권장하지 않는다.
 *               (Tossface 는 합본 빌드가 없어 이 모드에서도 서브셋을 쓴다)
 * - `false`     아무 폰트도 불러오지 않는다. --font-sans 변수만 지정되므로
 *               폰트 로딩은 소비자가 직접 처리한다.
 */
export type FontStrategy = 'subset' | 'bundled' | false

export interface ModuleOptions {
  /**
   * TDS 테마 CSS(팔레트 · Tailwind @theme 매핑 · Nuxt UI 시맨틱 토큰) 주입 여부.
   * @default true
   */
  theme?: boolean
  /**
   * Nuxt UI appConfig 프리셋(컬러 매핑 · 컴포넌트 오버라이드) 주입 여부.
   * @default true
   */
  appConfig?: boolean
  /**
   * 웹폰트 로딩 전략.
   * @default 'subset'
   */
  fonts?: FontStrategy
  /**
   * @nuxt/ui 에 전달할 옵션. 기본값으로만 넘어가므로 소비자가 nuxt.config 의
   * `ui` 키에 직접 쓴 값이 항상 우선한다.
   */
  ui?: Record<string, unknown>
}

const PRETENDARD_VARIABLE_WOFF2
  = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@payot-inc/toss-ui',
    configKey: 'tossUi',
    compatibility: {
      nuxt: '>=4.0.0'
    }
  },
  defaults: {
    theme: true,
    appConfig: true,
    fonts: 'subset'
  },

  // installModule() 로는 @nuxt/ui 의 moduleDependencies(@nuxt/icon, @nuxt/fonts,
  // @nuxtjs/color-mode)가 따라오지 않아 아이콘·색상모드가 통째로 빠진다.
  // moduleDependencies 로 선언해야 Nuxt 가 의존성 트리를 함께 설치한다.
  //
  // 여기서는 defaults 가 아직 적용되지 않은 원본 사용자 설정만 읽을 수 있다.
  // 반환 타입을 명시하지 않으면 nuxt.options 의 tossUi 키가 이 모듈 자신에서
  // 증강된 타입이라 추론이 순환한다 (TS7022/TS7023).
  moduleDependencies(nuxt: Nuxt): ModuleDependencies {
    const options = (nuxt.options as unknown as { tossUi?: ModuleOptions }).tossUi

    return {
      '@nuxt/ui': {
        defaults: options?.ui ?? {}
      },
      // @nuxt/icon 역시 @nuxt/ui 를 통해 설치되지만, 아이콘 번들 전략은 그 모듈의
      // setup 전에 넘겨야 하므로 여기서 기본값을 선언한다. (@nuxt/ui 는 자체
      // moduleDependencies 에서 cssLayer 만 지정하며, 여기 defaults 와 defu 병합된다.)
      //
      // scan: true 가 없으면 @nuxt/ui 가 CSS 모드로 그리는 아이콘 중 배열·config 로
      // 넘어가는 "동적 아이콘명"(예: 네비게이션 아이템의 i-lucide-wallet)이 정적
      // 검출에서 누락돼 클라이언트 번들에 안 들어간다. 그러면 SSR/프리렌더 중
      // /api/_nuxt_icon 런타임 조회로 넘어가고, 이게 실패하며 페이지마다
      // `[Icon] failed to load icon lucide:*` 경고가 쏟아진다. scan 은 소비 프로젝트
      // 소스를 훑어 실제 사용하는 아이콘명을 모두 번들에 포함시켜 이 경로를 없앤다.
      //
      // 소비자가 nuxt.config 의 `icon` 키에 직접 쓴 값은 defaults 이므로 항상 우선한다.
      '@nuxt/icon': {
        defaults: {
          clientBundle: {
            scan: true,
            // 기본 256KB. 아이콘을 많이 쓰는 소비자를 위해 여유를 둔다
            // (lucide 는 아이콘당 ~0.3KB 라 수백 개까지 이 한도 안에 들어온다).
            sizeLimitKb: 512
          }
        }
      },
      // @nuxt/fonts 는 @nuxt/ui 를 통해 어차피 설치되지만, 폰트 패밀리 설정은
      // 그 모듈의 setup 전에 넘겨야 하므로 여기서 함께 선언한다.
      ...options?.fonts === 'bundled' && {
        '@nuxt/fonts': {
          defaults: {
            families: [{
              name: 'Pretendard Variable',
              provider: 'none',
              src: PRETENDARD_VARIABLE_WOFF2,
              weight: '45 920',
              display: 'swap'
            }]
          }
        }
      }
    }
  },

  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // moduleDependencies 로 설치된 @nuxt/ui 는 이 setup 보다 먼저 실행되면서
    // `appConfig.ui = defu(기존값, 자기 기본값)` 으로 primary: 'green' 등을 심어 둔다.
    // 따라서 우리 프리셋이 이기도록 병합 순서를 잡는다. 소비자의 app/app.config.ts 는
    // 런타임 defuFn(app.config.ts, inlineConfig) 에서 여전히 최우선으로 남는다.
    if (options.appConfig !== false) {
      // appConfig.ui 의 타입은 @nuxt/ui 증강이 로드된 곳에서만 구체화되므로
      // 양쪽 컨텍스트에서 모두 통하도록 입출력을 함께 좁혀 준다.
      // (프리셋은 Nuxt UI appConfig 의 부분집합이라 defu 결과에 icons/tv 가 없다)
      const current = nuxt.options.appConfig.ui as Record<string, unknown> | undefined

      nuxt.options.appConfig.ui = defu(tossUiTheme, current ?? {}) as typeof nuxt.options.appConfig.ui
    }

    // unshift 로 넣으므로 실제 순서는 [폰트, 테마, ...소비자 CSS] 가 된다.
    // 테마가 소비자 CSS 보다 앞서야 소비자가 토큰을 덮어쓸 수 있다.
    if (options.theme !== false) {
      nuxt.options.css.unshift(resolve('./runtime/assets/css/theme.css'))
    }

    if (options.fonts !== false) {
      nuxt.options.css.unshift(resolve('./runtime/assets/css/fonts-tossface.css'))

      if (options.fonts === 'subset') {
        nuxt.options.css.unshift(resolve('./runtime/assets/css/fonts-pretendard.css'))
      }
    }
  }
})
