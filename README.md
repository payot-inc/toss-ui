# @payot-inc/toss-ui

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

[Nuxt UI](https://ui.nuxt.com) 에 토스 디자인 시스템(TDS)의 색·타이포·모서리·그림자를 입히는 Nuxt 모듈입니다.

- **Adaptive 팔레트** — TDS 처럼 라이트/다크가 서로 다른 팔레트를 쓴다. 다크에서 스케일이 반전되므로 `toss-blue-500` 은 양쪽 모두에서 "그 파랑"이다.
- **Nuxt UI 시맨틱 토큰 매핑** — `bg-default` · `text-muted` · `border-default` 같은 Nuxt UI 유틸리티가 그대로 TDS 표면 체계를 가리킨다.
- **컴포넌트 프리셋** — 버튼은 semibold + 진해지는 hover, 입력 필드는 테두리 없는 회색 채움, 모달·드롭다운은 그림자 기반.
- **한글 최적화** — Pretendard 서브셋 로딩, `word-break: keep-all`, 금액 정렬용 `tnum`.

## 설치

이 패키지는 [GitHub Packages](https://github.com/payot-inc/toss-ui/packages) 에 배포됩니다. GitHub Packages 는 **공개 패키지라도 설치에 토큰을 요구**하므로, 쓰려는 프로젝트에 아래 설정이 한 번 필요합니다.

**1. 프로젝트 루트에 `.npmrc`**

```ini [.npmrc]
@payot-inc:registry=https://npm.pkg.github.com
```

**2. 토큰 등록** — `read:packages` 권한의 [Personal Access Token (classic)](https://github.com/settings/tokens) 을 발급해 홈 디렉터리의 `~/.npmrc` 에 넣습니다. 토큰이 저장소에 커밋되지 않도록 프로젝트 `.npmrc` 가 아닌 홈에 둡니다.

```ini [~/.npmrc]
//npm.pkg.github.com/:_authToken=ghp_xxxxxxxxxxxx
```

**3. 설치**

```bash
npm install @payot-inc/toss-ui
# 또는
bun add @payot-inc/toss-ui
```

CI 에서는 `GITHUB_TOKEN` 에 `packages: read` 권한을 주고 `NODE_AUTH_TOKEN` 으로 넘기면 됩니다.

```yaml [.github/workflows/ci.yml]
permissions:
  packages: read

steps:
  - uses: actions/setup-node@v7
    with:
      registry-url: https://npm.pkg.github.com
      scope: '@payot-inc'
  - run: npm ci
    env:
      NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 사용

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@payot-inc/toss-ui']
})
```

`@nuxt/ui` 와 그 의존 모듈(`@nuxt/icon` · `@nuxt/fonts` · `@nuxtjs/color-mode`)은 이 모듈이 함께 설치하므로 따로 등록하지 않아도 됩니다. Tailwind 진입점 CSS 도 모듈이 주입하므로 `css` 설정이 필요 없습니다.

앱 루트는 `<UApp>` 으로 감싸야 합니다. Nuxt UI 의 툴팁·모달·토스트가 여기서 주입되는 provider 컨텍스트를 필요로 합니다.

```vue [app/app.vue]
<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
```

### 아이콘

아이콘 컬렉션 `@iconify-json/lucide` 는 이 모듈의 의존성으로 함께 설치되며, `@nuxt/icon` 의
`clientBundle.scan` 을 기본으로 켜 둡니다. 그래서 네비게이션 아이템처럼 **배열·config 로 넘기는
동적 아이콘명**(`{ icon: 'i-lucide-wallet' }`)까지 소스 스캔으로 번들에 포함되어, SSR/프리렌더
단계에서 `[Icon] failed to load icon lucide:*` 경고 없이 아이콘이 그려집니다. 별도 설정은 필요 없습니다.

> [!NOTE]
> `@nuxt/icon` 은 아이콘 컬렉션을 **소비 프로젝트 루트의 `node_modules`** 에서만 찾습니다
> (`rootDir` · `workspaceDir` 기준). `npm` · `yarn` · `bun` 은 의존성을 루트로 호이스팅하므로
> 자동으로 동작하지만, `pnpm` 처럼 의존성을 엄격히 중첩 설치하는 패키지 매니저에서는
> `@iconify-json/lucide` 가 루트에 없어 컬렉션을 못 찾을 수 있습니다. 이 경우 소비 프로젝트에서
> 직접 설치하거나(`pnpm add -D @iconify-json/lucide`) `.npmrc` 에
> `public-hoist-pattern[]=@iconify-json/*` 를 추가해 루트로 끌어올리세요.

## 옵션

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['@payot-inc/toss-ui'],

  tossUi: {
    theme: true,       // TDS 테마 CSS 주입
    appConfig: true,   // Nuxt UI 컴포넌트 프리셋 주입
    fonts: 'subset',   // 'subset' | 'bundled' | false
    ui: {}             // @nuxt/ui 에 그대로 전달
  }
})
```

### `fonts`

| 값 | 동작 |
| --- | --- |
| `'subset'` (기본) | jsDelivr 의 `unicode-range` 서브셋 스타일시트를 쓴다. Pretendard 92 조각 · Tossface 12 조각 중 화면에 실제로 그려지는 글자에 해당하는 조각만 내려받는다 (조각당 약 34KB). |
| `'bundled'` | Pretendard 를 `@nuxt/fonts` 로 넘겨 자체 호스팅한다. |
| `false` | 웹폰트를 불러오지 않는다. `--font-sans` · `--font-emoji` 이름만 지정되므로 로딩은 직접 처리한다. |

> [!WARNING]
> `'bundled'` 는 서브셋이 사라져 Pretendard 단일 파일 **2.06MB** 를 통째로 내려받습니다. 한글 서비스에서는 초기 로딩이 크게 나빠지므로 권장하지 않습니다. Tossface 는 합본 빌드가 배포되지 않아 이 모드에서도 서브셋 스타일시트를 그대로 씁니다.

## 커스터마이징

프리셋은 `nuxt.options.appConfig.ui` 에 병합되고, 앱의 `app/app.config.ts` 가 항상 그 위에서 이깁니다.

```ts [app/app.config.ts]
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'toss-green'
    },
    button: {
      slots: {
        base: 'font-bold'
      }
    }
  }
})
```

CSS 변수도 앱 CSS 에서 덮어쓸 수 있습니다. 모듈 CSS 는 항상 앱 CSS 보다 앞에 주입됩니다.

```css [app/assets/css/main.css]
:root,
.light,
.dark {
  --ui-radius: 1rem;
}
```

### 쓸 수 있는 색

`toss-blue` · `toss-grey` · `toss-red` · `toss-orange` · `toss-yellow` · `toss-green` · `toss-teal` · `toss-purple` 이 각각 `50`–`950` 스케일로 제공되며, `bg-toss-blue-500` 같은 Tailwind 유틸리티로 바로 쓸 수 있습니다.

기본 매핑은 다음과 같습니다.

| Nuxt UI | TDS |
| --- | --- |
| `primary` | `toss-blue` |
| `secondary` | `toss-purple` |
| `success` | `toss-green` |
| `info` | `toss-teal` |
| `warning` | `toss-yellow` |
| `error` | `toss-red` |
| `neutral` | `toss-grey` |

## 개발

```bash
bun install
bun run dev:prepare   # 모듈 스텁 + 타입 생성
bun run dev           # playground 실행
bun run lint
bun run typecheck
bun run build         # dist/ 생성
```

`playground/` 는 모든 토큰과 컴포넌트를 한 페이지에 늘어놓은 확인용 앱입니다. 헤더의 버튼으로 라이트/다크를 전환해 adaptive 팔레트가 어떻게 뒤집히는지 볼 수 있습니다.

## 배포

`package.json` 의 `version` 을 올리고 GitHub 에서 릴리스를 만들면 [publish 워크플로](.github/workflows/publish.yml) 가 GitHub Packages 로 배포합니다. `GITHUB_TOKEN` 을 쓰므로 별도 시크릿 설정이 필요 없습니다.

```bash
gh release create v0.1.0 --generate-notes
```

로컬에서 직접 배포하려면 `write:packages` 권한의 토큰이 `~/.npmrc` 에 있어야 합니다.

```bash
npm publish   # prepack 이 dist/ 를 빌드합니다
```

## 라이선스

[MIT](./LICENSE)

컬러 값은 토스가 배포하는 [TDS 스타일시트](https://assets-fe.toss.im/tds/style.css) 의 adaptive 토큰을 옮긴 것입니다. [Pretendard](https://github.com/orioncactus/pretendard) 와 [Tossface](https://github.com/toss/tossface) 는 SIL OFL 라이선스로 배포됩니다.
