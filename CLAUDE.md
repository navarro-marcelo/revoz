# REVOZ - Comunicacao Alternativa

## Visao Geral

REVOZ e um aplicativo de **Comunicacao Aumentativa e Alternativa (CAA)** para usuarios com dificuldades de fala ou mobilidade. Permite digitar frases em portugues brasileiro usando um teclado virtual otimizado para toque, com predicao de palavras, frases rapidas e sintese de voz.

**Stack:** React 19 + TypeScript + Vite 7 + Tailwind CSS 4 + PWA (vite-plugin-pwa)
**Deploy:** GitHub Pages via `npm run deploy` (gh-pages)
**Base path:** `/revoz/`

---

## Arquitetura

```
src/
├── App.tsx                    # Estado central (useReducer) + layout 3 zonas
├── main.tsx                   # Entry point (React StrictMode)
├── index.css                  # Tailwind theme (cores customizadas)
├── components/
│   ├── ActionButton.tsx       # Botao reutilizavel com variantes e debounce
│   ├── AlphaKeyboard.tsx      # Teclado virtual (letras + numeros)
│   ├── ConfirmModal.tsx       # Modal generico SIM/NAO
│   ├── QuickPhrases.tsx       # Modal de frases rapidas + Minhas Frases
│   ├── SettingsPanel.tsx      # Painel de configuracoes
│   ├── SuggestionBar.tsx      # Barra de sugestoes de palavras
│   └── TextDisplay.tsx        # Area de texto + botoes de acao
├── hooks/
│   ├── useAutocomplete.ts     # Predicao de palavras (prefixo + bigramas)
│   ├── useSettings.ts         # Configuracoes persistidas em localStorage
│   └── useSpeech.ts           # Sintese de voz (Web Speech API)
├── data/
│   ├── accentMap.ts           # Mapeamento normalizado -> acentuado (345 entradas)
│   ├── bigrams.ts             # Pares de palavras com score (contexto linguistico)
│   ├── dictionary.ts          # Vocabulario portugues com frequencia (~500+ palavras)
│   └── phrases.ts             # Frases rapidas organizadas em 5 categorias
└── utils/
    ├── storageManager.ts      # CRUD localStorage (settings, frases, dicionario)
    └── textProcessor.ts       # Funcoes puras de manipulacao de texto
```

---

## Layout (3 Zonas)

| Zona | Altura | Componente | Funcao |
|------|--------|------------|--------|
| 1 | 20% | `TextDisplay` | Texto digitado + botoes FALAR/SALVAR/PARAR/FRASES/etc |
| 2 | 15% | `SuggestionBar` | Top 5 sugestoes de palavras |
| 3 | 65% | `AlphaKeyboard` | Teclado virtual A-Z + numeros |

---

## Gerenciamento de Estado (App.tsx)

Estado centralizado via `useReducer`:

```typescript
interface AppState {
  currentText: string;
  showQuickPhrases: boolean;
  showSettings: boolean;
  showClearConfirm: boolean;
  showSavePrompt: boolean;     // controla botao SALVAR apos falar
}
```

### Actions do Reducer

| Action | Efeito |
|--------|--------|
| `APPEND_CHAR` | Adiciona caractere + esconde SALVAR |
| `DELETE_CHAR` | Remove ultimo caractere + esconde SALVAR |
| `DELETE_WORD` | Remove ultima palavra + esconde SALVAR |
| `CLEAR_TEXT` | Limpa texto + esconde SALVAR |
| `ADD_SPACE` | Adiciona espaco (sem duplicar) |
| `SELECT_SUGGESTION` | Substitui palavra parcial + esconde SALVAR |
| `SELECT_PHRASE` | Insere frase + fecha modal |
| `TOGGLE_QUICK_PHRASES` | Abre/fecha modal de frases |
| `TOGGLE_SETTINGS` | Abre/fecha configuracoes |
| `TOGGLE_CLEAR_CONFIRM` | Abre/fecha confirmacao de limpar |
| `SHOW_SAVE_PROMPT` | Mostra botao SALVAR (apos falar) |
| `HIDE_SAVE_PROMPT` | Esconde botao SALVAR |

---

## Componentes

### ActionButton

Botao reutilizavel com variantes visuais, debounce (300ms) e som opcional.

**Variantes:** `key` | `speak` (verde) | `clear` (vermelho) | `suggestion` (azul) | `phrase` (roxo) | `delete-word` (laranja) | `save` (dourado/amber) | `default` (cinza)

### TextDisplay

Area de exibicao do texto com cursor animado. Botoes de acao:

- **FALAR** (verde) — fala o texto via sintese de voz
- **PARAR** (vermelho) — para a fala em andamento
- **SALVAR** (dourado) — aparece apos falar, salva frase no banco pessoal
- **↩** — apaga ultima palavra
- **🗑** — limpa todo o texto (com confirmacao)
- **FRASES** — abre modal de frases rapidas
- **⚙** — abre configuracoes

**Fluxo do botao SALVAR:**
1. Usuario clica FALAR → botao vira SALVAR
2. Se clicar SALVAR → frase e salva no localStorage, botao volta a FALAR
3. Se digitar qualquer coisa → botao volta a FALAR (sem salvar)

### AlphaKeyboard

Teclado virtual com layout otimizado para CAA:
- 3 fileiras: A-I, J-R, S-Z + C
- Toggle para teclado numerico (0-9)
- Botao ESPACO e APAGAR
- Som de tecla opcional (beep 800Hz, 50ms)

### SuggestionBar

Exibe top 5 sugestoes de palavras. Placeholder quando nao ha sugestoes.

### QuickPhrases

Modal com abas de categorias de frases:

1. **Minhas Frases** (primeira aba, cor dourada) — frases salvas pelo usuario
   - Lista em coluna unica com botao X para excluir cada frase
   - Estado vazio mostra mensagem orientativa
   - Dados carregados de `localStorage` via `loadSavedPhrases()`
2. **Saude** 🏥 — dor, remedio, medico, hospital, febre...
3. **Necessidades** 🍽️ — fome, sede, banheiro, banho...
4. **Social** 💬 — obrigado, bom dia, te amo, por favor...
5. **Sentimentos** ❤️ — feliz, triste, cansada, com medo...
6. **Pedidos** 🙏 — liga TV, abre janela, acende luz...

### SettingsPanel

- Velocidade da voz: 0.5 - 1.5 (padrao 0.85)
- Tom da voz: 0.5 - 2.0 (padrao 1.0)
- Tamanho da fonte: Normal / Grande / Muito Grande
- Som das teclas: ligado/desligado
- Botao testar voz
- Botao restaurar padroes

### ConfirmModal

Modal generico com mensagem + botoes SIM / NAO.

---

## Hooks

### useSpeech(settings)

Sintese de voz via Web Speech API.
- Detecta melhor voz portuguesa (pt-BR preferido, fallback pt)
- Retorna: `{ speak, stop, isSpeaking, voiceReady }`
- Cancela utterance anterior automaticamente

### useAutocomplete(currentText)

Predicao de palavras com contexto linguistico.
- **Indice de prefixo:** construido uma vez no mount (dictionary.ts)
- **Mapa de bigramas:** construido uma vez no mount (bigrams.ts)
- **Algoritmo:**
  1. Extrai palavra parcial (ultima palavra incompleta)
  2. Se nenhuma parcial + palavra anterior existe: sugere via bigramas
  3. Caso contrario: busca por prefixo de 4 chars (fallback para prefixos menores)
  4. Adiciona palavras do dicionario do usuario
  5. Boost de score se segue palavra anterior (contexto de bigrama)
  6. Filtra duplicatas, mantém maior frequencia
  7. Retorna top 5
- `learnWord()`: salva novas palavras no localStorage

### useSettings()

Configuracoes persistidas em localStorage.
- Retorna: `{ settings, updateSettings, resetSettings }`
- Merge com defaults ao carregar

---

## Utils

### textProcessor.ts

Funcoes puras sem side effects:

| Funcao | Descricao |
|--------|-----------|
| `normalize(text)` | Lowercase + remove acentos ("Voce" → "voce") |
| `getCurrentPartialWord(text)` | Ultima palavra incompleta ("ola mun" → "mun") |
| `getLastCompletedWord(text)` | Palavra anterior completa (para bigramas) |
| `replacePartialWord(text, word)` | Substitui parcial por sugestao + espaco |
| `deleteLastWord(text)` | Remove ultima palavra completa |

### storageManager.ts

CRUD para localStorage com tratamento de erros silencioso.

| Chave | Funcoes | Limite |
|-------|---------|--------|
| `revoz-settings` | `loadSettings()` / `saveSettings()` | 1 objeto |
| `revoz-recent-phrases` | `loadRecentPhrases()` / `saveRecentPhrase()` | 20 frases |
| `revoz-user-dictionary` | `loadUserDictionary()` / `saveUserWord()` | 500 palavras |
| `revoz-saved-phrases` | `loadSavedPhrases()` / `savePhraseToBank()` / `deleteSavedPhrase()` | 50 frases |

---

## Dados

### dictionary.ts

~500+ palavras em portugues brasileiro com frequencia (90-100). Inclui pronomes, artigos, preposicoes, verbos essenciais, termos medicos, vocabulario domestico.

### bigrams.ts

Pares de palavras com score (1-10) para predicao contextual. Ex: "eu" → "quero" (10), "voce" → "pode" (9).

### phrases.ts

5 categorias de frases rapidas pre-definidas (saude, necessidades, social, sentimentos, pedidos). ~10 frases por categoria.

### accentMap.ts

345 mapeamentos de palavras normalizadas para acentuadas. Ex: "voce" → "voce", "nao" → "nao". Usado pelo autocomplete para exibir acentos corretos.

---

## Tema e Cores (index.css)

```css
--color-key-bg: #E5E7EB      /* teclas do teclado */
--color-key-text: #000000
--color-speak: #16A34A        /* botao FALAR (verde) */
--color-clear: #DC2626        /* botao limpar/parar (vermelho) */
--color-suggestion: #2563EB   /* sugestoes (azul) */
--color-phrase: #7C3AED       /* frases rapidas (roxo) */
--color-delete-word: #EA580C  /* apagar palavra (laranja) */
--color-save: #D97706         /* salvar frase (dourado/amber) */
--color-display-bg: #F9FAFB   /* fundo area de texto */
--color-overlay: rgba(0,0,0,0.5)
```

---

## PWA

Configurado em `vite.config.ts`:
- Manifest com icones 192x192 e 512x512
- Service worker com workbox (cache de JS, CSS, HTML, imagens, fontes)
- Display standalone, orientacao landscape
- Tema azul (#2563EB)

---

## Scripts

| Comando | Funcao |
|---------|--------|
| `npm run dev` | Servidor de desenvolvimento (Vite) |
| `npm run build` | Build de producao (tsc + vite build) |
| `npm run preview` | Preview do build local |
| `npm run lint` | ESLint |
| `npm run deploy` | Build + deploy no GitHub Pages |

---

## Fluxo Principal do Usuario

1. **Digitar:** Teclado virtual → caracteres aparecem na area de texto
2. **Completar:** Sugestoes aparecem na barra → clicar para completar palavra
3. **Falar:** Clicar FALAR → voz sintetizada le o texto
4. **Salvar frase:** Apos falar, clicar SALVAR → frase armazenada no banco pessoal
5. **Reutilizar:** Abrir FRASES → aba Minhas Frases → clicar para falar novamente
6. **Frases rapidas:** Abrir FRASES → escolher categoria → clicar frase pre-definida

---

## Convencoes de Codigo

- **TypeScript strict** em todo o projeto
- **Componentes funcionais** com hooks
- **Estado centralizado** via useReducer (sem Redux/Zustand)
- **Sem backend** — 100% client-side, dados em localStorage
- **Tailwind CSS 4** com cores customizadas via `@theme`
- **Sem emojis no codigo** exceto nos dados de UI (icones de categorias)
- **Portugues brasileiro** em toda a interface e dados
