export interface LeadPostData {
  name: string
  email: string
  phone: string
}

export interface LeadsData extends LeadPostData {
  id: number
}
