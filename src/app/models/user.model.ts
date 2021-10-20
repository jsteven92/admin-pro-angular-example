import { environment } from "src/environments/environment";

const base_url = environment.base_url;
export class User {
    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public image?: string,
        public role?: string,
        public google?: boolean,
        public uid?: string,
    ) { }

    get getImageUrl (): string {
        
        if ( !this.image ) {
            return `${base_url}upload/users/nothing`;
        } else if ( this.image?.includes( 'google' ) ) {
            return this.image;
        } else if ( this.image ) {
            return `${base_url}upload/users/${this.image}`;
        } else
            return `${base_url}upload/users/nothing`;
    }
}