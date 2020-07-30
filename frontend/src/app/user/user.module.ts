export class statusModel{
    constructor(
        public project: String,
        public taskid : Number,
        public task : String,
        public teammate : String,
        public date : Date, 
        public status : String
    ){}
}
export class progressModel{
    constructor(
        public project: String,
        public taskid : Number,
        public task : String,
        public user : String,
        public date : Date, 
        public status:String
    ){}
}
export class completedModel{
        constructor(
            public project: String,
            public taskid : Number,
            public task : String,
            public user : String,
            public date : Date, 
            public completed : String
        ){}
    
}