// @ts-check
import withNuxt from './playground/.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
).append({
  ignores: ['dist']
}).append({
  // eslint 은 저장소 루트에서 도는데 Nuxt 가 만든 규칙은 playground/ 접두사를
  // 모르므로, 페이지·레이아웃 파일명 규칙을 여기서 다시 꺼 준다.
  files: ['playground/app/pages/**/*.vue', 'playground/app/layouts/**/*.vue'],
  rules: {
    'vue/multi-word-component-names': 'off'
  }
})
