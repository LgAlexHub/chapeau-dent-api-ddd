export type SequenceType = 'html' | 'css' | 'js' | 'integration'

export type Difficulty = 'Initial' | 'Basique' | 'Opérationnel' | 'Avancé' | 'Expert'
export type NodeType = 'Sheet' | 'Exercise' | 'MiniProject'
export type SequenceNode = {
  id: string                              
  type: NodeType
  targetCollection: 'fiches' | 'exercises' | 'mini-projects'
  targetSlug: string                            
  nextNodeId?: string                         
}

export type Sequence = {
  id: string
  slug: string                      
  name: string
  description?: string
  type : SequenceType,
  level: Difficulty 
  estimatedHours?: number
  prerequisiteParcours?: string[]
  firstNodeId: string
  nodes: SequenceNode[]
}