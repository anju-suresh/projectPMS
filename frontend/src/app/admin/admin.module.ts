export class adminModel{
    constructor(
        public project : String,
        public name : String,
        public role : String,
        public email : String,
        
    ){}
}
export class projectModel{
    constructor(
        public project : String,
        public description : String,
        
    ){}
}
export class userModel{
    constructor(
        public name : String,
        public role : String,
        public email : String 
    ){}
}