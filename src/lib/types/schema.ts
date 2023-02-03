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
      cart_items: {
        Row: {
          id: number
          owner_id: string
          product_id: number
          product_variant_id: number
          quantity: number
        }
        Insert: {
          id?: number
          owner_id: string
          product_id: number
          product_variant_id: number
          quantity: number
        }
        Update: {
          id?: number
          owner_id?: string
          product_id?: number
          product_variant_id?: number
          quantity?: number
        }
      }
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
          fee?: number
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
      order_items: {
        Row: {
          id: number
          order_id: number
          product_id: number
          quantity: number
          variant_id: number
        }
        Insert: {
          id?: number
          order_id: number
          product_id: number
          quantity: number
          variant_id: number
        }
        Update: {
          id?: number
          order_id?: number
          product_id?: number
          quantity?: number
          variant_id?: number
        }
      }
      orders: {
        Row: {
          created_at: string
          id: number
          owner_id: string
          status: number
          total: number
        }
        Insert: {
          created_at?: string
          id?: number
          owner_id: string
          status?: number
          total: number
        }
        Update: {
          created_at?: string
          id?: number
          owner_id?: string
          status?: number
          total?: number
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
          image_url: string
          name: string
        }
        Insert: {
          description: string
          id?: number
          image_url: string
          name: string
        }
        Update: {
          description?: string
          id?: number
          image_url?: string
          name?: string
        }
      }
      profiles: {
        Row: {
          address: Json | null
          avatar_url: string | null
          email_address: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone_number: string | null
        }
        Insert: {
          address?: Json | null
          avatar_url?: string | null
          email_address?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone_number?: string | null
        }
        Update: {
          address?: Json | null
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
        Args: { row_id: number; amount: number }
        Returns: undefined
      }
      get_user_role: {
        Args: { uid: string }
        Returns: string
      }
      is_super_admin: {
        Args: { uid: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
