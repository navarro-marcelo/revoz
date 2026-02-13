// ---------------------------------------------------------------------------
// Brazilian Portuguese bigram pairs for AAC (Augmentative & Alternative
// Communication).  Every word is stored WITHOUT diacritical marks so that
// look-ups from an on-screen keyboard that omits accents still work.
//
// score  1-10  (10 = almost always follows, 1 = plausible but uncommon)
// ---------------------------------------------------------------------------

export type Bigram = {
  first: string;
  second: string;
  score: number;
};

export const bigrams: Bigram[] = [
  // ------------------------------------------------------------------
  //  PRONOUNS -> VERBS
  // ------------------------------------------------------------------

  // eu
  { first: "eu", second: "quero", score: 10 },
  { first: "eu", second: "preciso", score: 9 },
  { first: "eu", second: "estou", score: 9 },
  { first: "eu", second: "tenho", score: 8 },
  { first: "eu", second: "posso", score: 7 },
  { first: "eu", second: "vou", score: 8 },
  { first: "eu", second: "sou", score: 5 },
  { first: "eu", second: "sei", score: 5 },
  { first: "eu", second: "nao", score: 8 },
  { first: "eu", second: "gosto", score: 4 },
  { first: "eu", second: "to", score: 6 },

  // voce
  { first: "voce", second: "pode", score: 9 },
  { first: "voce", second: "esta", score: 7 },
  { first: "voce", second: "vai", score: 7 },
  { first: "voce", second: "tem", score: 6 },
  { first: "voce", second: "sabe", score: 5 },
  { first: "voce", second: "quer", score: 6 },

  // ele
  { first: "ele", second: "esta", score: 8 },
  { first: "ele", second: "vai", score: 7 },
  { first: "ele", second: "tem", score: 7 },
  { first: "ele", second: "quer", score: 5 },
  { first: "ele", second: "pode", score: 5 },

  // ela
  { first: "ela", second: "esta", score: 8 },
  { first: "ela", second: "vai", score: 7 },
  { first: "ela", second: "tem", score: 7 },
  { first: "ela", second: "quer", score: 5 },
  { first: "ela", second: "pode", score: 5 },

  // nos
  { first: "nos", second: "vamos", score: 9 },
  { first: "nos", second: "temos", score: 6 },
  { first: "nos", second: "podemos", score: 6 },
  { first: "nos", second: "estamos", score: 6 },
  { first: "nos", second: "queremos", score: 5 },

  // eles
  { first: "eles", second: "estao", score: 7 },
  { first: "eles", second: "vao", score: 7 },
  { first: "eles", second: "tem", score: 6 },
  { first: "eles", second: "podem", score: 5 },
  { first: "eles", second: "querem", score: 5 },

  // ------------------------------------------------------------------
  //  STATE VERBS
  // ------------------------------------------------------------------

  // estou
  { first: "estou", second: "com", score: 10 },
  { first: "estou", second: "bem", score: 8 },
  { first: "estou", second: "mal", score: 7 },
  { first: "estou", second: "aqui", score: 6 },
  { first: "estou", second: "cansada", score: 6 },
  { first: "estou", second: "cansado", score: 6 },
  { first: "estou", second: "doente", score: 7 },
  { first: "estou", second: "feliz", score: 5 },
  { first: "estou", second: "triste", score: 5 },
  { first: "estou", second: "sentindo", score: 5 },

  // esta
  { first: "esta", second: "bom", score: 6 },
  { first: "esta", second: "bem", score: 7 },
  { first: "esta", second: "aqui", score: 6 },
  { first: "esta", second: "frio", score: 5 },
  { first: "esta", second: "quente", score: 5 },
  { first: "esta", second: "chovendo", score: 4 },
  { first: "esta", second: "doendo", score: 6 },

  // tenho
  { first: "tenho", second: "dor", score: 9 },
  { first: "tenho", second: "fome", score: 8 },
  { first: "tenho", second: "sede", score: 8 },
  { first: "tenho", second: "medo", score: 6 },
  { first: "tenho", second: "sono", score: 7 },
  { first: "tenho", second: "febre", score: 7 },
  { first: "tenho", second: "que", score: 7 },

  // sou
  { first: "sou", second: "eu", score: 5 },
  { first: "sou", second: "assim", score: 4 },

  // ------------------------------------------------------------------
  //  WANT / NEED
  // ------------------------------------------------------------------

  // quero
  { first: "quero", second: "ir", score: 9 },
  { first: "quero", second: "agua", score: 9 },
  { first: "quero", second: "comer", score: 9 },
  { first: "quero", second: "dormir", score: 8 },
  { first: "quero", second: "ver", score: 5 },
  { first: "quero", second: "falar", score: 6 },
  { first: "quero", second: "sair", score: 5 },
  { first: "quero", second: "ficar", score: 5 },

  // preciso
  { first: "preciso", second: "de", score: 9 },
  { first: "preciso", second: "ir", score: 8 },
  { first: "preciso", second: "ajuda", score: 9 },
  { first: "preciso", second: "remedio", score: 8 },
  { first: "preciso", second: "dormir", score: 6 },
  { first: "preciso", second: "comer", score: 6 },
  { first: "preciso", second: "falar", score: 5 },
  { first: "preciso", second: "tomar", score: 6 },

  // posso
  { first: "posso", second: "ir", score: 8 },
  { first: "posso", second: "comer", score: 6 },
  { first: "posso", second: "beber", score: 5 },
  { first: "posso", second: "dormir", score: 5 },
  { first: "posso", second: "falar", score: 5 },
  { first: "posso", second: "sair", score: 5 },

  // vou
  { first: "vou", second: "ao", score: 7 },
  { first: "vou", second: "para", score: 7 },
  { first: "vou", second: "bem", score: 6 },
  { first: "vou", second: "mal", score: 5 },
  { first: "vou", second: "dormir", score: 6 },
  { first: "vou", second: "comer", score: 5 },
  { first: "vou", second: "sair", score: 4 },

  // ------------------------------------------------------------------
  //  COMMON PREPOSITIONS / LOCATIVES
  // ------------------------------------------------------------------

  // com
  { first: "com", second: "dor", score: 9 },
  { first: "com", second: "fome", score: 8 },
  { first: "com", second: "sede", score: 8 },
  { first: "com", second: "frio", score: 7 },
  { first: "com", second: "calor", score: 7 },
  { first: "com", second: "medo", score: 6 },
  { first: "com", second: "voce", score: 5 },
  { first: "com", second: "ele", score: 4 },
  { first: "com", second: "ela", score: 4 },
  { first: "com", second: "sono", score: 7 },

  // de
  { first: "de", second: "cabeca", score: 8 },
  { first: "de", second: "barriga", score: 7 },
  { first: "de", second: "dente", score: 6 },
  { first: "de", second: "costas", score: 6 },
  { first: "de", second: "peito", score: 5 },
  { first: "de", second: "comer", score: 5 },
  { first: "de", second: "beber", score: 5 },
  { first: "de", second: "dormir", score: 4 },
  { first: "de", second: "ir", score: 4 },

  // para
  { first: "para", second: "mim", score: 7 },
  { first: "para", second: "voce", score: 6 },
  { first: "para", second: "ele", score: 4 },
  { first: "para", second: "ela", score: 4 },
  { first: "para", second: "casa", score: 7 },
  { first: "para", second: "la", score: 5 },
  { first: "para", second: "ca", score: 4 },
  { first: "para", second: "comer", score: 5 },
  { first: "para", second: "beber", score: 4 },
  { first: "para", second: "dormir", score: 4 },

  // sem
  { first: "sem", second: "dor", score: 6 },
  { first: "sem", second: "fome", score: 4 },
  { first: "sem", second: "medo", score: 4 },
  { first: "sem", second: "problema", score: 5 },
  { first: "sem", second: "sono", score: 4 },

  // no
  { first: "no", second: "banheiro", score: 8 },
  { first: "no", second: "quarto", score: 7 },
  { first: "no", second: "hospital", score: 7 },
  { first: "no", second: "medico", score: 6 },
  { first: "no", second: "braco", score: 5 },
  { first: "no", second: "pe", score: 5 },
  { first: "no", second: "peito", score: 5 },

  // na
  { first: "na", second: "cabeca", score: 7 },
  { first: "na", second: "mao", score: 6 },
  { first: "na", second: "perna", score: 5 },
  { first: "na", second: "barriga", score: 6 },
  { first: "na", second: "costas", score: 5 },
  { first: "na", second: "cama", score: 6 },
  { first: "na", second: "cadeira", score: 5 },
  { first: "na", second: "cozinha", score: 4 },

  // do
  { first: "do", second: "remedio", score: 7 },
  { first: "do", second: "medico", score: 6 },
  { first: "do", second: "hospital", score: 5 },
  { first: "do", second: "lado", score: 5 },
  { first: "do", second: "corpo", score: 4 },

  // da
  { first: "da", second: "dor", score: 7 },
  { first: "da", second: "cabeca", score: 6 },
  { first: "da", second: "barriga", score: 5 },
  { first: "da", second: "mao", score: 4 },
  { first: "da", second: "perna", score: 4 },
  { first: "da", second: "manha", score: 5 },
  { first: "da", second: "tarde", score: 5 },
  { first: "da", second: "noite", score: 5 },

  // ------------------------------------------------------------------
  //  ACTION VERBS (requests / commands)
  // ------------------------------------------------------------------

  // me
  { first: "me", second: "ajuda", score: 10 },
  { first: "me", second: "leva", score: 7 },
  { first: "me", second: "traz", score: 6 },
  { first: "me", second: "da", score: 7 },
  { first: "me", second: "pega", score: 5 },
  { first: "me", second: "ajude", score: 8 },

  // chama
  { first: "chama", second: "o", score: 6 },
  { first: "chama", second: "a", score: 6 },
  { first: "chama", second: "medico", score: 8 },
  { first: "chama", second: "enfermeira", score: 8 },
  { first: "chama", second: "ambulancia", score: 9 },
  { first: "chama", second: "mae", score: 7 },
  { first: "chama", second: "pai", score: 7 },

  // liga
  { first: "liga", second: "para", score: 7 },
  { first: "liga", second: "televisao", score: 6 },
  { first: "liga", second: "o", score: 5 },
  { first: "liga", second: "a", score: 5 },
  { first: "liga", second: "ventilador", score: 5 },
  { first: "liga", second: "luz", score: 6 },

  // abre
  { first: "abre", second: "a", score: 7 },
  { first: "abre", second: "porta", score: 7 },
  { first: "abre", second: "janela", score: 6 },

  // fecha
  { first: "fecha", second: "a", score: 7 },
  { first: "fecha", second: "porta", score: 7 },
  { first: "fecha", second: "janela", score: 6 },

  // coloca
  { first: "coloca", second: "o", score: 6 },
  { first: "coloca", second: "a", score: 6 },
  { first: "coloca", second: "aqui", score: 7 },
  { first: "coloca", second: "ali", score: 5 },

  // tira
  { first: "tira", second: "isso", score: 7 },
  { first: "tira", second: "o", score: 5 },
  { first: "tira", second: "a", score: 5 },

  // pega
  { first: "pega", second: "o", score: 6 },
  { first: "pega", second: "a", score: 6 },
  { first: "pega", second: "meu", score: 5 },
  { first: "pega", second: "minha", score: 5 },
  { first: "pega", second: "agua", score: 7 },
  { first: "pega", second: "remedio", score: 7 },

  // ------------------------------------------------------------------
  //  NEGATION
  // ------------------------------------------------------------------

  { first: "nao", second: "quero", score: 10 },
  { first: "nao", second: "posso", score: 8 },
  { first: "nao", second: "sei", score: 7 },
  { first: "nao", second: "consigo", score: 8 },
  { first: "nao", second: "estou", score: 7 },
  { first: "nao", second: "tenho", score: 6 },
  { first: "nao", second: "vou", score: 6 },
  { first: "nao", second: "preciso", score: 5 },
  { first: "nao", second: "gosto", score: 5 },
  { first: "nao", second: "entendo", score: 6 },

  // ------------------------------------------------------------------
  //  HEALTH
  // ------------------------------------------------------------------

  // dor
  { first: "dor", second: "de", score: 9 },
  { first: "dor", second: "no", score: 7 },
  { first: "dor", second: "na", score: 7 },
  { first: "dor", second: "forte", score: 8 },
  { first: "dor", second: "aqui", score: 8 },

  // remedio
  { first: "remedio", second: "para", score: 8 },
  { first: "remedio", second: "da", score: 5 },
  { first: "remedio", second: "de", score: 5 },

  // medico
  { first: "medico", second: "agora", score: 8 },
  { first: "medico", second: "urgente", score: 9 },
  { first: "medico", second: "amanha", score: 5 },

  // ------------------------------------------------------------------
  //  TIME
  // ------------------------------------------------------------------

  // agora
  { first: "agora", second: "mesmo", score: 7 },
  { first: "agora", second: "nao", score: 7 },
  { first: "agora", second: "sim", score: 5 },
  { first: "agora", second: "por", score: 4 },
  { first: "agora", second: "favor", score: 3 },

  // depois
  { first: "depois", second: "eu", score: 5 },
  { first: "depois", second: "voce", score: 4 },
  { first: "depois", second: "a", score: 3 },
  { first: "depois", second: "de", score: 6 },

  // amanha
  { first: "amanha", second: "eu", score: 5 },
  { first: "amanha", second: "vou", score: 5 },
  { first: "amanha", second: "tem", score: 5 },
  { first: "amanha", second: "vamos", score: 4 },

  // hoje
  { first: "hoje", second: "eu", score: 6 },
  { first: "hoje", second: "tem", score: 5 },
  { first: "hoje", second: "esta", score: 5 },
  { first: "hoje", second: "vou", score: 5 },

  // ------------------------------------------------------------------
  //  SOCIAL / POLITENESS
  // ------------------------------------------------------------------

  // muito
  { first: "muito", second: "obrigado", score: 9 },
  { first: "muito", second: "obrigada", score: 9 },
  { first: "muito", second: "bem", score: 7 },
  { first: "muito", second: "bom", score: 6 },
  { first: "muito", second: "mal", score: 6 },
  { first: "muito", second: "quente", score: 4 },
  { first: "muito", second: "frio", score: 4 },
  { first: "muito", second: "grande", score: 3 },
  { first: "muito", second: "cansada", score: 4 },
  { first: "muito", second: "cansado", score: 4 },

  // bom
  { first: "bom", second: "dia", score: 10 },
  { first: "bom", second: "demais", score: 5 },

  // boa
  { first: "boa", second: "tarde", score: 10 },
  { first: "boa", second: "noite", score: 10 },

  // por
  { first: "por", second: "favor", score: 10 },
  { first: "por", second: "que", score: 7 },
  { first: "por", second: "isso", score: 5 },
  { first: "por", second: "aqui", score: 4 },

  // ------------------------------------------------------------------
  //  ADJECTIVES / QUANTITY
  // ------------------------------------------------------------------

  // mais
  { first: "mais", second: "um", score: 6 },
  { first: "mais", second: "uma", score: 6 },
  { first: "mais", second: "agua", score: 7 },
  { first: "mais", second: "devagar", score: 6 },
  { first: "mais", second: "alto", score: 4 },
  { first: "mais", second: "baixo", score: 4 },

  // menos
  { first: "menos", second: "um", score: 4 },
  { first: "menos", second: "uma", score: 4 },

  // ------------------------------------------------------------------
  //  GREETINGS / CLOSINGS / AFFECTION
  // ------------------------------------------------------------------

  // oi
  { first: "oi", second: "tudo", score: 9 },
  { first: "oi", second: "bom", score: 5 },

  // tudo
  { first: "tudo", second: "bem", score: 10 },
  { first: "tudo", second: "bom", score: 7 },
  { first: "tudo", second: "certo", score: 6 },

  // te
  { first: "te", second: "amo", score: 9 },
  { first: "te", second: "quero", score: 6 },
  { first: "te", second: "ajudo", score: 4 },
  { first: "te", second: "levo", score: 4 },

  // ------------------------------------------------------------------
  //  QUESTIONS
  // ------------------------------------------------------------------

  // onde
  { first: "onde", second: "esta", score: 9 },
  { first: "onde", second: "vai", score: 6 },
  { first: "onde", second: "tem", score: 5 },
  { first: "onde", second: "fica", score: 6 },

  // quando
  { first: "quando", second: "vai", score: 7 },
  { first: "quando", second: "vem", score: 6 },
  { first: "quando", second: "volta", score: 6 },
  { first: "quando", second: "pode", score: 5 },

  // como
  { first: "como", second: "esta", score: 8 },
  { first: "como", second: "vai", score: 7 },
  { first: "como", second: "voce", score: 6 },
  { first: "como", second: "assim", score: 5 },

  // quanto
  { first: "quanto", second: "tempo", score: 8 },
  { first: "quanto", second: "custa", score: 6 },

  // ------------------------------------------------------------------
  //  FOOD / DRINK  (AAC daily needs)
  // ------------------------------------------------------------------

  { first: "quero", second: "suco", score: 6 },
  { first: "quero", second: "leite", score: 5 },
  { first: "quero", second: "cafe", score: 5 },
  { first: "quero", second: "comida", score: 7 },
  { first: "quero", second: "fruta", score: 4 },
  { first: "quero", second: "pao", score: 5 },

  // tomar
  { first: "tomar", second: "agua", score: 8 },
  { first: "tomar", second: "remedio", score: 8 },
  { first: "tomar", second: "banho", score: 7 },
  { first: "tomar", second: "cafe", score: 5 },
  { first: "tomar", second: "suco", score: 5 },

  // comer
  { first: "comer", second: "agora", score: 6 },
  { first: "comer", second: "comida", score: 5 },
  { first: "comer", second: "fruta", score: 4 },
  { first: "comer", second: "pao", score: 4 },

  // ------------------------------------------------------------------
  //  BODY PARTS (for pointing out pain)
  // ------------------------------------------------------------------

  { first: "minha", second: "cabeca", score: 7 },
  { first: "minha", second: "barriga", score: 6 },
  { first: "minha", second: "mao", score: 5 },
  { first: "minha", second: "perna", score: 5 },
  { first: "minha", second: "costas", score: 5 },
  { first: "minha", second: "mae", score: 6 },

  { first: "meu", second: "braco", score: 5 },
  { first: "meu", second: "pe", score: 5 },
  { first: "meu", second: "peito", score: 5 },
  { first: "meu", second: "dente", score: 4 },
  { first: "meu", second: "remedio", score: 6 },
  { first: "meu", second: "pai", score: 5 },

  // ------------------------------------------------------------------
  //  URGENCY / EMOTIONS
  // ------------------------------------------------------------------

  { first: "socorro", second: "me", score: 9 },
  { first: "socorro", second: "ajuda", score: 8 },

  { first: "calma", second: "por", score: 5 },
  { first: "calma", second: "eu", score: 4 },

  { first: "sim", second: "eu", score: 5 },
  { first: "sim", second: "quero", score: 7 },
  { first: "sim", second: "por", score: 5 },
  { first: "sim", second: "pode", score: 5 },

  // ------------------------------------------------------------------
  //  MOBILITY / POSITIONING
  // ------------------------------------------------------------------

  { first: "ir", second: "ao", score: 7 },
  { first: "ir", second: "para", score: 7 },
  { first: "ir", second: "embora", score: 6 },
  { first: "ir", second: "dormir", score: 5 },

  { first: "sentar", second: "aqui", score: 7 },
  { first: "sentar", second: "ali", score: 5 },
  { first: "sentar", second: "na", score: 5 },

  { first: "deitar", second: "aqui", score: 6 },
  { first: "deitar", second: "na", score: 6 },

  { first: "levantar", second: "agora", score: 5 },
  { first: "levantar", second: "devagar", score: 5 },

  // ------------------------------------------------------------------
  //  EXTRA COVERAGE (everyday AAC phrases)
  // ------------------------------------------------------------------

  { first: "obrigado", second: "por", score: 6 },
  { first: "obrigada", second: "por", score: 6 },

  { first: "desculpa", second: "eu", score: 5 },
  { first: "desculpa", second: "nao", score: 5 },

  { first: "tchau", second: "ate", score: 7 },
  { first: "ate", second: "logo", score: 8 },
  { first: "ate", second: "amanha", score: 7 },
  { first: "ate", second: "depois", score: 6 },

  { first: "aqui", second: "esta", score: 5 },
  { first: "aqui", second: "doi", score: 7 },
  { first: "aqui", second: "nao", score: 4 },

  { first: "ali", second: "esta", score: 5 },
  { first: "ali", second: "tem", score: 4 },

  { first: "ja", second: "estou", score: 5 },
  { first: "ja", second: "vou", score: 5 },
  { first: "ja", second: "tomei", score: 5 },
  { first: "ja", second: "comi", score: 5 },

  { first: "ainda", second: "nao", score: 8 },
  { first: "ainda", second: "estou", score: 5 },
  { first: "ainda", second: "tenho", score: 4 },

  { first: "so", second: "um", score: 5 },
  { first: "so", second: "quero", score: 6 },
  { first: "so", second: "preciso", score: 5 },

  // falar  (communication itself is key in AAC)
  { first: "falar", second: "com", score: 8 },
  { first: "falar", second: "algo", score: 4 },

  // trocar / higiene
  { first: "trocar", second: "roupa", score: 6 },
  { first: "trocar", second: "fralda", score: 7 },

  { first: "limpar", second: "aqui", score: 5 },
  { first: "limpar", second: "a", score: 5 },
];

// ---------------------------------------------------------------------------
//  buildBigramMap
//  Creates a Map keyed by `first` word for O(1) look-up of continuations.
// ---------------------------------------------------------------------------

export function buildBigramMap(): Map<string, Bigram[]> {
  const map = new Map<string, Bigram[]>();

  for (const bigram of bigrams) {
    const existing = map.get(bigram.first);
    if (existing) {
      existing.push(bigram);
    } else {
      map.set(bigram.first, [bigram]);
    }
  }

  // Sort each bucket by score descending so the most likely continuations
  // come first -- callers can simply take the first N items.
  for (const bucket of map.values()) {
    bucket.sort((a, b) => b.score - a.score);
  }

  return map;
}
