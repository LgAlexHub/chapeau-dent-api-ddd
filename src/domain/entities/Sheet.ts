export type SheetType = 'html' | 'css' | 'js' | 'integration'
export type Difficulty = 'Initial' | 'Basique' | 'Opérationnel' | 'Avancé' | 'Expert'

export type CodeLanguage = 'html' | 'css' | 'js' | 'mixed'

export type CodeBlock = {
    code: string
    language: CodeLanguage
    label: string
}

export type Example = {
    id: string
    title: string
    description: string
    blocs: CodeBlock[]
}

export type SpotTheBugValidation = {
    buggedCode: string
    errors: string[]
    fixedCode: string
}

export type McqOption = {
    text: string
}

export type McqQuestion = {
    question: string
    options: McqOption[]
    answerIndex: number
    explanation: string
}

export type FillTheGapGap = {
    guideline: string
    placeholder: string
    answer: string
    hint: string
}

export type FillTheGapValidation = {
    codeTemplate: string
    blanks: FillTheGapGap[]
}

export type CheckpointValidation = {
    question: string
    answer: string
}

export type Validation = {
    spotTheBug?: SpotTheBugValidation
    mcq?: McqQuestion[]
    fillTheGap?: FillTheGapValidation
    checkpoint: CheckpointValidation
}

export type Sheet = {
    id?: string
    slug: string
    type: SheetType
    skillTitle: string
    level: Difficulty
    rncpSkills: string[]
    prerequisites: string[]
    sequenceId: string
    sequencePosition: number
    why: string
    theory: string
    examples: Example[]
    validation: Validation
    sources: string
    additionnalInfos: string
}
