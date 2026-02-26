document.addEventListener('DOMContentLoaded', () => {
    const storage_key = "Previous conversion result";
    const convert_curr = async (base, target, amount) => {
        const EXCHANGE_RATE_API_KEY = "c3bebc3cf92257a19192d324";
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/pair/${base}/${target}/${amount}`);
        if (!res.ok) {
            throw new Error("Bad API response!");
        }
        const data = await res.json();
        if (!data) {
            throw new Error("No JSON data!");
        }
        return data.conversion_result;
    };
    const { createApp, ref } = Vue;
    const app = createApp({
        setup() {
            const base = ref("");
            const target = ref("");
            const amount = ref(1000);
            const result = ref(null);
            const previous_result = ref("Førrige resultat: " + localStorage.getItem(storage_key));
            const convert = async () => {
                try {
                    result.value = "Resultat: " + await convert_curr(base.value, target.value, amount.value);
                    // console.log(base);
                    // console.log(base.value);
                    // console.log(target);
                    // console.log(target.value);
                    localStorage.removeItem(storage_key);
                    localStorage.setItem(storage_key, result.value);
                }
                catch (err) {
                    throw new Error(`Can't convert! ${err}`);
                }
            };
            return {
                base,
                target,
                amount,
                result,
                previous_result,
                convert
            };
        }
    });
    app.mount('#app');
});
