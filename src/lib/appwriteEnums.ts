// Enums in this file should be copied from the corresponding enums in the Appwrite generated types file

export enum Roles {
    PARTICIPANT = "participant",
    VOLUNTEER = "volunteer",
    COORDINATOR = "coordinator"
}

export enum FraudStatus {
    CLEAR = "clear",
    SUSPICIOUS = "suspicious",
    CONFIRMED = "confirmed"
}

export enum Priority {
    HIGH = "high",
    MEDIUM = "medium",
    LOW = "low"
}

export enum ReviewStatus {
    APPROVED = "approved",
    DENIED = "denied",
    UNDER_REVIEW = "under-review",
    CANCELED = "canceled"
}

export enum Role {
    STUDENT = "student",
    EDUCATOR = "educator",
    PARENT = "parent",
    OTHER = "other"
}

export enum Classes {
    REMEDIAL = "remedial",
    REGULAR = "regular",
    HONORS = "honors"
}

/* Enum cannot have numeric keys, yet Appwrite generates them this way... so we comment this out for now.
export enum GradYear {
    2027 = "2027",
    2028 = "2028",
    2029 = "2029",
    2030 = "2030",
    OTHER = "other"
}
*/
