declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_API_URL: string;
    
    readonly USERS: string;
    readonly LOGS: string;
    readonly CREDS: string;
  }
  
}
