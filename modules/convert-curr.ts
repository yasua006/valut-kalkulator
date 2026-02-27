export const convert_curr = async(base: string, target: string, amount: number): Promise<number> => {
    const EXCHANGE_RATE_API_KEY: string = "c3bebc3cf92257a19192d324";
    const res: Response = await fetch(`https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/pair/${base}/${target}/${amount}`,
        {method: 'GET'}
    );

    if (!res.ok) {
        throw new Error("Bad API response!");
    }

    const data = await res.json();

    if (!data) {
        throw new Error("No JSON data!");
    }

    return data.conversion_result;
}