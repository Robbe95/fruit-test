interface OAuth2ClientOptions {
  clientId: string
  clientSecret: string
  fetchInstance: typeof $fetch
  scopes?: string[]
  tokenEndpoint: string
}

export interface OAuth2ClientTokens {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: string
}

export interface OAuth2ClientTokensWithExpiration extends OAuth2ClientTokens {
  expires_at: number
}

export class TokenStore {
  private _promise: Promise<void> | null = null
  private onTokensRefreshedCallback: ((tokens: OAuth2ClientTokensWithExpiration) => void) | null = null

  constructor(private readonly options: OAuth2ClientOptions, private tokens: OAuth2ClientTokensWithExpiration) {
  }

  private accessTokenExpired(): boolean {
    return Date.now() >= this.tokens.expires_at
  }

  private refreshToken(): Promise<void> {
    if (this._promise != null) {
      return this._promise
    }

    this._promise = new Promise((resolve, reject) => {
      this.options.fetchInstance<any>(this.options.tokenEndpoint, {
        body: new URLSearchParams({
          client_id: this.options.clientId,
          client_secret: this.options.clientSecret,
          grant_type: 'refresh_token',
          refresh_token: this.tokens.refresh_token,
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      })
        .then((data) => {
          this.tokens = {
            ...data,
            expires_at: Date.now() + data.expires_in * 1000,
          }

          if (this.onTokensRefreshedCallback != null) {
            this.onTokensRefreshedCallback(this.tokens)
          }

          resolve()
        })
        .catch(() => {
          reject(new Error('Failed to refresh access token'))
        })
        .finally(() => {
          this._promise = null
        })
    })

    return this._promise
  }

  public async getAccessToken(): Promise<string> {
    if (this.accessTokenExpired()) {
      await this.refreshToken()
    }

    return this.tokens.access_token
  }

  public getTokens(): OAuth2ClientTokensWithExpiration {
    return this.tokens
  }

  public onRefreshToken(callback: (tokens: OAuth2ClientTokensWithExpiration) => void): void {
    this.onTokensRefreshedCallback = callback
  }
}

export class OAuth2Client {
  constructor(private readonly options: OAuth2ClientOptions) {}

  public async login(username: string, password: string): Promise<TokenStore> {
    const data = await this.options.fetchInstance<any>(this.options.tokenEndpoint, {
      body: new URLSearchParams({
        client_id: this.options.clientId,
        client_secret: this.options.clientSecret,
        grant_type: 'password',
        password,
        username,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    })

    const store = new TokenStore(this.options, {
      ...data,
      expires_at: Date.now() + data.expires_in * 1000,
    })

    return store
  }

  public async loginTwoFactor(username: string, code: string): Promise<TokenStore> {
    const data = await this.options.fetchInstance<any>(this.options.tokenEndpoint, {
      body: new URLSearchParams({
        client_id: this.options.clientId,
        client_secret: this.options.clientSecret,
        code,
        grant_type: 'code',
        username,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    })

    const store = new TokenStore(this.options, {
      ...data,
      expires_at: Date.now() + data.expires_in * 1000,
    })

    return store
  }
}
