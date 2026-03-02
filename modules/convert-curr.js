export const convert_curr = async (base, target, amount, with_decimals_str) => {
    const EXCHANGE_RATE_API_KEY = "c3bebc3cf92257a19192d324";
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/pair/${base}/${target}/${amount}`, { method: 'GET' });
    if (!res.ok) {
        throw new Error("Bad API response!");
    }
    const data = await res.json();
    if (!data) {
        throw new Error("No JSON data!");
    }
    // console.info(Math.round(data.conversion_result));
    // console.info(Math.floor(data.conversion_result));
    if (with_decimals_str === "no") {
        // console.info("No decimals wish");
        return Math.trunc(data.conversion_result);
    }
    else {
        // console.info("Decimals wish");
        return data.conversion_result;
    }
};
