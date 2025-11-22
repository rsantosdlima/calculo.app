export interface OvertimeResult {
    normalHourlyRate: number;
    overtimeHourlyRate: number;
    totalOvertimeValue: number;
    dsrValue: number;
    grandTotal: number;
}

export function calculateOvertime(
    grossSalary: number,
    monthlyHours: number,
    overtimePercentage: number,
    hoursWorked: number,
    calculateDSR: boolean
): OvertimeResult {
    
    if (monthlyHours <= 0 || grossSalary < 0) {
        return { normalHourlyRate: 0, overtimeHourlyRate: 0, totalOvertimeValue: 0, dsrValue: 0, grandTotal: 0 };
    }

    const normalHourlyRate = grossSalary / monthlyHours;
    const percentageMultiplier = 1 + (overtimePercentage / 100);
    const overtimeHourlyRate = normalHourlyRate * percentageMultiplier;
    const totalOvertimeValue = overtimeHourlyRate * hoursWorked;

    // Estimativa padrão de DSR (1/6)
    let dsrValue = 0;
    if (calculateDSR) {
        dsrValue = totalOvertimeValue / 6;
    }

    const grandTotal = totalOvertimeValue + dsrValue;

    return {
        normalHourlyRate,
        overtimeHourlyRate,
        totalOvertimeValue,
        dsrValue,
        grandTotal
    };
}