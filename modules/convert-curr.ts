export const convert_curr = async(base: string, target: string, amount: number, with_decimals_str: string): Promise<number> => {
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

    // console.info(Math.round(data.conversion_result));
    // console.info(Math.floor(data.conversion_result));

    if (with_decimals_str === "nei") {
        console.info("No decimals wish");
        return Math.trunc(data.conversion_result);
    } else {
        console.info("Decimals wish");
        return data.conversion_result;
    }
}