export class Session {
    constructor(
        private _token: string,
        private _expirationDate: Date,
        private _user: string
    ) {}

    get token() {
        return !this._expirationDate || new Date() > this._expirationDate ? null : this._token;
    }

    get user() {
        return this._user;
    }
}