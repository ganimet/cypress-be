
export interface CreateTokenBody {
    Username: string,
    AppKey: string,
    Hash: string
}

export interface TokenResponse {
    token: string
}

export interface Token {
    createdAt?: number;
    value?: string;
}
