export interface NestListModel {
  name: string
  children?: NestListModel[]
  value?: string
  refName?: string
  isOpen: boolean
}
export interface NestData {
  nestText: string
  value: string
}