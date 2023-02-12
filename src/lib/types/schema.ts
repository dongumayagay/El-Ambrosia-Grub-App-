export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      "delivery-locations": {
        Row: {
          city: string
          enable: boolean
          fee: number
          id: number
          postal_code: number
          state: string
        }
        Insert: {
          city: string
          enable?: boolean
          fee: number
          id?: number
          postal_code: number
          state: string
        }
        Update: {
          city?: string
          enable?: boolean
          fee?: number
          id?: number
          postal_code?: number
          state?: string
        }
      }
      order_address: {
        Row: {
          city: string
          country: string
          email_address: string
          first_name: string
          id: number
          last_name: string
          phone_number: string
          postal_code: number
          state: string
          street_line1: string
          street_line2: string | null
        }
        Insert: {
          city: string
          country?: string
          email_address: string
          first_name: string
          id?: number
          last_name: string
          phone_number: string
          postal_code: number
          state: string
          street_line1: string
          street_line2?: string | null
        }
        Update: {
          city?: string
          country?: string
          email_address?: string
          first_name?: string
          id?: number
          last_name?: string
          phone_number?: string
          postal_code?: number
          state?: string
          street_line1?: string
          street_line2?: string | null
        }
      }
      order_items: {
        Row: {
          id: number
          order_id: number
          product_id: number
          quantity: number
          variant_id: number
          variant_supply_id: string
        }
        Insert: {
          id?: number
          order_id: number
          product_id: number
          quantity: number
          variant_id: number
          variant_supply_id: string
        }
        Update: {
          id?: number
          order_id?: number
          product_id?: number
          quantity?: number
          variant_id?: number
          variant_supply_id?: string
        }
      }
      orders: {
        Row: {
          created_at: string
          fees: Json
          id: number
          invoice_id: string | null
          owner_id: string
          status: number
          subtotal: number
          total: number
          total_quantity: number
        }
        Insert: {
          created_at?: string
          fees?: Json
          id?: number
          invoice_id?: string | null
          owner_id: string
          status: number
          subtotal: number
          total: number
          total_quantity: number
        }
        Update: {
          created_at?: string
          fees?: Json
          id?: number
          invoice_id?: string | null
          owner_id?: string
          status?: number
          subtotal?: number
          total?: number
          total_quantity?: number
        }
      }
      product_variants: {
        Row: {
          id: number
          name: string | null
          price: number
          variant_of: number
        }
        Insert: {
          id?: number
          name?: string | null
          price: number
          variant_of: number
        }
        Update: {
          id?: number
          name?: string | null
          price?: number
          variant_of?: number
        }
      }
      products: {
        Row: {
          description: string
          id: number
          image_url: string | null
          name: string
        }
        Insert: {
          description: string
          id?: number
          image_url?: string | null
          name: string
        }
        Update: {
          description?: string
          id?: number
          image_url?: string | null
          name?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email_address: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone_number: string | null
        }
        Insert: {
          avatar_url?: string | null
          email_address?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone_number?: string | null
        }
        Update: {
          avatar_url?: string | null
          email_address?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone_number?: string | null
        }
      }
      roles: {
        Row: {
          id: string
          position: string | null
        }
        Insert: {
          id: string
          position?: string | null
        }
        Update: {
          id?: string
          position?: string | null
        }
      }
      supplies: {
        Row: {
          id: number
          name: string
          threshold: number
          unit: string
          value: number
        }
        Insert: {
          id?: number
          name?: string
          threshold: number
          unit?: string
          value: number
        }
        Update: {
          id?: number
          name?: string
          threshold?: number
          unit?: string
          value?: number
        }
      }
      user_address: {
        Row: {
          city: string
          country: string
          id: string
          postal_code: number
          state: string
          street_line1: string
          street_line2: string
        }
        Insert: {
          city: string
          country?: string
          id: string
          postal_code: number
          state: string
          street_line1: string
          street_line2: string
        }
        Update: {
          city?: string
          country?: string
          id?: string
          postal_code?: number
          state?: string
          street_line1?: string
          street_line2?: string
        }
      }
      variant_supply: {
        Row: {
          amount_use: number
          id: string
          supply_id: number
          variant_id: number
        }
        Insert: {
          amount_use: number
          id: string
          supply_id: number
          variant_id: number
        }
        Update: {
          amount_use?: number
          id?: string
          supply_id?: number
          variant_id?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      adjust_supply_value: {
        Args: {
          row_id: number
          amount: number
        }
        Returns: undefined
      }
      get_user_role: {
        Args: {
          uid: string
        }
        Returns: string
      }
      is_super_admin: {
        Args: {
          uid: string
        }
        Returns: boolean
      }
      order_next_status: {
        Args: {
          order_id: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
