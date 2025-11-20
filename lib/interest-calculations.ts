// Logic for Simple Interest
// Formula: J = P * i * n
// M = P + J

export enum RateUnit {
    MONTHLY = 1,
    YEARLY = 12
}

export enum TimeUnit {
    MONTHS = 1,
    YEARS = 12
}

export interface InterestResult {
    principal: number;
    rate: number; // as percentage
    rateUnit: RateUnit;
    time: number;
    timeUnit: TimeUnit;
    interestAmount: number;
    totalAmount: number;
}

export function calculateSimpleInterest(
    principal: number,
    rate: number,
    rateUnit: RateUnit,
    time: number,
    timeUnit: TimeUnit
): InterestResult {
    // Normalize units to MONTHS
    // Rate: If Yearly, divide by 12 to get monthly rate.
    // Time: If Years, multiply by 12 to get months.

    // Actually, in Simple Interest, units just need to match.
    // Let's convert everything to the UNIT OF THE RATE for simplicity, or convert everything to MONTHS.
    // Standard approach: I = P * i * n
    // i and n must be in same time unit.

    // Let's convert "Time" to match "Rate Unit".

    let adjustedTime = time;

    if (rateUnit === RateUnit.MONTHLY && timeUnit === TimeUnit.YEARS) {
        adjustedTime = time * 12;
    } else if (rateUnit === RateUnit.YEARLY && timeUnit === TimeUnit.MONTHS) {
        adjustedTime = time / 12;
    }

    // Calculate
    const i = rate / 100;
    const interest = principal * i * adjustedTime;
    const total = principal + interest;

    return {
        principal,
        rate,
        rateUnit,
        time,
        timeUnit,
        interestAmount: interest,
        totalAmount: total
    };
}
