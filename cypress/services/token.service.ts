import {Token, TokenResponse, CreateTokenBody} from "../models/Token";

import dayjs from "dayjs";


const ONE_HOUR_IN_MS = 1000 * 60 * 60;

class TokenService {
    private readonly tokenApiUrl: string;
    private readonly hash: string;
    private readonly username: string;
    private readonly appKey: string;
    private readonly expiryDate: number;
    private token: Token;

    constructor(tokenApiUrl: string, hash="hzh8mKJarBCjH0etqgZDPqMCEHza0XsHPZ8fd1I1tOY=", username = "*", appKey = "HBADMIN", expiryDate = ONE_HOUR_IN_MS) {
        this.tokenApiUrl = tokenApiUrl;
        this.hash = hash;
        this.username = username;
        this.appKey = appKey;
        this.expiryDate = expiryDate;
        this.token = {};
    }

    async getTokenFromApi(): Promise<Token> {
        const URL = `${this.tokenApiUrl}/tokens`;
        const body = {
            Username: this.username,
            AppKey: this.appKey,
            Hash: this.hash
        } as CreateTokenBody;
        return new Promise((resolve) => {
            cy.request({
                method: 'POST',
                url: URL,
                body,
                failOnStatusCode: false
            }).then((res) => {
                this.token = {
                    value: res.body.token,
                    createdAt: dayjs().unix(),
                };
                resolve({
                    value: res.body.token,
                    createdAt: dayjs().unix(),
                })
            })
        }
        )
    }

    private isTokenExpired(): boolean {
        if (!this.token.value) {
            return true;
        }
        const expireDate = dayjs(this.token.createdAt).add(this.expiryDate, "millisecond").unix();
        return expireDate > dayjs().unix();
    }

    async getToken(): Promise<string> {
        const isExpired = this.isTokenExpired();
        if (isExpired || !this.token.value) {
            await this.getTokenFromApi();
        }
        if(this.token.value)
            return this.token.value;
        return this.getToken();
    }
}

export default TokenService;
