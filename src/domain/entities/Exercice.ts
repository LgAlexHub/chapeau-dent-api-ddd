export type ExerciceType = 'html' | 'css' | 'js' | 'integration'
export type Difficulty = 'Initial' | 'Basique' | 'Opérationnel' | 'Avancé' | 'Expert'

export type StartingAsset = {
    name : string
    description : string
    content : string
}

export type Exercice = {
    id? : string
    slug : string
    title : string
    type : ExerciceType
    level : Difficulty
    rncpSkills: string[]
    prerequisites: string[]
    estimatedDuration : string
    startingAssets : StartingAsset[]
    context : string
    objectives : string[]
    instructions : string[]
    successCriteria : string[]
}